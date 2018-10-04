import { polygonTableName } from "../constants/polygons";
import { mapDataToGeoJson } from "../lib/geojson";
import { DB_FIELDS } from '../constants/polygons';
//TODO: decide on a polygon modal

export default ({ config, db }) => ({
  getAllPolygons: async ({ limit = 10 } = {}) => {
    const dbResponse = await db.query(`SELECT * FROM ${polygonTableName} LIMIT ${limit}`);
    return dbResponse.rows.map( polygon => {
      return mapDataToGeoJson({
        type: polygon[DB_FIELDS.TYPE],
        coordinates: polygon[DB_FIELDS.GEOMETRY_COORDINATES],
        geometryType: polygon[DB_FIELDS.GEOMETRY_TYPE],
        name: polygon[DB_FIELDS.PROPERTIES_NAME],
        propertyType: polygon[DB_FIELDS.PROPERTIES_TYPE]
      });
    });
  }
});
