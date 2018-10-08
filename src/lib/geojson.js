import { DB_FIELDS } from '../constants/polygons';
import { functionWithRequiredParams } from './util';

export const createGeoJson = ({
  type,
  coordinates,
  geometryType,
  name,
  propertyType
}) => ({
    type,
    geometry: {
      type: geometryType,
      coordinates: JSON.parse(coordinates)
    },
    "properties": {
      name,
      type: propertyType
    },
});

const createGeoJsonRequiredParams = functionWithRequiredParams({
  fn: createGeoJson,
  requiredParams: [
    'type',
    'coordinates',
    'geometryType',
    'name',
    'propertyType'
  ],
});

export const mapPolygonRecordToGeoJson = polygon => createGeoJsonRequiredParams({
    type: polygon[DB_FIELDS.TYPE],
    coordinates: polygon[DB_FIELDS.GEOMETRY_COORDINATES],
    geometryType: polygon[DB_FIELDS.GEOMETRY_TYPE],
    name: polygon[DB_FIELDS.PROPERTIES_NAME],
    propertyType: polygon[DB_FIELDS.PROPERTIES_TYPE]
  });