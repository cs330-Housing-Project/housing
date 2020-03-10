class Listing {
    constructor(title, email, address, zip, phone, housing_type, notes = "", price= 0, amenities="", latlng=[]) {
        this.title = title;
        this.email = email;
        this.address = address;
        this.zip = zip;
        this.phone = phone;
        this.housing_type = housing_type;
        this.notes = notes;
        this.price = price
        this.latlng = latlng;
        this.amenities = amenities;
    }
    // TODO: add phone to card
    /**
     * Generates the card using the properties set on this.
     */
    generate_card() {


        return `<div class="card listing-card" type="button" data-toggle="modal" data-target="#exampleModal">
                <div class="card-header">${this.housing_type}: ${this.title}<div class="float-right price">$${this.price}</div>
                </div>

                  <table class="card-table table table-borderless" style="border: 0">
                    <tbody>
                      <tr>
                        <td class = "info">
                          <p class = "card-text ">${this.address}, ${this.zip}</h6>
                          <br />
                          ${this.phone}<br />
                          <a href="mailto:${this.email}">${this.email}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${this.housing_type}: ${this.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <table class="card-table table table-borderless" style="border: 0">
                              <thead>
                                <tr>
                                  <th scope="col">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class = "desc">${this.notes}</td>
                                </tr>
                              </tbody>
                            </table>

                            <table class="card-table table table-borderless" style="border: 0">
                              <thead>
                                <tr>
                                  <th scope="col">Amenities</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class = "desc">${this.amenities}</td>
                                </tr>
                              </tbody>
                            </table>

                            <table class="card-table table table-borderless" style="border: 0">
                              <thead>
                                <tr>
                                  <th scope="col">Location</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class = "info">
                                    <p class = "card-text ">${this.address}, ${this.zip}</h6>
                                    <br />
                                    ${this.phone}<br />
                                    <a href="mailto:${this.email}">${this.email}</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Add To Favorites</button>
                            <button type="button" class="btn btn-primary" onclick="window.location.href = '/housing/pages/messages.html';">Message Landlord</button>
                          </div>
                        </div>
                      </div>
                    </div>
            </div>`
            // change amenities to icons
    }

    /**
     * Converts self to json string
     */
    convert_to_json() {
        return JSON.stringify(this);
    }

    /**
     * Adds a listing to the local storage
     */
    add_listing_to_local_storage(referrerElement=null) {
        const listings_content = document.getElementById('listings-content');
        if (listings_content) {
            listings_content.innerHTML += this.generate_card()
        }

        if (geocoder && map) {
            markAddress(geocoder, map, address);
        }

        let listings = new Set(JSON.parse(localStorage.getItem('listings')) || [])
        const json = this.convert_to_json();
        if (!listings.has(json)) {
            listings.add(json);
            localStorage.setItem('listings', JSON.stringify(Array.from(listings)))
        } else {
            if (referrerElement) {
                // do stuff to display to user that they can't add the same listing twice
            }
        }


    }
}

Listing.prototype.sort_listings_by_id= (param) => {
    let listings = JSON.parse(localStorage.getItem('listings'));
    listings = listings.map(JSON.parse)
    listings = listings.sort((a, b) => (a[`${param}`] > b[`${param}`]) ? 1 : -1);
}
Listing.prototype.generate_from_obj = (obj) => {
    let newListing = new Listing();
    return Object.assign(newListing, obj);
}

Listing.prototype.sort_listings_price= (option) => {
    let listings = JSON.parse(localStorage.getItem('listings'));
    listings = listings.map((l) => {
        return Listing.prototype.generate_from_obj(JSON.parse(l));
    })

    if(option === "low") {
        listings = listings.sort((a, b) => (a['price'] > b['price']) ? 1 : -1);
    } else {
        listings = listings.sort((a, b) => (a['price'] < b['price']) ? 1 : -1);
    }

    const listings_content = document.getElementById('listings-content');
    listings_content.innerHTML = "";
    if (listings_content) {
        listings.forEach((listing)=> {
            listingCard = listing.generate_card();
            listings_content.innerHTML += listingCard;
        });
    }
}
Listing.prototype.sort_listings_by_type= (option) => {
    let listings = JSON.parse(localStorage.getItem('listings'));
    listings = listings.map((l) => {
        return Listing.prototype.generate_from_obj(JSON.parse(l));
    })
    listings = listings.filter((listing) => listing['housing_type'] === option);
    const listings_content = document.getElementById('listings-content');
    listings_content.innerHTML = "";
    if (listings_content) {
        listings.forEach((listing)=> {
            listingCard = listing.generate_card();
            listings_content.innerHTML += listingCard;
        });
    }
}

const rad = (x) => {
    return x * Math.PI / 180;
  };

const getDistance = (p1, p2) => {
    if (p1[0] == -1) return Math.max();
    // const R = 6378137; // Earth’s mean radius in meter
    // const dLat = rad(p2.lat - p1[0]);
    // const dLong = rad(p2.lng - p1[1]);
    // const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //   Math.cos(rad(p1[0])) * Math.cos(rad(p2.lat)) *
    //   Math.sin(dLong / 2) * Math.sin(dLong / 2);
    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // const d = R * c;
    console.log(p1);
    console.log(Math.abs(p1[0] - p2.lat)*1000);
    return Math.abs(p1[0] - p2.lat)*1000; // returns the distance in meter
};

Listing.prototype.sort_listings_by_location = (option) => {
    const dict = {
        "north": { lat: 42.058, lng: -87.6800 },
        "mid": { lat: 42.055, lng: -87.6800},
        "south": { lat: 42.053, lng: -87.6800},
    };
    let listings = JSON.parse(localStorage.getItem('listings'));
    listings = listings.map((l) => {
        return Listing.prototype.generate_from_obj(JSON.parse(l));
    })
    let latlngs = [];
    listings.forEach((listing) => {
        latlngs.push(getLatLng(geocoder, listing['address']));
    })
    const listings_content = document.getElementById('listings-content');
    listings_content.innerHTML = "";
    Promise.all(latlngs).then(values => {
        for (i = 0; i < values.length; i++) {
            listings[i].latlng = values[i];
        }
        listings = listings.filter(listing => (getDistance(listing.latlng, dict[option]) <= 1));
        if (listings_content) {
            listings.forEach((listing)=> {
                listingCard = listing.generate_card();
                listings_content.innerHTML += listingCard;
            });
        }
    });

};
