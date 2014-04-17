define(function(){

  function render(parameters){

    var appDiv = document.getElementById('list');
    var users = parameters.users;

    var html = '<ul>';
    for (var i = 0, len = users.length; i < len; i++){
      html+= '<li>' + users[i].name + '</li>';
    }
    html+= '</ul>';
    console.log(html);

    appDiv.innerHTML= html;

  }

  return {
    render : render
  }

});