import connectToDatabase from "../../lib/db"; // Tu función para conectar a la BD
import { getSession } from "next-auth/react"; // Si usas autenticación con NextAuth
import ReparaphoneData from "../../models/product"; // Modelo para la colección

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Conectar a la base de datos
    await connectToDatabase();

    // Obtener la sesión del usuario
    const session = await getSession({ req });

    // Verificar que el usuario esté autenticado
    if (!session) {
      return res.status(401).json({ error: "No autorizado" });
    }

    // Verificar que el usuario tenga el rol de Administrador
    const { user } = session;
    if (user.Rol !== "Administrador") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    // Crear un nuevo producto
    const {
      part_name,
      brand,
      model,
      part_number,
      compatibility,
      description,
      price,
      warranty,
      stock,
      category,
      supplier,
      images,
    } = req.body;

    const newProduct = new ReparaphoneData({
      part_name,
      brand,
      model,
      part_number,
      compatibility,
      description,
      price,
      warranty,
      stock,
      category,
      supplier,
      images,
    });

    // Guardar el producto en la base de datos
    await newProduct.save();

    return res.status(201).json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
