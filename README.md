# Neighborhood Map
Front-end Web Developer Nanodegree project
<br>
![](https://github.com/Ilyes-Hammadi/neighborhood-map/blob/master/docs/demo.gif)

## Run the project
### Get the code localy
```shell
$ git clone https://github.com/Ilyes-Hammadi/neighborhood-map.git
$ cd neighborhood-map
```

### Setup keys
Get your foursquare api key [here](https://developer.foursquare.com/), After you get your API keys, put them in the `js/constants.js` file.
```javascript
const CLIENT_ID = "client_id"
const CLIENT_SECRET = "client_secret"
```

Set your Google Maps API key in the `index.html` file, you can get an API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
```html
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR-KEY>"></script>
```

### Run the devlopement server
The server will run on `localhost:8000`
```python
$ python -m SimpleHTTPServer
```