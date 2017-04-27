// Got this code from http://stackoverflow.com/questions/32899466/using-knockout-js-and-google-maps-api
// Init the google maps API
function createMap() {
    return new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.76000115504161, lng: -73.98469640461299},
        zoom: 15
    });
}