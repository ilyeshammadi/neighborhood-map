// Got this code from http://stackoverflow.com/questions/32899466/using-knockout-js-and-google-maps-api
google.maps.event.addDomListener(window, 'load', function () {
	const googleMap = createMap();
	ko.applyBindings(new MapListViewModel(googleMap));
})
