var DB = require("../dbconfig2.js");

export default async function handler(req, res) {
  const hash = decodeURIComponent(req.query.hash);
  const query =
    "SELECT res.id AS idReserva, res.idCliente, res.comensales, res.carros, res.tronas, res.fecha_inclusion, res.fecha_reserva, res.estado, res.notasReserva, res.intolerancias, res.hash, cliente.nombre, cliente.apellidos, cliente.phone, cliente.prefCont FROM tblreservas AS res LEFT JOIN tblfidelizacion AS cliente ON res.idCliente = cliente.id WHERE hash = ?";
  const values = [hash];
  DB.query(query, values, function (data, error) {
    if (error) res.status(500).json({ error: error.message });
    data.length > 0 ? res.status(200).json(data[0]) : res.status(204).json({});
  });
}
