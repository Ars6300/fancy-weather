import mapboxgl from 'mapbox-gl';

async function setMap(lat, lon) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJzNjMwMCIsImEiOiJja2F1M2V4aXIxMDB1MnBvNTRhMGRoMzN1In0.uLGzvxuLKZOhWFZfwXtbGg';
  const map = await new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [lon, lat], // starting position [lng, lat]
    zoom: 10, // starting zoom
  });
  return map;
}

export { setMap as default };
