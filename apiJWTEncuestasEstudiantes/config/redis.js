// config/redis.js
const { createClient } = require('redis');

// Tu configuración actual apunta a localhost
const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

// Iniciamos la conexión asíncrona
(async () => {
    try {
        await client.connect();
        console.log('✅ Redis conectado correctamente');
    } catch (error) {
        console.error('❌ Error conectando Redis:', error);
    }
})();

module.exports = client;