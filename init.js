StripeMarketplaceImplementation = function(){};

StripeMarketplaceImplementation.prototype._schemas = {};
StripeMarketplaceImplementation.prototype._profiles = {};


/* 
 * Checkout
 * Params
 *   Expected Amount
 *   ID
 *   Type
 */
StripeMarketplaceImplementation.prototype._schemas.charge = new SimpleSchema({
  userId: {  // USer Id of the person getting charged
    type: SimpleSchema.RegEx.ID
  },
  destinationId: {  // UserId of the person who is receiving the credit
    type: SimpleSchema.RegEx.ID
  },
  total: {  // Total cost to user, including stripe fee, application fee, and any other fees involved
    type: Number,
    min: 0
  },
  applicationFee: {
    type: Number,
    optional: true,
    min: 0
  }
});

StripeMarketplaceImplementation.prototype.charge = function(charge){
  check( charge, this._schemas.charge );
  var userState = StripeState.findOne({'userId': charge.userId});
  if( !userState || !userState.customerId ){
    throw new Meteor.Error("User Stripe State not found" + charge.userId);
  }

  var destState = StripeState.findOne({'userId': charge.destinationId});
  if( !destState || !destState.accountId ){
    throw new Meteor.Error("Dest user State not found" + charge.userId);
  }

  // Charge it
};

/*
 * Market profiles
 *  Type
 *  OnSuccess
 *  OnError
 *  Cost
 */
StripeMarketplaceImplementation.prototype._schemas.profile = new SimpleSchema({
  type: {
    type: String
  },
  onSuccess: {
    type: Function
  },
  onError: {
    type: Function,
    optional: true
  },
  charges: {
    type: Function
  }
});

StripeMarketplaceImplementation.prototype.profiles = function(profiles){
  check( profiles, [this._schemas.profile] );
  this._profiles = _.extend(this._profiles, profiles);
};
