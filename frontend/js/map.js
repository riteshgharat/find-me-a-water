const popUp = document.querySelector('.pop-up');
let map, marker;

// initialization of Map
function initMap() {
  map = new mappls.Map('map', {
    zoom: 3.2
  });
  /*Added Marker on click*/
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
      popupHtml: `<h3>lat: ${lngLat.lat}<br>lng:${lngLat.lng}</h3>`,
      iconUrl: 'https://apis.mapmyindia.com/map_v3/1.png'
    });
    getLoc(lngLat.lat, lngLat.lng);

    popUp.style.display = 'flex';
    document.querySelector('#close-btn').addEventListener('click', () => popUp.style.display = 'none');
  });
  map.addListener('load', () => {
    document.querySelector('.preloader').style.display = 'none';
    fetch(`${location.origin}/api/getData`)
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          addMarker({
            lat: data[i].lat,
            lng: data[i].lng,
            popupHtml: `
          <h1>${data[i].mode}</h1>
          <b>Type: </b>${data[i].type}<br>
          <b>Lat: </b>${data[i].lat}<br>
          <b>Lng: </b>${data[i].lng}<br>
          <b>Qty: </b>${data[i].qty} Litres<br>
          <b>Info: </b>${data[i].info}
          `,
            iconUrl: `assets/images/${data[i].iconUrl}`
          });
        }
      });
    console.clear();
  });
}

// add marker function
function addMarker(markerData) {
  let data = markerData;
  let Markers = new mappls.Marker({
    map: map,
    position: {
      "lat": data.lat,
      "lng": data.lng
    },
    width: 40,
    height: 40,
    fitbounds: true,
    popupHtml: data.popupHtml,
    icon_url: data.iconUrl
  });
}

const latitude = document.querySelector('#latitude');
const longitude = document.querySelector('#longitude');
const mode = document.querySelector('#mode');
const quantity = document.querySelector('#quantity');
const info = document.querySelector('#additional-info');

function getLoc(lat, lng) {
  latitude.value = lat;
  longitude.value = lng;
}

const saveDataBtn = document.querySelector('#save-data-btn');

const typeBtns = document.querySelectorAll('.pop-up .types-con img');

typeBtns.forEach(typeBtn => {
  typeBtn.addEventListener('click', () => {
    typeBtns.forEach(typeBtn => {
      typeBtn.style.outline = 'none';
      typeBtn.dataset.click = 'false';
    })
    typeBtn.style.outline = '5px solid var(--blue2)';
    typeBtn.dataset.click = 'true';
    console.log(typeBtn.id, typeBtn.dataset.click);
  });
});

// Save Data function to databse
saveDataBtn.addEventListener('click', () => {
  let type = 'tap';
  typeBtns.forEach(typeBtn => {
    if (typeBtn.dataset.click === 'true') {
      type = typeBtn.id;
    };
  });

  let color = mode.value === 'Availability of Water' ? 'blue' : 'red';
  let iconUrl = `${type}-${color}.png`;

  const data = {
    mode: mode.value,
    type: type,
    lat: latitude.value,
    lng: longitude.value,
    qty: quantity.value,
    info: info.value,
    iconUrl: iconUrl
  }
  fetch(`${location.origin}/api/storeData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      console.log(res);

      // adding marker
      addMarker({
        lat: data.lat,
        lng: data.lng,
        popupHtml: `
         <h1>${data.mode}</h1>
         <b>Type: </b>${data.type}<br>
         <b>Lat: </b>${data.lat}<br>
         <b>Lng: </b>${data.lng}<br>
         <b>Qty: </b>${data.qty} Litres<br>
         <b>Info: </b>${data.info}`,
        iconUrl: `assets/images/${data.iconUrl}`
      });

      popUp.style.display = 'none';
    })
    .catch(error => {
      alert("There was an error:", error);
    });
});