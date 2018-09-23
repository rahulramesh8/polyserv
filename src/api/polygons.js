import resource from 'resource-router-middleware';

const errors = {
  invalidPolygonType: 'Invalid Request - check your polygon type',
  noBounds: 'Invalid Request - please supply bounds',
  invalidBounds: 'Invalid Request - bounds supplied are invalid'
};

const isInt = value => !isNaN(parseInt(value));
const boundsAreValid = ({ boundsArray }) => boundsArray.length === 4 && boundsArray.every(isInt);


const getBoundsArrayFromQuery = ({ queryBounds }) => queryBounds.split(',');

const getLoadError = ({ boundsArray, polygonType }) => {
  const isValidPolygonType = !['all', 'province', 'region', 'neighbourhood'].includes(polygonType);
  const polygonTypeError = isValidPolygonType ? errors.invalidPolygonType : null;
  const boundsExistError = !polygonTypeError && !boundsArray.length ? errors.noBounds : polygonTypeError;
  const validBoundsError = !boundsExistError && !boundsAreValid({ boundsArray }) ? errors.invalidBounds : boundsExistError;
  return validBoundsError;
}

export default ({ config, db }) => resource({
  id: 'polygons',

  load: ({ query: { bounds }}, id, callback) => {
    const boundsArray = getBoundsArrayFromQuery({ queryBounds: bounds });
  
    //TODO: get polygon list for bounds
    const polygons = [];
  
    callback(getLoadError({ boundsArray, polygonType: id }), polygons);
  },

  read: ({ polygons }, res) => {
    res.json({ polygons })
  }
});