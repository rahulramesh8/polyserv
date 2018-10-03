import { polygonTableName, POLYGON_QUERY_DB_MAP, POLYGON_QUERY_TYPES, DB_FIELDS } from "../constants/polygons";

export default ({ config, db }) => ({
  getAllPolygons: async ({ limit = 50 } = {}) => {
    const dbResponse = await db.query(`SELECT * FROM ${polygonTableName} LIMIT ${limit}`);
    return dbResponse.rows;
  },
  getPolygonByQueryType: async function({ queryType, limit = 50 }) {
    if(queryType === POLYGON_QUERY_TYPES.ALL) return this.getAllPolygons({ limit });
    const dbTypesToQuery = POLYGON_QUERY_DB_MAP[queryType].reduce( (accumulator, typeString, index) => {
      return index === 0 ? `'${typeString}'` :`${accumulator}, '${typeString}'`
    }, '')
    const dbResponse = await db.query(`SELECT * FROM ${polygonTableName} WHERE ${DB_FIELDS.TYPE} IN (${dbTypesToQuery}) LIMIT ${limit}`);
    return dbResponse.rows;
  }
});
