// lib/db.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // URI de conexión de MongoDB

let client;
let clientPromise;

if (!uri) {
  throw new Error('Por favor, define la variable de entorno MONGODB_URI.');
}

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usar un cliente global para evitar múltiples conexiones
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, creamos una nueva conexión de cliente
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

export default clientPromise;
