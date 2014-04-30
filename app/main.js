require.config({
  paths: {
    hbs: '../lib/require-handlebars-plugin/hbs',
    Two: '../bower_components/two/build/two'
  }
}),
require(['Controllers/QuoteCollectionController',
  'Controllers/IndexViewController', 'Routers/Routes'],
  function(QuoteCollectionController, IndexViewController, Router){
    Router.startRouting();

  });