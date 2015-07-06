StripeMarketplaceImplementation._schemas.checkoutMethod = new SimpleSchema({
  expectedTotal: {
    type: Number
  },
  id: {
    type: SimpleSchema.RegEx.ID
  },
  type: {
    type: String
  }
});

Meteor.methods({
  'checkout': function(params){
    check( params, Market._schemas.checkoutMethod );
    var userId = this.userId;
    var profile = Market._profiles[ params.type];
    if( profile ){
      var charges = profile.charges( params.id, params.type );
      var actualTotal = 0;
      _.each(profile.charges( params.id, params.type ), function(c){ actualTotal += c.total; });
      if( actualTotal === params.expectedTotal ){
        try{
          _.each(charges, function(c){
            c.userId = userId;
            Market.charge( c );
          });
        }catch(e){
          profile.onError();
          throw new Meteor.Error(e);
        }
      }else{
        profile.onError();
        throw new Meteor.Error("Market expected total: " + params.expectedTotal + " did not equal actual total: " + actualTotal );
      }
    }else{
      throw new Meteor.Error("Market profile type is not defined: " + params.type );
    }
  }
});
