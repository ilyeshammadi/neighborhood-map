// Got this code from http://stackoverflow.com/questions/32899466/using-knockout-js-and-google-maps-api
// Init the google maps API
function createMap() {
    return new google.maps.Map(document.getElementById('map'), {
        center: {lat: -25.363, lng: 131.044},
        zoom: 4
    });
}