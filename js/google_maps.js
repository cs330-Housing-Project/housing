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
        housing_type = "House", notes = "Super dope place", price = 1300)).add_listing_to_local_storage();

    (new Listing(
        title = "A cool house",
        email = "blob@northwestern.edu",
        address = "2420 Campus Dr. Evanston, Il",
        zip = "60201", phone = "123-456-7890",
        housing_type = "Apartment", notes = "Nice", price = 1200)).add_listing_to_local_storage();

    (new Listing(
        title = "Itay's House",
        email = "stuff@northwestern.edu",
        address = "2110 Maple Ave. Evanston, Il",
        zip = "60201", phone = "123-456-7890",
        housing_type = "House", notes = "8 person house", price = 700)).add_listing_to_local_storage();

    (new Listing(
        title = "Ethan's House",
        email = "stuff@northwestern.edu",
        address = "2039 Sherman Ave. Evanston, Il",
        zip = "60201", phone = "333-333-3333",
        housing_type = "House", notes = "4 person house", price = 800)).add_listing_to_local_storage();

    (new Listing(
        title = "A nice sublet",
        email = "stuff@northwestern.edu",
        address = "2212 Noyes St. Evanston, Il",
        zip = "60201", phone = "111-111-1111",
        housing_type = "Sublet", notes = "8 person house", price = 1000)).add_listing_to_local_storage();
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

function getLatLng(geocoder, address) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
            } else {
                resolve([-1, -1])
            }
        });
    })

}
