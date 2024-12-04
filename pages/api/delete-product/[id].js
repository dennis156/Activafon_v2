import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // Obtener el ID del producto desde la URL
    
    try {
      // Crear un ObjectId desde el ID proporcionado
      const objectId = new ObjectId(id);

      const client = await MongoClient.connect(process.env.MONGO_URI);
      const db = client.db();

      // Eliminar el producto de la base de datos
      const result = await db.collection('db_info').deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      return res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al eliminar el producto" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
