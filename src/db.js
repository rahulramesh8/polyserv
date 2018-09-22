const { Client } = require('pg');

const initDB = async (callback = () => {}) => {
  const client = new Client({
    user: 'admin',
    host: '0.0.0.0',
    database: 'polygons',
    password: 'abc',
    port: 5432,
  });
  await client.connect();
	callback();
}

export default initDB;