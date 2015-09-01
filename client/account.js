Market._fetchAccount = function(callback){
  var self = this;
  self._tmpStore.set("accountReady",false);
  Meteor.call('market/accounts/get',function(err,account){
    self._tmpStore.set("account", account);
    self._tmpStore.set("accountReady",true);
    if( callback ){
      callback( account );
    }
  });
};

Market.account = function(){
  if( !this._tmpStore.get("account") ){
    this._fetchCustomer();
  }
  return this._tmpStore.get("account");
};

Market.accountReady = function(){
  return this._tmpStore.get("accountReady");
};

Market.acceptTOS = function(){
  Meteor.call('market/accounts/acceptTOS');
};

Market.registerExternalAccount = function( doc ){
  var self = this;
  Meteor.call('market/accounts/createExternalAccount',doc.id,function(err,resp){
    if( !err ){
      self._fetchAccount();
    }else{
      console.error( err );
    }
  });
};

Market.setDefaultExternalAccount = function( extAccId ){
  var self = this;
  Meteor.call('market/accounts/updateExternalAccount',extAccId,{default_for_currency: true},function(){
    self._fetchAccount();
  });
};

Market.deleteExternalAccount = function( extAccId ){
  var self = this;
  Meteor.call('market/accounts/deleteExternalAccount',extAccId,function(){
    self._fetchAccount();
  });
}
