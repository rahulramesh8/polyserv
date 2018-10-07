import { polygonTableName } from "../constants/polygons";
import { mapPolygonRecordToGeoJson } from "../lib/geojson";

export default ({ config, db }) => ({
  getAllPolygons: async ({ limit = 10 } = {}) => {
    const dbResponse = await db.query(`SELECT * FROM ${polygonTableName} LIMIT ${limit}`);
    return dbResponse.rows.map(mapPolygonRecordToGeoJson);
  }
});
