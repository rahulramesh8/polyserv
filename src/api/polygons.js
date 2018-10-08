import resource from "resource-router-middleware";
import { getBoundsArrayFromQuery, getLoadError } from "../lib/polygons-api";
import polygonModel from "../models/polygons";

export default ({ config, db }) =>
  resource({
    id: "polygons",

    load: async ({ query: { bounds = "" } }, polygonQueryType, callback) => {
      const boundsArray = getBoundsArrayFromQuery({ queryBounds: bounds });
      const queryError = getLoadError({
        boundsArray,
        polygonType: polygonQueryType
      });

      try {
        const polygons = !queryError
          ? await polygonModel({ config, db }).getPolygonsByBounds({
              bounds: boundsArray,
              queryType: polygonQueryType
            })
          : [];
        callback(queryError, polygons);
      } catch (error) {
        console.error(error);
      }
    },

    read: ({ polygons }, res) => {
      res.json(polygons);
    }
  });
