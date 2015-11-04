var syncGetAccount = Meteor.wrapAsync( Stripe.accounts.retrieve, Stripe.accounts );
Market._methods["market/accounts/get"] = function(){
  check( this.userId, String );
  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncGetAccount( state.accountId );
};

var syncCreateExtAccount = Meteor.wrapAsync( Stripe.accounts.createExternalAccount, Stripe.accounts );
Market._methods["market/accounts/createExternalAccount"] = function(token){
  check( token, String );
  check( this.userId, String );

  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncCreateExtAccount( state.accountId, {external_account: token} );
};

var updateObjectSchema = new SimpleSchema({
  default_for_currency: {
    type: Boolean
  }
});
var syncUpdateExternalAccount = Meteor.wrapAsync( Stripe.accounts.updateExternalAccount, Stripe.accounts );
Market._methods["market/accounts/updateExternalAccount"] = function(bankAccountId, updateReq ){
  check( bankAccountId, String );
  check( updateReq, updateObjectSchema );
  check( this.userId, String );

  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncUpdateExternalAccount( state.accountId, bankAccountId, updateReq );
};

var syncDeleteExternalAccount = Meteor.wrapAsync( Stripe.accounts.deleteExternalAccount, Stripe.accounts );
Market._methods["market/accounts/deleteExternalAccount"] = function(bankAccountId ){
  check( bankAccountId, String );
  check( this.userId, String );

  var state = Market._stateCollection.findOne({'userId': this.userId});

  return syncDeleteExternalAccount( state.accountId, bankAccountId );
};


Market._methods["market/accounts/acceptTOS"] = function(  ){
  var self = this;
  check( self.userId, String );

  var state = Market._stateCollection.findOne({'userId': self.userId});

  var tos_acceptance = {
    user_agent: self.connection.httpHeaders['user-agent'],
    date: moment().unix(),
    ip: self.connection.clientAddress
  };
  check( tos_acceptance, Market.schemas.stripeTOS );
  Market._stateCollection.update({'userId': self.userId},{$set: {tosAcceptance: true}});

  Stripe.accounts.update( state.accountId, { tos_acceptance: tos_acceptance })
}

Meteor.methods({
  "market/accounts/createExternalAccount": Market._methods["market/accounts/createExternalAccount"],
  "market/accounts/updateExternalAccount": Market._methods["market/accounts/updateExternalAccount"],
  "market/accounts/deleteExternalAccount": Market._methods["market/accounts/deleteExternalAccount"],
  "market/accounts/get":                   Market._methods["market/accounts/get"],
  "market/accounts/acceptTOS":             Market._methods["market/accounts/acceptTOS"]
});
