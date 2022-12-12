var DB = require("../dbconfig2.js");

export default async function handler(req, res) {
  const query =
    "SELECT cat.id, cat.nombre, cat.stracronimo, cat.strMensajeCarta, COUNT(carta.id) AS total  FROM categorias AS cat LEFT JOIN tblcarta AS carta ON cat.id = carta.idCategoria WHERE carta.visible = 1 GROUP BY cat.id ORDER BY cat.id ASC";
  const values = [];
  DB.query(query, values, function (data, error) {
    if (error) res.status(500).json({ error: error.message });
    data.length > 0 ? res.status(200).json(data) : res.status(204).json({});
  });
}
