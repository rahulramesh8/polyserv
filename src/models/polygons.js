import { polygonTableName } from "../constants/polygons";

//TODO: decide on a polygon modal

export default ({ config, db }) => ({
  getAllPolygons: async ({ limit = 10 } = {}) => {
    const dbResponse = await db.query(`SELECT * FROM ${polygonTableName} LIMIT ${limit}`);
    return dbResponse.rows;
  }
});
