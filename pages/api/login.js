import clientPromise from "../../lib/db"; // Importamos la conexión actual

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { correo, password } = req.body;

  console.log("Correo recibido:", correo);
  console.log("Contraseña recibida:", password);

  if (!correo || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  try {
    // Conecta a la base de datos
    const client = await clientPromise;
    const db = client.db("Reparaphone_data");
    const collection = db.collection("dbo_admin_users"); // Cambia por el nombre de tu colección

    // Busca al usuario por correo
    const user = await collection.findOne({ Correo: correo });

    if (!user) {
      console.log("Usuario no encontrado:", correo);
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Compara la contraseña
    const bcrypt = require("bcryptjs");
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Devuelve el usuario si las credenciales son válidas
    const { Password, ...userData } = user; // Excluye la contraseña del objeto de usuario
    return res.status(200).json({ user: userData });

  } catch (error) {
    console.error("Error en la autenticación:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
