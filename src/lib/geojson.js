export const mapDataToGeoJson = ({
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