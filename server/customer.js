var syncCreateSource = Meteor.wrapAsync( Stripe.customers.createSource, Stripe.customers );
StripeMarketplaceImplementation.prototype._methods["marketplace/customer/createSource"] = function(token){
  check( token, String );
  check( this.userId, String );

  var state = Market._stateCollection.findOne({'userId': this.userId});
  
  return syncCreateSource( state.customerId, {source: token} );
};

var syncCardRemove = Meteor.wrapAsync( Stripe.customers.deleteCard, Stripe.customers );
StripeMarketplaceImplementation.prototype._methods["marketplace/customer/cards/remove"] = function(id){
  check( id, String );
  check( this.userId, String );

  var state = Market._stateCollection.findOne({'userId': this.userId});
  
  return syncCardRemove( state.customerId, id );
};

var syncGetCustomer = Meteor.wrapAsync( Stripe.customers.retrieve, Stripe.customers );
StripeMarketplaceImplementation.prototype._methods["marketplace/customer/get"] = function(){
  check( this.userId, String );
  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncGetCustomer( state.customerId );
};
