/* These are the loations of some of the most famous and important temples in Tamilnadu, India..........
   these temples were taken based on the availability of WIKIPEDIA resource......
   3rd party API used is WIKIPEDIA (it,s easy to access details, hard to find the right combinations of the title of known temples...)*/
var templesData = [ // Contains the name of the temple and their locations as latitude and longitude
    {
        title: 'Annamalaiyar Temple',
        location: {
            lat: 12.231646,
            lng: 79.06774
        }
    },
    {
        title: 'Brihadeeswara Temple',
        location: {
            lat: 10.782783,
            lng: 79.131846
        }
    },
    {
        title: 'Kanchi Kailasanathar Temple',
        location: {
            lat: 13.033634,
            lng: 80.270199
        }
    },
    {
        title: 'Meenakshi Amman Temple',
        location: {
            lat: 9.919505,
            lng: 78.119342
        }
    },
    {
        title: 'Nellaiappar Temple',
        location: {
            lat: 8.728368,
            lng: 77.688594
        }
    },
    {
        title: 'Ramanathaswamy Temple',
        location: {
            lat: 9.288114,
            lng: 79.317392
        }
    },
    {
        title: 'Amritaghateswarar-Abirami Temple,Thirukkadaiyur',
        location: {
            lat: 11.074841,
            lng: 79.806736
        }
    },
    {
        title: 'Sri Ranganathaswamy Temple, Srirangam',
        location: {
            lat: 10.862043,
            lng: 78.690218
        }
    },
    {
        title: 'Thillai Nataraja Temple, Chidambaram',
        location: {
            lat: 11.399296,
            lng: 79.693548
        }
    },
    {
        title: 'Thyagaraja Temple, Tiruvarur',
        location: {
            lat: 10.77608,
            lng: 79.633034
        }
    }
];

var map, markers = [],
    templeInfowindow; //globally declaring the main variables......


function initMap() {
    // Created a styles array to use with the map. Thanks to Google developers documentations (https://developers.google.com/maps/documentation/javascript/examples/style-array)
    // got this night mode map from google developers samples and edited a bit..................
    var styles = [{
        elementType: 'geometry',
        stylers: [{
            color: '#242f3e'
        }]
    }, {
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#F7F4F3'
        }]
    }, {
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#D24A06'
        }]
    }, {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#CB7C0A'
        }]
    }, {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#FB05BC'
        }]
    }, {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
            color: '#CD5F4D'
        }]
    }, {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#FB05BC'
        }]
    }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
            color: '#B398BD'
        }]
    }, {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#ACC929'
        }]
    }, {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#FB05BC'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
            color: '#ACC929'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#B398BD'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#6D0808'
        }]
    }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
            color: '#919354'
        }]
    }, {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#6D0808'
        }]
    }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
            color: '#9EC2CD'
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#FB05BC'
        }]
    }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#F7F4F3'
        }]
    }];

    // Constructor creates a new map - only center (latitude and longitude) and zoom (upto level 21 as said in tutorials) are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 9.952168,
            lng: 78.125244
        }, // this center lat-lng not the exact center, but the location of my home "hah...hah..haaaa!!! if zoomed to leve 21.... that's my home"
        zoom: 6,
        styles: styles
    });

    templeInfowindow = new google.maps.InfoWindow();

    // marker color changing from default to highlighted icon.....
    var defaultIcon = makeMarkerIcon('03FB96');
    var highlightedIcon = makeMarkerIcon('FBBF03');

    // Setting each marker to each temple data and animating them.....
    for (var i = 0; i < templesData.length; i++) {
        var position = templesData[i].location,
            title = templesData[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP
        });
        templesData[i].markers = marker;      //making marker as a property of each location(templesData).
        marker.addListener('click', function() {
            populateInfoWindow(this, templeInfowindow);
        });

        // Marker changes its icon color when the mouse is clicked over it.....
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    }
}


// Infowindow details that open when a marker is clicked.....
// contains name of the temple, its streetview if available and a link to WIKIPEDIA page (3rd party).....
function populateInfoWindow(marker, templeInfowindow) {
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
    $.ajax(wikiUrl, {
        dataType: "jsonp"
    }).done(function(response) { // (CHAINING).Used .done function insted of success function as suggested in the tutorials...
        var wikiVar = response[0];
        var url = 'http://en.wikipedia.org/wiki/' + wikiVar;
        if (templeInfowindow.marker != marker) {
            templeInfowindow.marker = marker;
            marker.addListener('click', toggleBounce(marker));
            templeInfowindow.setContent('<div>' + marker.title + '<br> <a href="' + url + '">Click here! Know the HOLY HISTORY!</a></div>');
            templeInfowindow.addListener('closeclick', function() {});

            // Setting Streetview in the marker infowindow for each temple loation if available....
            var streetViewService = new google.maps.StreetViewService();
            var radius = 100;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                    templeInfowindow.setContent('<div>' + marker.title + '<br> <a href="' + url + '">Click here! Know the HOLY HISTORY!</a></div><div id="pano"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading, // east to west view
                            pitch: 45 // up-down view
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                        document.getElementById('pano'), panoramaOptions);
                } else {
                    templeInfowindow.setContent('<div>' + marker.title + '<br> <a href="' + url + '">Click here! Know the HOLY HISTORY!</a></div><div>Sorry FRIEND...... No Street View Found!</div>');
                }
            }
            // Use streetview service to get the closest streetview image within
            // 100 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            templeInfowindow.open(map, marker);

        }
    }).fail(function(jqXHR, textStatus) { //(CHANING). Used . fail() instead of .error() as suggested in the video....
        alert("Some Problem caused Request to Fail...... Check it!"); // error handeling funtion if the 3rd party fails or any other problem....
    });
}


//the function called to makes color change of marker when clicked
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}


// this Animation makes the marker to bounce when clicked- and then infowindow opens...
function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 1000); // set timeout for the boune to occur for 1sec since it looked odd without a time limit and passed error
  }
}

// error handeling for the googelmap as suggested in the references......
var googleError = function() {
    alert('Sorry....... Something went wrong.......Try Reconnecting some time later.....');
}; //error handeling if error occurs with the googel map api link or network problems, etc....


//usefulness of using organisational library......... KNOCKOUT.JS
// Makes all markers to be present on the map....
var TempleViewModel = function() {
  var self = this;
  self.templesData = ko.observable(templesData);
  self.clickOver = function(templesData) { //click func() for the marker
    map.setCenter(templesData.location); // center set to the lat-lng of the clicked temple....
    map.setZoom(20); // when a temple's marker is clicked it is zoomed to 20 levels with infowindow open...
    //as in google developers documentation- zoom level 20 - building visible level zoom....
    populateInfoWindow(templesData.markers, templeInfowindow);
  };

  self.filterInput = ko.observable('');
  // enabling the filter box and to filterout the list based on the search name typed and makes the respetive marker/markers visible on typing....
  self.filterTemple = ko.computed(function() {
    var filter = self.filterInput().toLowerCase();
    return ko.utils.arrayFilter(self.templesData(), function(templeItem) {
      var templeCase = templeItem.title.toLowerCase();
      if (templeCase.indexOf(filter) >= 0)   {
        reutrn templeItem.markers.setVisible(true);
      }else {
        reutrn templeItem.markers.setVisible(false);
      }
    });
  });
};

//exeuting the viewmodel and the data-bindings to the html attributes....
ko.applyBindings(new TempleViewModel());
