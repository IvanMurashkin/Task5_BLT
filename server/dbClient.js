const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Task5_BLT',
    password: 'kl5os9tr1',
    port: 5432
});

module.exports = client;
