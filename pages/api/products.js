import clientPromise from "../../lib/db"; // Importar clientPromise directamente
import {
  getSession
} from "next-auth/react"; // Si usas autenticación con NextAuth
import ReparaphoneData from "../../models/product"; // Modelo para la colección

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    // Conectar a la base de datos
    const client = await clientPromise;
    const db = client.db(); // Obtener la base de datos

    // Obtener la sesión del usuario
    const session = await getSession({
      req
    });

    // Verificar que el usuario esté autenticado
    // if (!session) {
    //   return res.status(401).json({ error: "No autorizado" });
    // }

    // Verificar que el usuario tenga el rol de Administrador
    // const { user } = session;
    // if (user.Rol !== "Administrador") {
    //   return res.status(403).json({ error: "Acceso denegado" });
    // }

    // Crear un nuevo producto
    // Crear un nuevo producto
    const {
      part_name,
      brand,
      model,
      part_number,
      description,
      price,
      stock,
      category,
      part_image,
      warranty,  // Incluir warranty
    } = req.body;
    
    // Crear un nuevo producto
    const newProduct = new ReparaphoneData({
      part_name,
      brand,
      model,
      part_number,
      description,
      price,
      stock,
      category,
      images: [part_image], // Guardar la URL de la imagen en el campo 'images' como un array
      warranty,  // Guardar la garantía
    });
    

    // Guardar el producto en la base de datos
    const collection = db.collection("db_info"); // Usa la colección adecuada para tus productos
    await collection.insertOne(newProduct); // Insertar el nuevo producto

    return res.status(201).json({
      message: "Producto agregado exitosamente"
    });


  } catch (error) {
    console.error("Error al agregar producto:", error);
    return res.status(500).json({
      error: "Error en el servidor"
    });
  }
}