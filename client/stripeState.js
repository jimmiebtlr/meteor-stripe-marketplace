var subscription;
StripeMarketplaceImplementation.prototype._onLogin.push(function(){
  subscription = Meteor.subscribe("marketplace/state");
});

StripeMarketplaceImplementation.prototype._onLogout.push( function(){
  subscription.stop();
});

StripeMarketplaceImplementation.prototype.state = function(){
  return this._stateCollection.findOne({'userId': Meteor.userId()});
};
