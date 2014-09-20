define(['hbs!assets/templates/IndexView'],function(indexViewTempl) {


  function render(){
  	var selector = document.querySelector('.Main');
  	selector.innerHTML = indexViewTempl();
  }


  return {
    render:render
  }

});