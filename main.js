
var sqlite3 = require('sqlite3').verbose();
var file=__dirname + "/data/" + "test.db";
var db = new sqlite3.Database(file, sqlite3.OPEN_READONLY);
console.log(db);

var express = require('express');
var restapi = express();

restapi.get('/data', function(req, res){
  var things = [];
  db.serialize(function() {
      db.each("SELECT thing FROM Stuff", function(err, row) {
          console.log(row);
          things.push(row);
      }, function() {
          // All done fetching records, render response
          console.log(things);
          res.status(200).json({title: "Dyn", things: things});
      });
  });
});


restapi.listen(3300);

console.log("Submit GET or POST to http://localhost:3300/data");
