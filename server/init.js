Stripe = StripeAPI(Meteor.settings.Stripe.secretKey); 
StripeMarketplaceImplementation.prototype._stripe = Stripe;

/*
 * Setup creation of customer and account records for users on create and login
 */
var createStripeState = function(userId){
  var stripeStateId = StripeMarketplaceImplementation.prototype._stateCollection.findOne({'userId': userId});
  if( stripeStateId ){ return; }

  stripeStateId = Market._stateCollection.insert({'userId': userId});

  Stripe.customers.create({
    metadata: {
      userId: userId
    }
  },Meteor.bindEnvironment(function(err,account){
    if( err ){
      console.error( err );
    }else{
      Market._stateCollection.update({'_id': stripeStateId},{$set: {'customerId': account.id}});
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
      Market._stateCollection.update({'_id': stripeStateId},{$set: {'accountId': account.id, 'fieldsNeeded': account.fields_needed}});
      _.each(Market._onAccountCreateCallbacks,function(f){
        f();
      });
    }
  }));
};

StripeMarketplaceImplementation.prototype._onLogin.push( function(doc){ 
  if( doc && doc.user && doc.user._id ){
    createStripeState(doc.user._id);
  }
});

StripeMarketplaceImplementation.prototype._methods = {};
