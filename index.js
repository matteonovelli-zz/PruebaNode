import mongoose from 'mongoose';
import server from './src/server.js';

const dbUrl = 'localhost:27017/peliculas';
const port = 3000;

console.log('Conectando a la base de datos...');
const connect = async () => {
  await mongoose.connect(`mongodb://${dbUrl}`);
  console.log(`Conexión a la base de datos ${dbUrl} establecida...`);
  console.log('Iniciando servidor express...');
  await server.listen(port);
  console.log(`Servidor escuchando en http://localhost:${port}...`);
};

connect();
