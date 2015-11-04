Market.schemas.checkoutMethod = new SimpleSchema({
  expectedTotal: {
    type: Number
  },
  id: {
    type: SimpleSchema.RegEx.ID
  },
  source: {
    type: String,
    optional: true
  }
});

// Does not save purchase history.  Only for internal use.
let syncChargeCreate = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges );
Market._charge = function(charge, callback) {
  check(charge, this.schemas.charge);

  var userState = this._stateCollection.findOne({'userId': charge.userId});
  if (!userState || !userState.customerId) {
    throw new Meteor.Error('User Stripe State not found ' + charge.userId);
  }

  var destState = this._stateCollection.findOne({
    'userId': charge.destinationId
  });

  if (!destState || !destState.accountId) {
    throw new Meteor.Error('Dest user State not found ' + charge.userId);
  }
  var stripeCharge = {
    customer: userState.customerId,
    destination: destState.accountId,
    amount: charge.amount,
    application_fee: charge.applicationFee,
    currency: 'usd'
  };

  check(stripeCharge, Market.schemas.stripeCharge);
  try{
    let result = syncChargeCreate( stripeCharge )

    if (Market._settings.checkout.onSuccess) {
      Market._settings.checkout.onSuccess(charge, result);
    }
    if (callback) { callback(undefined, charge, result); }
  }catch(e){
    if (Market._settings.checkout.onError) {
      Market._settings.checkout.onError(e, charge);
    }
    if (callback) { callback(e, charge ); }
  }
};

Market._methods['market/checkout'] =
function(params) {
  check(params, Market.schemas.checkoutMethod);
  check(this.userId, String);
  var userId = this.userId;
  var profile = Market._settings.checkout;
  if (profile) {
    var charges = profile.charges(params.id);
    check(charges, [Market.schemas.charge]);
    var actualTotal = 0;
    _.each(charges, function(c) { actualTotal += c.amount; });

    if (actualTotal === params.expectedTotal) {
      var purchaseHistoryId = Market.PurchaseHistory.insert({
        userId: userId,
        total: actualTotal
      });

      try {
        _.each(charges, function(c) {
          c.userId = userId;
          Market._charge(c,function(err, charge, res) {
            var modifier = {$push: {charges: _.extend({}, charge)}};
            if (!err) {
              modifier.$push.charges.purchaseStatus = 'Success';
              Market.PurchaseHistory.update({_id: purchaseHistoryId}, modifier);
            }else {
              modifier.$push.charges.purchaseStatus = 'Error';
              Market.PurchaseHistory.update(
                {_id: purchaseHistoryId},
                modifier
              );
              throw err
            }
          });
        });
      }catch (e) {
        profile.onError(e);
        throw new Meteor.Error(e.type, e.message);
      }
    }else {
      var error = new Meteor.Error(
        'Market expected total: ' +
        params.expectedTotal +
        ' did not equal actual total: ' +
        actualTotal
      );

      profile.onError(error);
      throw error;
    }
  }else {
    throw new Meteor.Error('Market settings for checkout not found');
  }
};
Meteor.methods({
  'market/checkout': Market._methods['market/checkout']
});
