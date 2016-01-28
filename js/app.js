
//Model array with initial locations
var initialLocations = [
	{
		title: "Funky Buddha",
		lat: 26.1746495,
		lng: -80.1308203,
		address: "1201 NE 38th St, Oakland Park, FL 33334"

	},
	{
		title: "Museum of Discovery and Science",
		lat: 26.1208918,
		lng: -80.1479404,
		address: "401 SW 2nd St, Fort Lauderdale, FL 33312"
		
	},
	{
		title: "New York Grilled Cheese",
		lat: 26.1564468,
		lng: -80.1385884,
		address: "2207 Wilton Dr, Wilton Manors, FL 33305"
		
	},
	{
		title: "Broward Center for Performing Arts",
		lat: 26.1195189,
		lng: -80.1490456,
		address: "201 SW 5th Ave, Fort Lauderdale, FL 33312"
		
	},
	{
		title: "Historic Stranahan House Museum",
		lat: 26.1185494,
		lng: -80.1373629,
		address: "335 SE 6th Ave, Fort Lauderdale, FL 33301"
		
	}
];


var map;
var marker;
var latLng;
var markers = [];

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

  	//link markers to locations 
	loc.marker = marker;

	//push markers into array for later access
	markers.push(marker);

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
	  	}, 2000);
	}
};

//Object for creating new locations
var Location = function(data){
	this.title = ko.observable(data.title);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.address = ko.observable(data.address);
	

	
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
		//toggleBounce(clickedLocation.marker);
		console.log("hi");
	};

	

	//Got help from Udacity Coach John for the search bar
	//stores initial locations for search
	this.places = ko.observableArray(initialLocations);

	//sets up input string to be observed
	this.query = ko.observable("");

	//searches through locations and displays searched marker
	this.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.places(), function(place) {
			if (place.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
				place.marker.setVisible(true);
				return true;
			} else {
				place.marker.setVisible(false);
				return false;
			}
		});
	});

}


//bounce marker with list item clicked
// info window
//api in info window
//error handling
//mobile version
