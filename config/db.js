const mongoose = require('mongoose');
const { connect, connection, set } = mongoose;

set('strictQuery', false);
connect(process.env.DB_URL);

connection.on('connected', () => console.log('Connected'));
connection.on('error', (err) => console.log('ERROR', err));

module.exports = connection;
