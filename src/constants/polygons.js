// TODO: update mappings when we have finalised data source
export const POLYGON_QUERY_TYPES = {
  ALL: 'all',
  PROVINCE: 'province',
  REGION: 'region',
  NEIGHBOURHOOD: 'neighbourhood'
};

export const POLYGON_DB_TYPES = {
  DIVISION: 'DIV',
  COUNTY: 'CTY',
  DISTRICT: 'DIS',
  CU: 'CU',
  REGIONAL_COUTRY: 'MRC',
  REGIONAL_DISTICT: 'RD',
  REGION: 'REG',
  REGIONAL_MUNICIPALITY: 'RM',
  TERRITORY: 'TR',
  UNITED_COUNTRIES: 'UC'
}

export const POLYGON_QUERY_DB_MAP = {
  [POLYGON_QUERY_TYPES.PROVINCE]: [
    POLYGON_DB_TYPES.TERRITORY,
    POLYGON_DB_TYPES.UNITED_COUNTRIES
  ],
  [POLYGON_QUERY_TYPES.REGION]: [
    POLYGON_DB_TYPES.COUNTY,
    POLYGON_DB_TYPES.COUNTY,
    POLYGON_DB_TYPES.DISTRICT,
    POLYGON_DB_TYPES.REGIONAL_DISTICT,
    POLYGON_DB_TYPES.REGION,
    POLYGON_DB_TYPES.REGIONAL_MUNICIPALITY
  ],
  [POLYGON_QUERY_TYPES.NEIGHBOURHOOD]: ['N/A'],
};

export const polygonTableName = 'polygons';

export const DB_FIELDS = {
  TYPE: 'type',
  PROPERTIES_TYPE: 'properties_type',
  GEOMETRY: 'geometry',
  PROPERTIES_NAME: 'properties_name',
  PROPERTIES_CENTER_LAT: 'properties_centerlat',
  PROPERTIES_CENTER_LNG: 'properties_centerlng',
  PROPERTIES_LOW_LAT: 'properties_lowlat',
  PROPERTIES_LOW_LNG: 'properties_lowlng',
  PROPERTIES_HIGH_LAT: 'properties_highlat',
  PROPERTIES_HIGH_LNG: 'properties_highlng',
};
