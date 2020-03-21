var map;
var service;
var infoWindow;
var placesNames = [];
var geocoder;


function initMap(){
    var pos = new google.maps.LatLng(33.0081127,-96.73477889947152);
    infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
 //   geocoder = new google.maps.Geocoder;
  
    var request = {
        location: map.getCenter(),
        radius: '15000',
        name: 'orphanage'
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    /*Geolocation Service when domain is secure*/ 
     // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        map.setCenter(pos);
        var request = {
            location: map.getCenter(),
            radius: '15000',
            name: 'orphanage'
        };
    
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
    } else {
    // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
 
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
      placesNames.push(results[i].name);
    }
  }
}

function createMarker(place) {
    var hyper = "Click to Help";
    var result = hyper.link("https://www.amazon.com/hz/wishlist/ls/3T7C1A6CTJW3S?ref_=wl_share&fbclid=IwAR0AsY53yqbHycEG4ZXPd1WtXmX88I5lIPY5dkTCVd0-i775ByCZxCqNPzU");
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name + "<br> Address:" +  "<Br> Amazon WishList: " + result);
    infoWindow.open(map, this);
  });
}

function geoCodefromLat(place){
    var latLong = place.location;
    geocoder.geocode({'location': latLong}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            return results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
}

