const popUp = document.querySelector('.pop-up');
let map, marker;

function initMap1() {
  map = new mappls.Map('map', {
    zoom: 3.2
  });

  map.addListener('dblclick', function(e) {
    console.clear();
    let lngLat = e.lngLat;
    mappls.remove({ map: map, layer: marker });
    marker = new mappls.Marker({
      map: map,
      position: {
        "lat": lngLat.lat,
        "lng": lngLat.lng
      },
      fitbounds: true,
      icon_url: 'https://apis.mapmyindia.com/map_v3/1.png',
    });
    getLoc(lngLat.lat, lngLat.lng);
    popUp.style.display = 'flex';
    document.querySelector('#close-btn').addEventListener('click', () => popUp.style.display = 'none');
  });
}

const latitude = document.querySelector('#latitude');
const longitude = document.querySelector('#longitude');
const type = document.querySelector('#type');
const quantity = document.querySelector('#quantity');
const info = document.querySelector('#additional-info');

function getLoc(lat, lng) {
  latitude.value = lat;
  longitude.value = lng;
}

const saveDataBtn = document.querySelector('#save-data-btn');
saveDataBtn.addEventListener('click', () => {
const data = {
  type: type.value,
  latitude: latitude.value,
  longitude: longitude.value,
  quantity: quantity.value,
  info: info.value
}
console.log(data);
});