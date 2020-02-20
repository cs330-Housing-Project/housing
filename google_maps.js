var map;
var count = 1;
function setColor(btn, color) {
    var property = document.getElementById(btn);
    if (count == 0) {
        property.style.backgroundColor = "#FFFFFF";
        count = 1;
    } else {
        property.style.backgroundColor = "#7FFF00";
        count = 0;
    }
}

$(document).ready(function () {
    const myLatLng = { lat: 42.0579902, lng: -87.682719 };
    const mapOptions = {
        zoom: 15,
        center: myLatLng
    };
    map = new google.maps.Map($("#mapcanvas")[0], mapOptions);

    for (let i = 0; i < 10; i++) {
        const marker = new google.maps.Marker({
            position: {
                lat: Math.random() * (42.059 - 42.056) + 42.056,
                lng: Math.random() * (-87.681719 + 87.685719) - 87.683719
            },
            map: map
        });
    }

    //*********************************************************************
    // Add the layer showing the inventory
    //*********************************************************************
}); //end document ready