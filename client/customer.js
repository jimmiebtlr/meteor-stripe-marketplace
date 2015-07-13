StripeMarketplaceImplementation.prototype._fetchCustomer = function(){
  var self = this;
  self._tmpStore.set("customerReady",false);
  Meteor.call('marketplace/customer/get',function(err,customer){
    self._tmpStore.set("customer", customer);
    self._tmpStore.set("customerReady",true);
  });
};

StripeMarketplaceImplementation.prototype.customer = function(){
  if( !this._tmpStore.get("customerReady") ){
    this._fetchCustomer();
  }
  return this._tmpStore.get("customer");
};

StripeMarketplaceImplementation.prototype.customerReady = function(){
  return this._tmpStore.get("customerReady");
};
