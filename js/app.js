//Google Maps API key AIzaSyATO4CZr7qxhv4xpQnLF3AEi16CtPkP5rc

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 26.138761, lng: -80.159683},
    zoom: 13
  });
}