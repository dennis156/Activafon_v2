import clientPromise from '../../../lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('Reparaphone_data');

  if (req.method === 'GET') {
    const { id } = req.query; // Cambia _id por id

    console.log('Received id:', id); // Depuración para verificar el ID recibido

    if (id && ObjectId.isValid(id)) { // Verifica que el id sea válido
      try {
        const listing = await db.collection('db_info').findOne({ _id: new ObjectId(id) }); // Usa new ObjectId

        console.log('Fetched listing:', listing); // Depuración para verificar el resultado

        if (!listing) {
          return res.status(404).json({ message: 'Listing not found' });
        }

        return res.status(200).json(listing);
      } catch (error) {
        console.error('Error fetching listing:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Incluye el mensaje de error
      }
    } else {
      return res.status(400).json({ message: 'Invalid ID format' }); // Respuesta cuando el ID no es válido
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
