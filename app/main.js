require(['Models/User', 'Controllers/ListController', 'Controllers/AddController'],
  function(User, ListController, AddController){
    var users = [new User('Barney'),
                new User('Cartman'),
                new User('Sheldon')];
    localStorage.users = JSON.stringify(users);

    ListController.start();
    AddController.start();
});