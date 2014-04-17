define(['Views/AddView', 'Models/User',
  'Controllers/ListController'], function(AddView, User, ListController){

  function start(){
    AddView.render();
    bindEvents();
  }

  function bindEvents(){
    document.getElementById('add').addEventListener('click', function(){
      var users = JSON.parse(localStorage.users);
      var userName = document.getElementById('user-name').value;
      users.push(new User(userName));
      localStorage.users = JSON.stringify(users);

      ListController.start();
    }, false);
  }

  return {
    start : start
  }
})