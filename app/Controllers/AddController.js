define(['Views/AddView', 'Models/User',
  'Controllers/ListController'], function(AddView, User, ListController){

  function start(){
    AddView.render();
    bindEvents();
    console.log('here!');
  }

  function bindEvents(){
    document.getElementById('add').addEventListener('click', function(){
      var users = JSON.parse(localStorage.users);
      var userName = document.getElementById('user-name').value;
      users.push(new User(userName));
      localStorage.users = JSON.stringify(users);
      ListController.start();
      AddView.render();
    }, false);
  }

  return {
    start : start
  }
})