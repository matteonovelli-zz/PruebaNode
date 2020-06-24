import mongoose from 'mongoose';
import server from './server';
// mongoose.Promise = global.Promise;

const port = 3000;

console.log('Conectando a la base de datos...');

const connect = async () => {
  await mongoose.connect('mongodb://localhost:27017/peliculas');
  console.log('Conexón a la base de datos realizada...');
  console.log('Iniciando servidor express...');
  await server.listen(port);
  console.log(`Servidor escuchando en http://localhost:${port}...`);
};

connect();
