// Location model
function Location(id, name, text, lat, lng, picture_url, address, canonicalUrl) {
	var self = this;
	self.id = id;
	self.name = name;
	self.lat = lat;
	self.lng = lng;
	self.picture_url = picture_url;
	self.address = address;
	self.canonicalUrl = canonicalUrl;
	self.text = text;
}

// Global objects
const locations = [];

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
	const marker = new google.maps.Marker({
		position: {
			lat: location.lat,
			lng: location.lng
		},
		map: map,
		title: location.name,
		animation: google.maps.Animation.DROP,
	});


	marker.infowindow = new google.maps.InfoWindow();
	marker.infowindow.setContent('<div class="loader"></div>')

	marker.addListener('click', function () {

		getPlaceDetail(location.id).then((content) => {
			// Set the info window content
			marker.infowindow.setContent(content);
		});

		// Close all the info windows before opening a new one
		closeAllInfoWindows(locations);
		marker.infowindow.open(map, marker)

		// Run animation
		marker.setAnimation(google.maps.Animation.BOUNCE);
	});

	// Stop animation when closing the info window
	marker.infowindow.addListener('closeclick', function () {
		marker.setAnimation(null);
	});

	return marker;
}

// Sets the map on all markers in the array.
function setMapOnAll(map, locations) {
	_.forEach(locations, function (loc) {
		loc.marker.setMap(map);
	})
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers(locations) {
	// Clear previous info windows
	closeAllInfoWindows(locations);

	setMapOnAll(null, locations);
}

// Shows any markers currently in the array.
function showMarkers(map, locations) {
	setMapOnAll(map, locations);
}

function closeAllInfoWindows(locations) {
	_.forEach(locations, function (location) {
		// Close info window
		location.marker.infowindow.close();
		// Stop marker animation
		location.marker.setAnimation(null);
	})
}


// Function to parse the Foursquare data
function parseData(items) {
	let venue;
	let lat, lng;
	let picture_url, address;

	_.forEach(items, function (item) {
		venue = item.venue;

		lat = parseFloat(venue.location.lat);
		lng = parseFloat(venue.location.lng);
		picture_url = parseImage(venue);
		address = formatAddress(venue);
		locations.push(new Location(venue.id, venue.name, item.tips[0].text, lat, lng, picture_url, address, item.tips[0].canonicalUrl));
	});
	return locations;
}


function parseImage(venue) {
	return venue.photos.groups[0].items[0].prefix + '100x100' + venue.photos.groups[0].items[0].suffix;
}

function formatAddress(venue) {
	return venue.location.formattedAddress[0] + ',' + venue.location.formattedAddress[1];
}

async function getPlaceDetail(venue_id) {
	let contentString;

	try {
		const data = await $.getJSON("https://api.foursquare.com/v2/venues/" + venue_id, {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			v: 20170426
		})

		const venue = data.response.venue;

		// Check if venue has description
		if (!venue.description) {
			venue.description = '';
		}

		contentString = '<div class="marker-detail">' +
			'<a href="' + venue.canonicalUrl + '" target="_blank"><h3>' + venue.name + '</h3></a>' +
			'<p>' + venue.description + '</p>' +
			'<span>Data from Foursquare API</span>' +
			'</div>';

	} catch (err) {
		alertError();
		contentString = "Can't load data from server";
	}

	return contentString;
}
