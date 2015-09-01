USE AT YOUR OWN RISK.  STILL IN ACTIVE DEVELOPMENT.

Any testing and feedback provided is appreciated.

# Setup
To get up and running you'll need a stripe account, and some basic cofiguration.

### config

    Market.configure({
      checkout: { 
        charges: someFunction,
        onError: someFunction
      }
    });


Where charges returns an object of the format 

      userId: {  // USer Id of the person getting charged
        type: SimpleSchema.RegEx.ID
      },
      destinationId: {  // UserId of the person who is receiving the credit
        type: SimpleSchema.RegEx.ID
      },
      amount: {  // Total cost to user, including stripe fee, application fee, and any other fees involved
        type: Number,
        min: 0
      },
      applicationFee: {
        type: Number,
        optional: true,
        min: 0
      },
      itemType: {  // These are used for purchase history
        type: String
      },
      itemId: {
        type: SimpleSchema.RegEx.ID
      }

### settings file

    {
      "public" : {
        "Stripe" : {
          "publicKey" : "Public_Key"
        }
      },
      "Stripe" : {
        "secretKey" : "Secret_Key"
      }
    }

# Purchase History
We track users purchase history for them.  This is based on the values for itemType and itemId from the charges function. It is located at 

    Market.PurchaseHistory  // Mongo collection

We also provide a few helper methods 
 
    Market.PurchaseHistory.purchased( userId, type, id ); // True or False

# Testing

In the package directory run 

    ./test.sh

# TODO
* Make initialization and load order better
* Improve Readme
* Add webhook listener
* Add methods to manage credit cards
* Add methods to manage bank accounts
* Is there a better way to handle query of bank accounts and credit cards?
* Split into core and stripe?
