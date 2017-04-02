
exports.listSysTables = function(ibmdb,connString, qry) {
    return function(req, res) {
	   	   
       ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else {
				conn.query(qry, function(err, tables, moreResultSets) {
					
				if ( !err ) { 
					console.log(tables[0]);
					res.render('tablelist', {
						"tablelist" : tables
					});
					//resp.json.stringify(rows);
			

				} else {
				   res.send("error occurred " + err.message);
				}

				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		} );
	   
	}
}
