Package.describe({
    summary: "Simple shopping cart core.",
    name: "elevatedevdesign:stripe-marketplace",
  	version: "0.0.1-rc.1",
    git: "https://github.com/elevatedevdesign/meteor-cart-core.git"
});

Package.on_use(function (api) {
	api.versionsFrom("METEOR@1.0");
	
  api.use([
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.3.3',
    'benjick:stripe@3.3.4',
    'jeffpatzer:jquery-payment@0.0.5',
    'peppelg:on-login-logout@1.0.0',
    'elevatedevdesign:autoform-jquery-payments@0.0.2'
  ],['client','server']);
  
  api.add_files([
      'init.js',
      'finalize.js'
    ],
    ['client','server']
  );
  
  api.add_files(
    'client/init.js',
    ['client']
  );
  
  api.add_files(
    'server/init.js',
    ['server']
  );

  api.export('Stripe', ['client','server']);
});
