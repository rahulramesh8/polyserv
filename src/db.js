import { Client } from "pg";

const initDB = async () => {
  const client = new Client();
  await client.connect();
	return client;
}

export default initDB;
