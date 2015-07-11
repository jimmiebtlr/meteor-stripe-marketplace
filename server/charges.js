checkoutMethodSchema = new SimpleSchema({
  expectedTotal: {
    type: Number
  },
  id: {
    type: SimpleSchema.RegEx.ID
  }
});


StripeMarketplaceImplementation.prototype.charge = function(charge, callback){ 
  check( charge, this._schemas.charge );

  var userState = this._stateCollection.findOne({'userId': charge.userId});
  if( !userState || !userState.customerId ){
    throw new Meteor.Error("User Stripe State not found " + charge.userId);
  }

  var destState = this._stateCollection.findOne({'userId': charge.destinationId});
  if( !destState || !destState.accountId ){
    throw new Meteor.Error("Dest user State not found " + charge.userId);
  }
  var stripeCharge = {
    customer: userState.customerId,
    destination: destState.accountId,
    amount: charge.amount,
    application_fee: charge.applicationFee,
    currency: "usd"
  };

  check( stripeCharge, Market._schemas.stripeCharge );
  this._stripe.charges.create( stripeCharge,function(err,result){
    if( err ){
      if( Market._settings.checkout.onError ){
        Market._settings.checkout.onError( err, charge, result );
      }
    }else{
      if( Market._settings.checkout.onSuccess ){
        Market._settings.checkout.onSuccess( charge, result );
      }
      if( callback ){ callback( err, charge, result ); }
    }
  });
};

StripeMarketplaceImplementation.prototype._methods["marketplace/checkout"] = function(params){
  check( params, checkoutMethodSchema );
  check( this.userId, String );
  var userId = this.userId;
  var profile = Market._settings.checkout;
  if( profile ){
    var charges = profile.charges( params.id );
    var actualTotal = 0;
    _.each(charges, function(c){ actualTotal += c.amount; });
    if( actualTotal === params.expectedTotal ){
      try{
        _.each(charges, function(c){
          c.userId = userId;
          Market.charge( c );
        });
      }catch(e){
        profile.onError(e);
        throw new Meteor.Error(e);
      }
    }else{
      profile.onError();
      throw new Meteor.Error("Market expected total: " + params.expectedTotal + " did not equal actual total: " + actualTotal );
    }
  }else{
    throw new Meteor.Error("Market settings for checkout not found");
  }
};
