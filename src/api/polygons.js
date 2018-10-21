import resource from "resource-router-middleware";
import { getBoundsArrayFromQuery, getLoadError } from "../lib/polygons-api";
import polygonModel from "../models/polygons";

export default ({ config, db }) =>
  resource({
    id: "polygons",

    load: async (
      { query: { bounds = "", limit = "50" } },
      polygonQueryType,
      callback
    ) => {
      const boundsArray = getBoundsArrayFromQuery({ queryBounds: bounds });
      const queryError = getLoadError({
        boundsArray,
        polygonType: polygonQueryType
      });

      try {
        const polygons = !queryError
          ? await polygonModel({ config, db }).getPolygonsByBounds({
              bounds: boundsArray,
              queryType: polygonQueryType,
              limit: parseInt(limit)
            })
          : [];
        const geoJson = {
          type: "FeatureCollection",
          features: polygons
        };
        callback(queryError, geoJson);
      } catch (error) {
        console.error(error);
      }
    },

    read: ({ polygons }, res) => {
      res.json(polygons);
    }
  });
