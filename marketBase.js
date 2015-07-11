StripeMarketplaceImplementation = function(){
  _.each( this._onLogin, function( f ){
    Accounts.onLogin( f );
  });
  
  _.each( this._onLogout, function( f ){
    Accounts.onLogout( f );
  });

  this._settings = {};
  if( Meteor.isServer ){
    Meteor.methods( this._methods );
    this._onCustomerCreateCallbacks = [];
    this._onAccountCreateCallbacks = [];
  }
};

StripeMarketplaceImplementation.prototype._schemas = {};
StripeMarketplaceImplementation.prototype._profiles = {};

StripeMarketplaceImplementation.prototype._onCreate = [];
StripeMarketplaceImplementation.prototype._onLogin = [];
StripeMarketplaceImplementation.prototype._onLogout = [];

StripeMarketplaceImplementation.prototype.configure = function(settings){
  this._settings = _.extend(this._settings, settings);
};
