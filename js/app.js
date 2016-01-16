

var initialLocations = [
	{
		locationName: "Funky Buddha",
		lat: 26.1746495,
		lng: -80.1308203
	},
	{
		locationName: "Museum of Discovery and Science",
		lat: 26.1208918,
		lng: -80.1479404
	},
	{
		locationName: "New York Grilled Cheese",
		lat: 26.1564468,
		lng: -80.1385884
	},
	{
		locationName: "Broward Center for Performing Arts",
		lat: 26.1195189,
		lng: -80.1490456
	},
	{
		locationName: "Historic Stranahan House Museum",
		lat: 26.1185494,
		lng: -80.1373629
	}
];

var loc;
var map;
var marker;
var latLng;
//Initialize Google Map 

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 26.138761, lng: -80.159683}
  });
  for(var i = 0; i < initialLocations.length; i++){
  	loc = initialLocations[i];
  	latLng = new google.maps.LatLng(loc.lat, loc.lng);
  	marker = new google.maps.Marker({
  		animation: google.maps.Animation.DROP,
  		position: latLng
  	});
  	marker.setMap(map);
	marker.addListener('click', toggleBounce);
  }
}


function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

var Location = function(data){
	this.locationName = ko.observable(data.locationName);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	
}


var ViewModel = function (){
	var self = this;

	this.locationList = ko.observableArray([]);
	
	initialLocations.forEach(function(locationItem){
		self.locationList.push (new Location(locationItem));
	});
	

	this.currentLocation = ko.observable(this.locationList()[0]);

	this.setLocation = function (clickedLocation){
		self.currentLocation(clickedLocation);
	};
}

ko.applyBindings(new ViewModel());




// Map markers
// Search bar
// 

//model

//var selectedLocation = ko.observable("Funky Buddha");