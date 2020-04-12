var map;
var service;
var infoWindow;
var placesNames = [];
var geocoder;
var placesFromDB = {};

function initMap(){
    var pos = new google.maps.LatLng(33.0081127,-96.73477889947152);
    infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
    //geocoder = new google.maps.Geocoder;
    //We will perform ajax call in here for testing
    $.ajax({
      url:"php/searchLists.php",
      type:"GET",
      dataType:"json",
      success: function(data){
        putListsInDict(data);
      },
      error: function(e){
        console.log(e);
      }
    });
    //More code
}

function putListsInDict(data){
  console.log(data);
  for(var i=0;i<data.length;i++){
    placesFromDB.put(data[i]['name'],data[i]);
    console.log(placesFromDB[data[i]['name']]);
    console.log('Inside Loop');
  }
  
}

function performSearchwithLocation(){
  console.log(placesFromDB);
  /*Geolocation Service when domain is secure*/ 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
      map.setCenter(pos);
      var rad = document.getElementById('distRange').value; 
      var request = {
          location: map.getCenter(),
          radius: rad*1600,
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
      createMarker(place);
      placesNames.push(place.name);
    }
  }
}

function createMarker(place) {
  var hyper = "Click to Help";
  var result = ""
  if(place.name in placesFromDB){
    result = hyper.link(placesFromDB[places.name]['list']);
  }
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name + "<br> Address: " +place.formatted_address+  "<Br> Amazon WishList: " + result);
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


$('.btn').click(function(event){
  
  //event.preventDefault()
  
  var email = $('.email').val()
  var message = $('.message').val()
  var name = $('.name').val()
  var phone = $('.phone').val()

})
