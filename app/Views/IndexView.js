define(['hbs!assets/templates/IndexView'],function(indexViewTempl) {


  function render(){
  	var date = new Date();
  	var selector = document.querySelector('.Main');
  	// console.log('Date: ', date.getUTCMonth(), date.getUTCDate(), date.getUTCFullYear() );
  	date =  date.getUTCMonth()+1 + '-' + date.getUTCDate() + '-' + date.getUTCFullYear();
  	console.log(date)
  	selector.innerHTML = indexViewTempl({Date:date});
  }


  return {
    render:render
  }

});