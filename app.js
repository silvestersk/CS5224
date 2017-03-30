
//------------------------------------------------------------------------------
// node.js HSTA application for Bluemix
//------------------------------------------------------------------------------

var express = require('express');

var cfenv = require('cfenv');

var app = express();

app.use(express.static(__dirname + '/public'));

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});

var ibmdb = require('ibm_db');

global.dbConnString  =   "DATABASE=BLUDB;HOSTNAME=dashdb-entry-yp-dal09-08.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=dash6678;PWD=080e2cff129d;";

app.get('/select', function(req,res) {
ibmdb.open(dbConnString,function(err,conn) {
  if(err) {
    console.error("Error:",err);
    return;
  } else {
    var query = "select * from dash6678.TENDER_BID_HISTORY FETCH FIRST 10 ROWS ONLY";
    conn.query(query, function(err,rows) {
      if(err) {
        console.log("Error :", err);
        return;
      } else {
        res.send(rows);
        conn.close(function() {
          console.log("Connection sucessfully closed");
        });
      };
    });
  };
 });
});


