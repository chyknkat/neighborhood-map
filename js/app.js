
//Model array with initial locations
var initialLocations = [
	{
		title: "Fort Lauderdale Swap Shop",
		lat: 26.137943, 
		lng: -80.189965,
		address: "3291 W Sunrise Blvd, Fort Lauderdale, FL 33311"

	},
	{
		title: "Museum of Discovery and Science",
		lat: 26.1208918,
		lng: -80.1479404,
		address: "401 SW 2nd St, Fort Lauderdale, FL 33312"
		
	},
	{
		title: "Stonewall National Museum & Archives",
		lat: 26.136952,
		lng: -80.130058,
		address: "1300 E Sunrise Blvd, Fort Lauderdale, FL 33304"
		
	},
	{
		title: "Broward Center for the Performing Arts",
		lat: 26.1195189,
		lng: -80.1490456,
		address: "201 SW 5th Ave, Fort Lauderdale, FL 33312"
		
	},
	{
		title: "Stranahan House",
		lat: 26.1185494,
		lng: -80.1373629,
		address: "335 SE 6th Ave, Fort Lauderdale, FL 33301"
		
	}
];

//Globals
var map;
var marker;
var markers = [];
var latLng;
var infowindow;
var infowindows = [];
var infoWindowHTML;


//Initialize Google Map 
function initMap() {
	try {
	  map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 13,
	    center: {lat: 26.121745, lng: -80.156641}
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

		//create info windows
		infowindow = new google.maps.InfoWindow();

		//link info windows to locations
		loc.infowindow = infowindow;

		//push info windows into an array for later access
		infowindows.push(infowindow);

		//listener so when markers are clicked, Wikipedia loads
		marker.addListener('click', function() {
			loadWikipedia(this);
		    
		});

  	  }
  	//error handler for map
	} catch (error) {
		alert("An error occured loading the map.");
	};
  //Activate Knockout and link data bindings to the ViewModel
  ko.applyBindings(new ViewModel());
}

//loads Wikipedia when a marker is clicked
function loadWikipedia(clickedMarker) {
	//gets lat and long of the clicked marker
	latLng = clickedMarker.getPosition();
	var lat = latLng.lat().toFixed(7);
	var lng = latLng.lng().toFixed(7); 

	//loop to compare lat and long of clicked marker to their locations
	for (var i = 0; i < initialLocations.length; i++) {
		if (initialLocations[i].lat == lat && initialLocations[i].lng == lng) {
			//sends request to Wikipedia
			var title = initialLocations[i].title;
			var address = initialLocations[i].address;
			var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + title + "&format=json&callback=wikiCallback"
			
			$.ajax({
				url: url,
				type: "POST",
				dataType: "jsonp", 
			
				//displays Wikipedia info in infowindow
				success: function(response){
			        var articleDescription = response[2][0];
			        infoWindowHTML = "<h3>"+ title +"</h3>" + "<h4>"+ address +"</h4>" + "<h5>" + articleDescription + "</h5>" + "<a href='https://en.wikipedia.org/wiki/" + title +"'>Link to Wikipedia Page</a>";
			        createInfoWindow(clickedMarker);
			    },
			    //error handler for Wikipedia
			    error: function(error) {
			    	console.log("You suck" + error);
			    	infoWindowHTML = "Unable to connect to Wikipedia";
			    	createInfoWindow(clickedMarker);
			    }
			});
		}
	}
}

//opens info window after Wikipedia loads
function createInfoWindow(clickedMarker){
	infowindow.setContent(infoWindowHTML);
	infowindow.open(map, clickedMarker);
}
//Bounce funtion for markers with 1 second timeout
function toggleBounce() {
	var self = this;
	if (this.getAnimation() !== null) {
	   	this.setAnimation(null);
	} else {
	  	this.setAnimation(google.maps.Animation.BOUNCE);
	  	setTimeout(function() {
	  		self.setAnimation(null)
	  	}, 1000);
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

	//sets the current location to the location clicked and binds markers to location click
	this.setLocation = function (clickedLocation){
		self.currentLocation(clickedLocation);
		google.maps.event.trigger(clickedLocation.marker, 'click');
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



//api in info window
//mobile version
