let map;
let geocoder;

$(document).ready(initializeMap); //end document ready

function initializeMap() {
    const myLatLng = { lat: 42.0579902, lng: -87.682719 };
    const mapOptions = {
        zoom: 15,
        center: myLatLng
    };
    map = new google.maps.Map($("#mapcanvas")[0], mapOptions);

    geocoder = new google.maps.Geocoder();

    //*********************************************************************
    // Add the layer showing the inventory
    //*********************************************************************
}

function markAddress(geocoder, map, address) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
        console.log("added marker")
    });
}