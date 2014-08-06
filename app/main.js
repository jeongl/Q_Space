require.config({
  paths: {
    hbs: '../lib/require-handlebars-plugin/hbs',
    Two: '../bower_components/two/build/two',
    Spin: '../bower_components/spin/spin.min',
    jquery: '../bower_components/jquery/dist/jquery.min'
  }
}),
require(['Controllers/QuoteCollectionController',
'Controllers/IndexViewController', 'Routers/Routes'],

  function(QuoteCollectionController, IndexViewController, Router){
    Router.startRouting();
    console.log('Routing started: ');
  });