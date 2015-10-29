Market = {};

Market.schemas = {};
Market._profiles = {};
Market._methods = {};

Market._settings = {};
Market._tmpStore = new ReactiveDict();

if( Meteor.isServer ){
  Market._publications = {};
  Market._onAccountCreateCallbacks = [];
  Market._onCustomerCreateCallbacks = [];
}

Market.configure = function(settings){
  this._settings = _.extend(this._settings, settings);
};
