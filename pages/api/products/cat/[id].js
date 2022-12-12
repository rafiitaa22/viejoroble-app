var DB = require("../../dbconfig2.js");

export default async function handler(req, res) {
  const id = req.query.id;
  const query =
    "SELECT cat.id AS catID, cat.nombre AS catNombre, carta.id AS cartaID, carta.nombre, carta.descripcion, carta.precio, carta.precioExtraDelivery, carta.boolAvailableTakeAway, carta.visible, carta.strURLImagen, carta.boolDestacado FROM tblcarta AS carta LEFT JOIN categorias AS cat ON carta.idCategoria = cat.id WHERE cat.id = ? ORDER BY idCategoria ASC, nombre ASC";
  const values = [id];
  DB.query(query, values, function (data, error) {
    if (error) res.status(500).json({ error: error.message });
    data.length > 0 ? res.status(200).json(data) : res.status(204).json({});
  });
}
