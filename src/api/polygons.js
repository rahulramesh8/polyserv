import resource from 'resource-router-middleware';
import { getBoundsArrayFromQuery , getLoadError } from '../lib/polygons-api';

export default ({ config, db }) => resource({
  id: 'polygons',

  load: ({ query: { bounds = '' }}, id, callback) => {
    const boundsArray = getBoundsArrayFromQuery({ queryBounds: bounds });
  
    //TODO: get polygon list for bounds
    const polygons = [];
  
    callback(getLoadError({ boundsArray, polygonType: id }), polygons);
  },

  read: ({ polygons }, res) => {
    res.json({ polygons })
  }
});