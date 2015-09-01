Stripe = StripeAPI(Meteor.settings.Stripe.secretKey); 
Market._stripe = Stripe;
