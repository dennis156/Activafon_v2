// pages/api/listings/index.js
import clientPromise from '../../../lib/db';

export default async function handler(req, res) {
  try {
    // Intentamos obtener el cliente de la base de datos
    const client = await clientPromise;

    if (!client) {
      throw new Error('Failed to connect to MongoDB');
    }

    // Nos conectamos a la base de datos 'Reparaphone_data' y a la colección 'db_info'
    const db = client.db('Reparaphone_data'); // Nombre de la base de datos

    const listings = await db
      .collection('db_info') // Nombre de la colección
      .find({})               // Aquí podrías agregar filtros si es necesario
      .limit(10)              // Limitar a los primeros 10 registros
      .toArray();            // Convertir los resultados en un arreglo

    // Si la consulta fue exitosa, respondemos con los datos
    res.status(200).json(listings);
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y respondemos con un error 500
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}
