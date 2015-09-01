Market._fetchCustomer = function( callback ){
  var self = this;
  self._tmpStore.set("customerReady",false);
  Meteor.call('market/customer/get',function(err,customer){
    self._tmpStore.set("customer", customer);
    self._tmpStore.set("customerReady",true);
    if( callback ){
      callback( customer );
    }
  });
};

Market.customer = function(){
  if( !this._tmpStore.get("customerReady") ){
    this._fetchCustomer();
  }
  return this._tmpStore.get("customer");
};

Market.customerReady = function(){
  return this._tmpStore.get("customerReady");
};
