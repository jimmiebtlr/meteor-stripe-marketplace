Meteor.startup(function() {
  // not sure why window is necessary
  window.Stripe.setPublishableKey( Meteor.settings.public.Stripe.publicKey );
});
