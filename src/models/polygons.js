import { polygonTableName, POLYGON_QUERY_DB_MAP, POLYGON_QUERY_TYPES, DB_FIELDS } from "../constants/polygons";
import { mapPolygonRecordToGeoJson } from "../lib/geojson";

export default ({ config, db }) => ({
  getAllPolygons: async ({ limit = 50 } = {}) => {
    const dbResponse = await db.query(`SELECT * FROM ${polygonTableName} LIMIT ${limit}`);
    return dbResponse.rows.map(mapPolygonRecordToGeoJson);
  },
  getPolygonByQueryType: async function({ queryType, limit = 50 }) {
    if(queryType === POLYGON_QUERY_TYPES.ALL)
      return this.getAllPolygons({ limit });

    const dbTypesToQuery = POLYGON_QUERY_DB_MAP[queryType].reduce( (accumulator, typeString, index) =>
    index === 0 ? `'${typeString}'` :`${accumulator}, '${typeString}'`
    , '');

    const dbResponse = await db.query(`SELECT * FROM ${polygonTableName} WHERE ${DB_FIELDS.PROPERTIES_TYPE} IN (${dbTypesToQuery}) LIMIT ${limit}`);
    return dbResponse.rows.map(mapPolygonRecordToGeoJson);
  }
});
