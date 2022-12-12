// import { dbconnection } from "../dbconfig";

var DB = require("../dbconfig2.js");

export default async function handler(req, res) {
  const query = "SELECT * FROM `tblschedule`";
  const values = null;
  DB.query(query, values, function (data, error) {
    if (error) res.status(500).json({ error: error.message });
    data.length > 0 ? res.status(200).json(data) : res.status(204).json({});
  });
}
