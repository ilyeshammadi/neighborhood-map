// Dummy Data
const locations = [
	new Location("Amsterdam"),
	new Location("Copenhagen"),
	new Location("New York")
]

// Location model
function Location(name) {
	var self = this;
	self.name = name;
}

// Main ViewModel
function MapListViewModel() {
	var self = this;

	// Init all the locations
	self.locations = ko.observableArray(locations)

	// Search value
	self.search = ko.observable('');

	// Filter location
	self.filterLocations = ko.computed(function () {
		let locations = self.locations();

        // If there are a search term
		if (self.search() !== '') {
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

		return locations;
	});

}

ko.applyBindings(new MapListViewModel());
