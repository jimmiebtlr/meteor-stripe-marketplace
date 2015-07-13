/*var syncGetAccount = Meteor.wrapAsync( Stripe.customers.deleteCard, Stripe.customers );
StripeMarketplaceImplementation.prototype._methods["marketplace/customer/get"] = function(){
  check( this.userId, String );
  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncGetCustomer( state.customerId );
};*/
