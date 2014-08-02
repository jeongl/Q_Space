module.exports = function() {
	return {
		test : function() {
			console.log('server test: ')
		}
	}
}

module.exports.DestroyCreateDBs = function(pool, options) {
 
	// var Databases = (function() {
	// 	var tempArray=[];
	// 	for (var i=0; i<45; i++){
	// 		tempArray.push('first' + String(i));
	// 	}
	// 	return tempArray
	// }());

	var statements = {
		drop : 'drop database if exists ',
		create : 'create database if not exists '
	};

	var start = new Date().getTime();
	for (var each in options){
		if (options.hasOwnProperty('DropDBs')){
			executeQueries(statements.drop, options.DropDBs);
		}
		if (options.hasOwnProperty('AddDBs')){
			executeQueries(statements.create, options.AddDBs);	
		}
	}
  var end = new Date().getTime();
  var time = end - start;
  console.log('Start: ', start);
  console.log('End:', end);
  console.log('Execution Time: ', time);

  function executeQueries (statement, DBs){
		DBs.forEach(function(DB){
			pool.getConnection(function(err, connection) {
			  connection.query( statement+DB, function(err, rows) {
			  	if (err) throw err;
			    // And done with the connection.
			    connection.release();
			    // Don't use the connection here, it has been returned to the pool.
			  });
			});  		
		})
  }

}