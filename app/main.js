require(['Models/User', 'Controllers/ListController',
  'Controllers/AddController', 'Routers/Routes'],
  function(User, ListController, AddController, Router){
    var users = [new User('Barney'),
                new User('Cartman'),
                new User('Sheldon')];
    localStorage.users = JSON.stringify(users);

    Router.startRouting();
});