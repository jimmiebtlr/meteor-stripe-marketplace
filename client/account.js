StripeMarketplaceImplementation.prototype._fetchAccount = function(){
  this._tmpStore.set("accountReady",false);
  Meteor.call('marketplace/account/get',function(account){
    this._tmpStore.set("account", account);
    this._tmpStore.set("accountReady",true);
  });
};

StripeMarketplaceImplementation.prototype.account = function(){
  if( !this._tmpStore.get("account") ){
    this._fetchCustomer();
  }
  return this._tmpStore.get("account");
};

StripeMarketplaceImplementation.prototype.accountReady = function(){
  return this._tmpStore.get("accountReady");
};
