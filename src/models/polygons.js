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
  },
  getPolygonsByBounds: async ({ bounds, queryType = POLYGON_QUERY_TYPES.ALL, limit = 50 }) => {

    const dbTypesToQuery = POLYGON_QUERY_DB_MAP[queryType].reduce( (accumulator, typeString, index) =>
    index === 0 ? `'${typeString}'` :`${accumulator}, '${typeString}'`
    , '');

    const query = `
      SELECT * FROM ${polygonTableName}
      WHERE ${DB_FIELDS.PROPERTIES_TYPE} IN (${dbTypesToQuery})
      AND (
        (
          ${DB_FIELDS.PROPERTIES_CENTER_LAT} BETWEEN ${bounds[2]} AND ${bounds[0]}
          AND ${DB_FIELDS.PROPERTIES_CENTER_LNG} BETWEEN ${bounds[3]} AND ${bounds[1]}
        ) 
        OR (
          ${DB_FIELDS.PROPERTIES_HIGH_LAT} BETWEEN ${bounds[2]} AND ${bounds[0]}
          AND ${DB_FIELDS.PROPERTIES_HIGH_LNG} BETWEEN ${bounds[3]} AND ${bounds[1]}
        )
        OR (
          ${DB_FIELDS.PROPERTIES_LOW_LAT} BETWEEN ${bounds[2]} AND ${bounds[0]}
          AND ${DB_FIELDS.PROPERTIES_LOW_LNG} BETWEEN ${bounds[3]} AND ${bounds[1]}
        )
      )
      LIMIT ${limit}
    `;
    const dbResponse = await db.query(query);
    return dbResponse.rows.map(mapPolygonRecordToGeoJson);
  }
});
