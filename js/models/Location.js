// Dummy Data
const locations = [
	new Location("Amsterdam", -25.063, 131.044),
	new Location("Copenhagen", -25.163, 131.144),
	new Location("New York", -25.263, 131.244),
	new Location("Amsterdam", -25.363, 131.344),
	new Location("Copenhagen", -25.463, 131.444),
	new Location("New York", -25.563, 131.544),
	new Location("Amsterdam", -25.663, 131.644),
	new Location("Copenhagen", -25.763, 131.744),
	new Location("New York", -25.863, 131.844),
	new Location("Amsterdam", -25.963, 131.944),
]

// Location model
function Location(name, lat, lng) {
	var self = this;
	self.name = name;
	self.lat = lat;
	self.lng = lng;
}

// Init locations with markers
function initLocationsWithMarkers(map, locations) {
	return _.map(locations, function (loc) {
		// create a new marker
		loc.marker = addMarker(map, loc);
		return loc;
	})
}

// Add marker
function addMarker(map, location) {
	return new google.maps.Marker({
		position: {
			lat: location.lat,
			lng: location.lng
		},
		map: map,
		title: location.name
	});
}

// Sets the map on all markers in the array.
function setMapOnAll(map, locations) {
	_.forEach(locations, function(loc) {
		loc.marker.setMap(map);
	})
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers(locations) {
	setMapOnAll(null, locations);
}

// Shows any markers currently in the array.
function showMarkers(map, locations) {
	setMapOnAll(map, locations);
}
