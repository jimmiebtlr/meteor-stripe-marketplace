Stripe = StripeAPI(Meteor.settings.Stripe.secretKey); 

xdescribe("Stripe integration",function(){
  describe("Market method 'market/accounts/get'",function(){
    it("should return an account",function(done){
      Stripe.accounts.create({
        managed: true,
        country: "US"
      },Meteor.bindEnvironment(function(err,account){
        expect( err ).toBe( null );

        spyOn(Market._stateCollection,'findOne').and.returnValue({
          accountId: account.id
        });

        Market.userId = "test";  // TODO Any less crappy way to do this?
        
        var account = Market._methods["market/accounts/get"]();
        expect( typeof(account) ).toBe( 'object' );
        expect( typeof(account.id) ).toBe( 'string' );
        done();
      }));
    });
  });
});
