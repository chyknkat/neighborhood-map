var Location = function(data){
	this.locationName = ko.observable(data.locationName);
}

var initialLocations = [
	{
		locationName: "Funky Buddha"
	},
	{
		locationName: "Museum of Discovery and Science"
	},
	{
		locationName: "The Grilled Cheese"
	},
	{
		locationName: "Broward Center for Performing Arts"
	},
	{
		locationName: "Las Olas"
	}
]
var ViewModel = function (){
	var self = this;

	this.locationList = ko.observableArray([]);
	
	initialLocations.forEach(function(locationItem){
		self.locationList.push (new Location(locationItem));
	});

	this.currentLocation = ko.observable(this.locationList()[0]);

	this.setLocation = function (){
		console.log("hi");
	};
}

ko.applyBindings(new ViewModel());

//Initialize Google Map 

	var map;
	function initMap() {
	  map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 26.138761, lng: -80.159683},
	    zoom: 13
	  });
	}

// Map markers
// Search bar
// 

//model

//var selectedLocation = ko.observable("Funky Buddha");