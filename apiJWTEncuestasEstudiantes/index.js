// Importamos dependencias:
// express -> para crear el servidor web
// axios -> para hacer peticiones HTTP a APIs externas
// redis -> para conectarnos a Redis y guardar/leer datos en caché
import express from 'express';
import axios from 'axios';
import { createClient } from 'redis';

const app = express();

// Creamos el cliente de Redis, apuntando a nuestro contenedor local en el puerto 6379
const client = createClient({
  url: 'redis://localhost:6379'
});

// Si ocurre un error al conectarse o usar Redis, lo mostramos en consola
client.on('error', (err) => console.error('Redis Client Error', err));

// Definimos una ruta GET en nuestro servidor: /nasa
app.get('/nasa', async (req, res) => {
  try {
    // 1. Revisamos si ya tenemos los datos en Redis
    const reply = await client.get('nasa');
    if (reply) {
      console.log('Data retrieved from Redis');
      // Si existen, los devolvemos desde caché (mucho más rápido)
      return res.json(JSON.parse(reply));
    }

    // 2. Si no están en Redis, pedimos los datos a la API de NASA
    const { data } = await axios.get('https://images-api.nasa.gov/search?q=moon');

    // 3. Guardamos la respuesta en Redis para futuras peticiones
    await client.set('nasa', JSON.stringify(data));

    console.log('Data saved to Redis');
    // Devolvemos la respuesta original al cliente
    return res.json(data);

  } catch (err) {
    // Si algo falla (Redis o la API), lo mostramos y devolvemos error 500
    console.error(err);
    res.status(500).send('Error fetching nasa');
  }
});

// Función principal: conecta a Redis y arranca el servidor en puerto 3000
const main = async () => {
  await client.connect();
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

// Ejecutamos la función principal
main();