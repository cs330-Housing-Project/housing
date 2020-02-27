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

    // Add dummy data here: just copy paste this an put in your own info
    (new Listing(
        title = "A cool house",
        email = "mortyschapiro@northwestern.edu",
        address = "1922 Sheridan Rd. Evanston, Il",
        zip = "60201", phone = "123-456-7890",
        housing_type = "House", notes = "Super dope place", price=1300)).add_listing_to_local_storage();

    (new Listing(
        title = "A cool house",
        email = "blob@northwestern.edu",
        address = "2420 Campus Dr. Evanston, Il",
        zip = "60201", phone = "123-456-7890",
        housing_type = "Apartment", notes = "Nice", price=1200)).add_listing_to_local_storage();

    (new Listing(
        title = "Itay's House",
        email = "stuff@northwestern.edu",
        address = "2110 Maple Ave. Evanston, Il",
        zip = "60201", phone = "123-456-7890",
        housing_type = "House", notes = "8 person house", price=700)).add_listing_to_local_storage();
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
