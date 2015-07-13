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

# Testing

In the package directory run 

    ./test.sh

# TODO
* Improve Readme
* Add webhook listener
* Add methods to manage credit cards
* Add methods to manage bank accounts
* Is there a better way to handle query of bank accounts and credit cards?
