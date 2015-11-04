var syncCreateSource = Meteor.wrapAsync( Stripe.customers.createSource, Stripe.customers );
Market._methods["market/customer/createSource"] = function(token){
  check( token, String );
  check( this.userId, String );

  var state = Market._stateCollection.findOne({'userId': this.userId});

  try{
    return syncCreateSource( state.customerId, {source: token} )
  }catch(e){
    throw new Meteor.Error("create-source-failed", e.message);
  }
};

var syncCardRemove = Meteor.wrapAsync( Stripe.customers.deleteCard, Stripe.customers );
Market._methods["market/customer/cards/remove"] = function(id){
  check( id, String );
  check( this.userId, String );

  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncCardRemove( state.customerId, id );
};


var syncGetCustomer = Meteor.wrapAsync( Stripe.customers.retrieve, Stripe.customers );
Market._methods["market/customer/get"] = function(){
  check( this.userId, String );
  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncGetCustomer( state.customerId );
};


Meteor.methods({
  "market/customer/cards/remove": Market._methods["market/customer/cards/remove"],
  "market/customer/get":          Market._methods["market/customer/get"],
  "market/customer/createSource": Market._methods["market/customer/createSource"]
});
