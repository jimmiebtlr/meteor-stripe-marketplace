Market = new StripeMarketplaceImplementation();

Meteor.startup(function(){
  Accounts.onLogin( Market._onLogin );
  Accounts.onLogin( Market._onLogout );
  Accounts.onCreate( Market._onCreate );
});
