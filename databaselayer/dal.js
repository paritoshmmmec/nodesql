var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config=require('../databaseconfig/config')

function executeQuery(sql,done){
	var connection = new Connection(config);
	connection.on('connect', function(err) {
		executeStatement(sql,connection,function(connection,data){
           connection.close();
           done(data)
		});
	});
}

function executeStatement(sql,connection,done) {
    var	request = new Request(sql, function(err, rowCount) {});
    var data=[];

	request.on('row', function(columns) {
		var row={};
		columns.forEach(function(column) {
            row[column.metadata.colName]= column.value;
		});
		data.push(row);
	});

	request.on('doneProc', function (rowCount, more, rows) {
		done(connection,data)
	});

	connection.execSql(request);
}

module.exports = {
	executeQuery:executeQuery
}