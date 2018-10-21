import { DB_FIELDS } from "../constants/polygons";
import { functionWithRequiredParams } from "./util";

export const createGeoJson = ({ type, geometry, name, propertyType }) => ({
  type,
  geometry: geometry,
  properties: {
    name,
    type: propertyType
  }
});

const createGeoJsonRequiredParams = functionWithRequiredParams({
  fn: createGeoJson,
  requiredParams: ["type", "geometry", "name", "propertyType"]
});

export const mapPolygonRecordToGeoJson = polygon =>
  createGeoJsonRequiredParams({
    type: polygon[DB_FIELDS.TYPE],
    geometry: polygon[DB_FIELDS.GEOMETRY],
    name: polygon[DB_FIELDS.PROPERTIES_NAME],
    propertyType: polygon[DB_FIELDS.PROPERTIES_TYPE]
  });

export const formatFeaturesToFeatureCollection = ({ features = [] }) => ({
  type: "FeatureCollection",
  features
});
