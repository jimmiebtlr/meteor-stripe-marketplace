/*
 * Important note: These will fail if you haven't setup you're settings correctly yet
 */
describe("Market.charge/stripe integration",function(){
  it("should be successful",function(done){
    // Create both users
    var userId = Accounts.createUser({'email': "user@test.com"});
    var destId = Accounts.createUser({'email': "dest@test.com"});
    
    Market.configure({checkout: {
      charges: function(){}, 
      onError: function(){},
    }}); 

    var accCreated = 0;
    var custCreated = 0;

    var accCallback = function(){
      accCreated++;
      chargeFunc();
    };

    var custCallback = function(){
      custCreated++;
      chargeFunc();
    };
   
    // Watch for the completion of creating both accounts, then charge and test
    var chargeFunc = function(){
      if( accCreated === 2 && custCreated === 2 ){
        var customerId = Market._stateCollection.findOne({'userId': userId}).customerId;
        Market._stripe.customers.createSource(customerId,{source: {
          object: "card",
          number: "4242424242424242",
          exp_month: "08",
          exp_year: "2025",
          currency: "usd",
          cvc: "123"
        }},Meteor.bindEnvironment(function(err){
          expect( err ).toBe( null );
          Market.charge({
            destinationId: destId,
            userId: userId,
            amount: 1000,
            applicationFee: 50
          },function(err,c,res){
            expect( err ).toBe( null );
            expect( res.status ).toBe( "succeeded" );
            expect( res.paid ).toBe( true );
            done();
          });
        }));
      }
    };

    Market._onAccountCreateCallbacks.push( accCallback );
    Market._onCustomerCreateCallbacks.push( custCallback );

    _.each( Market._onLogin, function(f){
      f( {user: {_id: destId}} );
      f( {user: {_id: userId}} );
    });
  });
});
