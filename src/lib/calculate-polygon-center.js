import { Client } from "pg";
const client = new Client();
client.connect();

// client.query(`CREATE TABLE Polygons (
// 	type Text,
// 	properties_name Text,
// 	properties_type Text,
// 	properties_pop2001 Numeric,
// 	properties_dwell2001 Numeric,
// 	properties_areaSqkm Numeric,
// 	properties_popSqkm Numeric,
// 	properties_province Text,
// 	properties_centerLat Numeric,
// 	properties_centerLng Numeric,
// 	properties_lowLat Numeric,
// 	properties_lowLng Numeric,
// 	properties_highLat Numeric,
// 	properties_highLng Numeric,
// 	properties_radius Numeric,
// 	geometry JSON
// );`);

client.query("SELECT * FROM myTable", (err, res) => {
  const formattedPolygons = res.rows.map(row => {
    const {
      centerLat,
      centerLng,
      lowLat,
      lowLng,
      highLat,
      highLng,
      radius
    } = getPolygonLimits({
      coordinates: JSON.parse(row.geometrycoordinates),
      geometryType: row.geometrytype
    });

    return {
      type: row.type,
      properties: {
        name: row.propertiesname,
        type: row.propertiestype,
        pop2001: row.propertiespop2001,
        dwell2001: row.propertiesdwell2001,
        areaSqkm: row.propertiesarea_sqkm,
        popSqkm: row.propertiespop_sqkm,
        province: row.propertiesprov,
        centerLat,
        centerLng,
        lowLat,
        lowLng,
        highLat,
        highLng,
        radius
      },
      geometry: {
        type: row.geometrytype,
        coordinates: JSON.parse(row.geometrycoordinates)
      }
    };
  });
  const insertPromises = formattedPolygons.map(geojson => {
    return saveGeoJsonToDatabase({ geojson });
  });

  Promise.all(insertPromises)
    .then(() => {
      console.log(
        `Inserted ${formattedPolygons.length} rows into polygons table`
      );
      client.end().catch(error => {
        console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
    });
});

const getPolygonLimits = ({ coordinates = [], geometryType = "Polygon" }) => {
  let highLat;
  let lowLat;
  let highLng;
  let lowLng;

  if (geometryType === "Polygon") {
    coordinates.forEach(feature => {
      feature.forEach(([lat, lng]) => {
        highLat = highLat && lat < highLat ? highLat : lat;
        lowLat = lowLat && lat > lowLat ? lowLat : lat;
        highLng = highLng && lng < highLng ? highLng : lng;
        lowLng = lowLng && lng > lowLng ? lowLng : lng;
      });
    });
  } else {
    coordinates.forEach(polygon => {
      polygon.forEach(feature => {
        feature.forEach(([lat, lng]) => {
          highLat = highLat && lat < highLat ? highLat : lat;
          lowLat = lowLat && lat > lowLat ? lowLat : lat;
          highLng = highLng && lng < highLng ? highLng : lng;
          lowLng = lowLng && lng > lowLng ? lowLng : lng;
        });
      });
    });
  }
  const latDelta = highLat - lowLat;
  const lngDelta = highLng - lowLng;

  const centerLat = latDelta / 2 + lowLat;
  const centerLng = lngDelta / 2 + lowLng;

  const radius = latDelta > lngDelta ? latDelta / 2 : lngDelta / 2;
  return {
    centerLat,
    centerLng,
    lowLat,
    lowLng,
    highLat,
    highLng,
    radius
  };
};

const saveGeoJsonToDatabase = ({ geojson }) => {
  const query = `INSERT INTO polygons(
		type,
		properties_name,
		properties_type,
		properties_pop2001,
		properties_dwell2001,
		properties_areaSqkm,
		properties_popSqkm,
		properties_province,
		properties_centerLat,
		properties_centerLng,
		properties_lowLat,
		properties_lowLng,
		properties_highLat,
		properties_highLng,
		properties_radius,
		geometry) 
		VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`;

  const values = [
    geojson.type,
    geojson.properties.name,
    geojson.properties.type,
    parseFloat(geojson.properties.pop2001),
    parseFloat(geojson.properties.dwell2001),
    parseFloat(geojson.properties.areaSqkm),
    parseFloat(geojson.properties.popSqkm),
    geojson.properties.province,
    parseFloat(geojson.properties.centerLat),
    parseFloat(geojson.properties.centerLng),
    parseFloat(geojson.properties.lowLat),
    parseFloat(geojson.properties.lowLng),
    parseFloat(geojson.properties.highLat),
    parseFloat(geojson.properties.highLng),
    parseFloat(geojson.properties.radius),
    geojson.geometry
  ];
  return client.query(query, values);
};
