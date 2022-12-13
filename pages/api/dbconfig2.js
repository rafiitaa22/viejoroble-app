import mysql from "mysql2";

var pool = mysql.createPool({
  host: "localhost",
  //port: 8889,
  port: 3306,
  user: "root",
  //password: "root",
  database: "viejoroble",
  connectionLimit: 100,
});

var DB = (function () {
  function _query(query, params, callback) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(pool);
        console.log(err);
        connection.release();
        callback(null, err);
        throw err;
      }

      connection.query(query, params, function (err, rows) {
        connection.release();
        if (!err) {
          callback(rows);
        } else {
          callback(null, err);
        }
      });

      connection.on("error", function (err) {
        connection.release();
        callback(null, err);
        throw err;
      });
    });
  }

  return {
    query: _query,
  };
})();

module.exports = DB;
