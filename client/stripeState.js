var subscription;
StripeMarketplaceImplementation.prototype._onLogin = function(){
  subscription = Meteor.subscribe("marketplace/state");
};

StripeMarketplaceImplementation.prototype._onLogout = function(){
  subscription.stop();
};

StripeMarketplaceImplementation.prototype.state = function(){
  return StripeState.findOne({'userId': Meteor.userId()});
};
