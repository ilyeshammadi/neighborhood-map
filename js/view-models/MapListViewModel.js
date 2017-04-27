// Main ViewModel
function MapListViewModel(map, locations) {
	var self = this;
	// Get the Google mpa
	self.map = map;

	// Init all the locations
	self.locations = ko.observableArray([]);
	self.locations(locations);

	// Search value
	self.search = ko.observable('');

	// Filter location
	self.filterLocations = ko.computed(function () {
		let locations = self.locations();

		// If there are a search term
		if (self.search() !== '') {
			// Clear all the previous markers
			clearMarkers(locations);

			// Get a lower case copy of the searched term
			const searchTerm = self.search().toLowerCase();

			// Filter all the location according to the search term
			locations = _.filter(locations, function (location) {

				// Get a lower case copy of the location name and the search term
				const locationName = location.name.toLowerCase();

				// Check if the location name include the searched term
				return _.includes(locationName, searchTerm);
			})
		}

		// Show the new filtred locations markers
		showMarkers(self.map, locations);

		return locations;
	});

	// Click on locations list item
	self.onLocationClick = function (location) {
		new google.maps.event.trigger(location.marker, 'click');
	}
}
