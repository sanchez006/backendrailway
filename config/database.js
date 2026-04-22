require('dotenv').config();
const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    console.log('DB connect: using DATABASE_URL');
} else {
    const useSSL = process.env.DB_SSL === 'true';
    pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'inventariopedro',
        database: process.env.DB_NAME || 'inventario',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        ssl: useSSL ? { rejectUnauthorized: false } : false
    });
    console.log(`DB connect config: host=${process.env.DB_HOST||'localhost'} user=${process.env.DB_USER||'postgres'} db=${process.env.DB_NAME||'inventario'} port=${process.env.DB_PORT||5432}`);
}

pool.on('connect', () => {
    console.log('Conexión exitosa a la base de datos');
});

pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos', err);
});

module.exports = pool;
