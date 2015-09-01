var subscription;
Accounts.onLogin(function(){
  subscription = Meteor.subscribe("market/state");
});

Accounts.onLogout(function(){
  subscription.stop();
});


Market.state = function(){
  return this._stateCollection.findOne({'userId': Meteor.userId()});
};
