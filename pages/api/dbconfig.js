import { createPool } from "mysql2/promise";

const config = {
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "viejoroble",
  connectionLimit: 100,
};

let pool = undefined;

// export const dbconnection = mysql.createPool(config);
const connection = () => {
  if (pool) {
    return pool;
  } else {
    pool = createPool(config);
    return pool;
  }
};

export const dbconnection = connection();
// export const dbconnection = mysql.createPool({
//   host: "160.153.129.208",
//   port: 3306,
//   user: "ws677ii_rafa",
//   password: "1RvNXZJnBhiGcTb1",
//   database: "ws677ii_viejoroble20",
// });

// export const dbconnection = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "ws677ii_rafa",
//   password: "1RvNXZJnBhiGcTb1",
//   database: "ws677ii_viejoroble20",
// });
