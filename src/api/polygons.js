import resource from 'resource-router-middleware';
import { getBoundsArrayFromQuery , getLoadError } from '../lib/polygons-api';
import polygonModelGen from '../models/polygons';

export default ({ config, db }) => resource({
  id: 'polygons',

  load: async ({ query: { bounds = '' }}, id, callback) => {
    const boundsArray = getBoundsArrayFromQuery({ queryBounds: bounds });
    const queryError = getLoadError({ boundsArray, polygonType: id });
    //TODO: get polygon list for bounds
    try {
      const polygons = !queryError ? await polygonModelGen({ config, db }).getPolygonByQueryType({ queryType: id }) : []
      callback(queryError, polygons);
    } catch (error) {
      console.error(error);
    }
  },

  read: ({ polygons }, res) => {
    res.json({ polygons })
  }
});