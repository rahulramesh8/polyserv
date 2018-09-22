const { Client } = require('pg');

const initDB = async (callback = () => {}) => {
  const client = new Client();
  await client.connect();
	callback();
}

export default initDB;