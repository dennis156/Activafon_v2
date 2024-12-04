// pages/api/users.js
import clientPromise from "../../lib/db";  // Asegúrate de que clientPromise sea el que configuramos antes

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Conectar a MongoDB usando MongoClient
    const client = await clientPromise;

    // Seleccionar la base de datos y colección
    const db = client.db('Reparaphone_data');  // Asegúrate de usar el nombre correcto de tu base de datos
    const users = await db.collection('dbo_admin_users').find({}).toArray();  // Asegúrate de usar el nombre correcto de tu colección de usuarios

    // Verifica si hay usuarios
    if (users.length === 0) {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }

    // Enviar la lista de usuarios como respuesta
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
