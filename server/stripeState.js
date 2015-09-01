Market._publications["market/state"] = function(){
  return Market._stateCollection.find({'userId': this.userId},{fields: {'customerId': 0, 'accountId': 0}});
};
Meteor.publish('market/state', Market._publications["market/state"]);


/*
 * Setup creation of customer and account records for users on create and login
 */
Market._createStripeState = function(userId){
  var self = this;
  var stripeStateId = self._stateCollection.findOne({'userId': userId});
  if( stripeStateId ){ return; }

  stripeStateId = self._stateCollection.insert({'userId': userId});

  Stripe.customers.create({
    metadata: {
      userId: userId
    }
  },Meteor.bindEnvironment(function(err,account){
    if( err ){
      console.error( err );
    }else{
      self._stateCollection.update({'_id': stripeStateId},{$set: {'customerId': account.id}});
      _.each(Market._onCustomerCreateCallbacks,function(f){
        f();
      });
    }
  }));

  Stripe.accounts.create({
    managed: true,
    country: "US"
  },Meteor.bindEnvironment(function(err,account){
    if( err ){
      console.error( err );
    }else{
      self._stateCollection.update({'_id': stripeStateId},{$set: {'accountId': account.id, 'fieldsNeeded': account.fields_needed}});
      _.each(self._onAccountCreateCallbacks,function(f){
        f();
      });
    }
  }));
};

Accounts.onLogin(function(doc){ 
  if( doc && doc.user && doc.user._id ){
    Market._createStripeState(doc.user._id);
  }
});
