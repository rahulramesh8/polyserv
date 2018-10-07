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

export const polygonTableName = 'myTable';

export const DB_FIELDS = {
  TYPE: 'type',
  PROPERTIES_TYPE: 'propertiestype',
  GEOMETRY_COORDINATES: 'geometrycoordinates',
  PROPERTIES_NAME: 'propertiesname',
  GEOMETRY_TYPE: 'geometrytype'
};