import { isInt } from './util';
import { POLYGON_QUERY_TYPES, POLYGON_QUERY_DB_MAP } from '../constants/polygons';

const errors = {
  invalidPolygonType: "Invalid Request - check your polygon type",
  noBounds: "Invalid Request - please supply bounds",
  invalidBounds: "Invalid Request - bounds supplied are invalid"
};

const boundsAreValid = ({ boundsArray }) =>
  boundsArray.length === 4 && boundsArray.every(isInt);

export const getBoundsArrayFromQuery = ({ queryBounds }) =>
  queryBounds ? queryBounds.split(",") : [];

export const getLoadError = ({ boundsArray, polygonType }) => {
  const isValidPolygonType = !Object.values(POLYGON_QUERY_TYPES).includes(polygonType);
  const polygonTypeError = isValidPolygonType ? errors.invalidPolygonType : null;
  const boundsExistError = !polygonTypeError && !boundsArray.length ? errors.noBounds : polygonTypeError;
  const validBoundsError = !boundsExistError && !boundsAreValid({ boundsArray }) ? errors.invalidBounds : boundsExistError;
  return validBoundsError;
};

export const getSqlListOfPolygonTypes = ({ queryType }) => POLYGON_QUERY_DB_MAP[queryType].reduce(
  (accumulator, typeString, index) =>
  index === 0 ? `'${typeString}'` :`${accumulator}, '${typeString}'`
  , '');
