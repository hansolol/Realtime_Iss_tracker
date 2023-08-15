var map;
var markers = [];

// load map
function init(){
	var myOptions = {
		zoom      : 2,
		center    : { lat:42.353350,lng:-71.091525},
		mapTypeId : google.maps.MapTypeId.SATELLITE,
	
	};
	var element = document.getElementById('map');
  	map = new google.maps.Map(element, myOptions);
  	addMarkers();
}

// Add ISS marker to map
async function addMarkers(){
	// get ISS data
	var location = await getIssLocation();

	var marker = getMarker("ISS");		
	if (marker){
		moveMarker(marker,location);
	}
	else{
		addMarker(location);			
	}

    // Center the map to the ISS location
    map.setCenter({
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
    })

	// timer
	console.log(new Date());
	setTimeout(addMarkers,5000);
}

// Request ISS data
async function getIssLocation(){
	var url = 'http://api.open-notify.org/iss-now.json';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.iss_position;
}

function addMarker(location){
	var icon = {
        url: 'space-station.png',
        scaledSize: new google.maps.Size(50,50)
        } 
        
	var marker = new google.maps.Marker({
	    position: {
	    	lat: parseFloat(location.latitude), 
	    	lng: parseFloat(location.longitude)
	    },
	    map: map,
	    icon: icon,
	    id: "ISS" // setting a constant id for ISS
	});
	markers.push(marker);
}

function moveMarker(marker,location) {
	// move icon to new lat/lon
    marker.setPosition({
    	lat: parseFloat(location.latitude), 
    	lng: parseFloat(location.longitude)
	});
}

function getMarker(id){
	var marker = markers.find(function(item){
		return item.id === id;
	});
	return marker;
}

window.onload = init;
