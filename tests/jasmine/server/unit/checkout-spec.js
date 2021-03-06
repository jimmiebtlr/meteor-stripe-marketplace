describe('\'market/checkout\' meteor method', function() {
  var params;
  beforeEach(function() {
    // Default all to a valid config
    Market.configure({checkout:
      {
        charges: function() {
          return [
            {
              userId: 'jx7GitzKovPf4pvi7',
              destinationId: 'jx7GitzKovPf4pvi7',
              amount: 1000
            }
          ];
        },
        onError: function() {}}
      }
    );

    // Good set of params
    params = {expectedTotal: 1000, id: 'jx7GitzKovPf4pvi7'};

    // Set the userid for
    Market._methods.userId = 'jx7GitzKovPf4pvi7';

    spyOn(Market._stateCollection, 'findOne').and.returnValue({
      customerId: 'testcustomerid',
      accountId: 'accountId'
    });

    spyOn(Market, '_charge');
  });

  it(
    'should charge all charges returned by charge settings function',
    function() {
      Market.configure({checkout: {charges: function() {return [
        {
          userId: 'jx7GitzKovPf4pvi7',
          destinationId: 'jx7GitzKovPf4pvi7',
          amount: 500,
          itemType: 'Item',
          itemId: 'idididididididid'
        },
        {
          userId: 'jx7GitzKovPf4pvi7',
          destinationId: 'jx7GitzKovPf4pvi7',
          amount: 500,
          itemType: 'Item',
          itemId: 'idididididididn2'
        }
      ];}, onError: function() {}}});

      expect(function() {
        Market._methods['market/checkout'](params);
      }).not.toThrow();

      expect(Market._charge).toHaveBeenCalled();
      expect(Market._charge.calls.count()).toBe(2);
    }
  );

  it(
    'should throw an error if Market hasn\'t been configured properly',
    function() {
      Market._settings = {};
      expect(function() {
        Market._methods['market/checkout'](params);
      }).toThrow(new Meteor.Error('Market settings for checkout not found'));

      expect(Market._charge).not.toHaveBeenCalled();
    }
  );

  it('should throw an error if called with invalid parameters',function() {
    expect(function() {
      Market._methods['market/checkout']({});
    }).toThrow();

    expect(Market._charge).not.toHaveBeenCalled();
  });

  it('should throw an error if user is not logged in',function() {
    Market._methods.userId = undefined;
    expect(function() {
      Market._methods['market/checkout'](params);
    }).toThrow();

    expect(Market._charge).not.toHaveBeenCalled();
  });

  it(
    'should throw an error if expected total' +
    'is not the same as the calculated total',
    function() {
      Market.configure({checkout:
        {
          charges: function() {return [];},
          onError: function() {}
        }
      });

      expect(function() {
        Market._methods['market/checkout'](params);
      }).toThrow();

      expect(Market._charge).not.toHaveBeenCalled();
    }
  );
});
