
//Model array with initial locations
var initialLocations = [
	{
		title: "Funky Buddha",
		lat: 26.1746495,
		lng: -80.1308203
	},
	{
		title: "Museum of Discovery and Science",
		lat: 26.1208918,
		lng: -80.1479404
	},
	{
		title: "New York Grilled Cheese",
		lat: 26.1564468,
		lng: -80.1385884
	},
	{
		title: "Broward Center for Performing Arts",
		lat: 26.1195189,
		lng: -80.1490456
	},
	{
		title: "Historic Stranahan House Museum",
		lat: 26.1185494,
		lng: -80.1373629
	}
];


var map;
var marker;
var latLng;

//Initialize Google Map 
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 26.138761, lng: -80.159683}
  });

  // Create markers for the initial locations
  for(var i = 0; i < initialLocations.length; i++){
  	var loc = initialLocations[i];
  	latLng = new google.maps.LatLng(loc.lat, loc.lng);
  	marker = new google.maps.Marker({
  		animation: google.maps.Animation.DROP,
  		position: latLng
  	});

  	//Link markers to map
  	marker.setMap(map);

  	//Listener so that when markers are clicked, they bounce
	marker.addListener('click', toggleBounce); 
  }
  //Activate Knockout and link data bindings to the ViewModel
  ko.applyBindings(new ViewModel());
}

//Bounce funtion for markers with 3 second timeout
function toggleBounce() {
	var self = this;
	if (this.getAnimation() !== null) {
	   	this.setAnimation(null);
	} else {
	  	this.setAnimation(google.maps.Animation.BOUNCE);
	  	setTimeout(function() {
	  		self.setAnimation(null)
	  	}, 3000);
	}
};

//Object for creating new locations
var Location = function(data){
	this.title = ko.observable(data.title);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	
}

//Object creating the ViewModel
var ViewModel = function (){
	var self = this;

	//creates array for the locations to be held
	this.locationList = ko.observableArray([]);

	//pushes the initial locations into the location list array as new Location objects
	initialLocations.forEach(function(locationItem){
		self.locationList.push (new Location(locationItem));
	});
	
	//sets the current location to the first location in the locationList array
	this.currentLocation = ko.observable(this.locationList()[0]);

	//sets the current location to the location clicked
	this.setLocation = function (clickedLocation){
		self.currentLocation(clickedLocation);
		console.log("hi");
	};

	//Got help from Udacity Coach John for the search bar
	//stores initial locations for search
	this.places = ko.observableArray(initialLocations);

	//sets up input string to be observed
	this.query = ko.observable("");

	//searches through locations
	this.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.places(), function(place) {
			return place.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
		});
	});

}



// Search bar
