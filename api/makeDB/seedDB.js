module.exports = function() {
	return {
		test : function() {
			console.log('server test: ')
		}
	}
}

module.exports.DestroyCreateDBs = function(pool, options) {

	var statements = {
		drop : 'drop database',
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
		});
  }

}

module.exports.SetupQuotesTable = function(pool) {

	pool.getConnection(function(err, connection){
		if (err) throw err;
		connection.query('use Quotes', function(err, res, fields){
			if (err) throw err;
			var query = 'create table if not exists users (' +
				'id int not null auto_increment, ' +
				'primary key (id),' +
				'Name varchar(100) not null,'  +
				'Quote varchar(500) not null,' +
				'Time varchar(100) not null,'  +
				'Date varchar(100) not null,' +
				'Votes int not null' +
				')'
			connection.query(query, function(err, res, fields){
				if (err) throw err;
			});
			connection.release();
		});
	});

}





