import resource from 'resource-router-middleware';
import { getBoundsArrayFromQuery , getLoadError } from '../lib/polygons-api';
import polygonModelGen from '../models/polygons';

export default ({ config, db }) => resource({
  id: 'polygons',

  load: async ({ query: { bounds = '' }}, id, callback) => {
    const boundsArray = getBoundsArrayFromQuery({ queryBounds: bounds });
  
    //TODO: get polygon list for bounds
    try {
      const polygons = polygonModelGen({ config, db }).getAllPolygons({ limit: 20 });
      callback(getLoadError({ boundsArray, polygonType: id }), polygons);
    } catch (error) {
      console.error(error);
    }
  
  },

  read: ({ polygons }, res) => {
    res.json({ polygons })
  }
});