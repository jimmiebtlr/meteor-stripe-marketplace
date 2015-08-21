SimpleSchema.debug = true;
describe('PurchaseHistory',function() {
  beforeEach(function(done) {
    Market.PurchaseHistory.remove({},done);
  });

  describe('purchased',function() {
    it('should return true if item has been purchased',function() {
      Market.PurchaseHistory.insert({
        userId: 'useruseruseruser',
        charges: [{
          destinationId: 'destdestdestdest',
          amount: 5,
          applicationFee: 2,
          itemType: 'Item',
          itemId: 'idididididididid'
        }],
        total: 5
      });

      expect(
        Market.PurchaseHistory.purchased(
          'useruseruseruser',
          'Item',
          'idididididididid'
        )
      ).toBe(true);
    });
    it('should return false if item has not been purchased',function() {
      Market.PurchaseHistory.insert({
        userId: 'useruseruseruser',
        charges: [{
          destinationId: 'destdestdestdest',
          amount: 5,
          applicationFee: 2,
          itemType: 'Item',
          itemId: 'idididididididid'
        }],
        total: 5
      });

      expect(
        Market.PurchaseHistory.purchased(
          'useruseruseruser',
          'Item',
          'notpurchasedid'
        )
      ).toBe(false);
    });
  });
});
