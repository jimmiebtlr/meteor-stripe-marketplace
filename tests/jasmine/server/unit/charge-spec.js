describe("Market.charge",function(){
  var charge;
  
  beforeEach(function(){
    charge = {
      userId: "useruseruseruser", 
      destinationId: "destdestdestdest", 
      amount: 500, 
      applicationFee: 50
    };
    spyOn(Market._stripe.charges,"create").and.callFake(function(c, callback){});

    spyOn(Market._stateCollection,"findOne").and.callFake(function(query){
      if( query.userId === "useruseruseruser" ){
        return {customerId: "id"};
      }

      if( query.userId === "destdestdestdest" ){
        return {accountId: "id"};
      }
    });
  });

  it("should successfully charge to stripe if user and destination records are found",function(){
    expect( function(){ Market.charge( charge ); }).not.toThrow();
    expect( Market._stripe.charges.create ).toHaveBeenCalled();
  });
  
  it("should throw error if user isn't found",function(){
    expect(function(){
      Market.charge( _.extend(charge,{userId: "undefineundefine"}) );
    }).toThrow();

    expect( 
      Market._stripe.charges.create
    ).not.toHaveBeenCalled();
  });
  
  it("should throw error if destination isn't found",function(){
    expect(function(){
        Market.charge( _.extend(charge,{destinationId: "undefineundefine"}) );
    }).toThrow();

    expect( 
      Market._stripe.charges.create
    ).not.toHaveBeenCalled();
  });
});
