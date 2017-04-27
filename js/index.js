// Got this code from http://stackoverflow.com/questions/32899466/using-knockout-js-and-google-maps-api
google.maps.event.addDomListener(window, 'load', function () {
	const googleMap = createMap();

	// Init data after it complete
	$.getJSON("js/models/data.json").done((data) => {
		const locations = initLocationsWithMarkers(googleMap, parseData(data.response.groups[0].items));
		
		// Fire the view model after the data complete loading
		ko.applyBindings(new MapListViewModel(googleMap, locations));

	}).fail(() => {
		// Show the error to the user
		alertErrot();
	});
	
})
