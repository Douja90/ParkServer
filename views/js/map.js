

mapboxgl.accessToken = 'pk.eyJ1IjoiZG91amE5MCIsImEiOiJja2x1c3hjdGkxbTN1Mm9sbHRqMmh4MW9rIn0.7pa8j6iRUKnMm_Ol1b340w';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom:'10',
center: [7.09295229,43.5953089]
});

//Fetch parkings from API
async function getParkings(){
    const res = await fetch('/api/parkings');
    const data = await res.json();

    const parkings = data.data.map(parking => {
        return{
            type: 'Feature',
            geometery: {
                type: 'Point',
                coordinates: [parking.location.coordinates(0), store.location.coordinates(1)]
            },
            properties: {
                parkingId: parking.parkingId,
                icon: 'parking'
                
        }
    }
    });
    loadMap(parkings);
}
function loadMap(){
    map.on('load', function (parkings) {
        map.addLayer({
        id: 'points',
        type: 'symbol',
        source: {
            type:'geojson',
            data: {
                type: 'FeatureCollection',
                features: Parkings,
                
            }
        },
        layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{parkingId}',
        'text-font': ['Open sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0,0,9],
        'text-anchor': 'top'
        }
        });
    });
}
        
        getParkings();