class Listing {
    constructor(title="", email="", address="", zip="", phone="", housing_type="", notes = "", price= 0) {
        this.title = title;
        this.email = email;
        this.address = address;
        this.zip = zip;
        this.phone = phone;
        this.housing_type = housing_type;
        this.notes = notes;
        this.price = price
    }
    // TODO: add phone to card
    /**
     * Generates the card using the properties set on this.
     */
    generate_card() {
        return `<div class="card listing-card">
                <div class="card-header">${this.housing_type}: ${this.title}<div class="float-right price">$${this.price}</div>
                </div>

                  <table class="card-table table table-borderless" style="border: 0">
                    <thead >
                      <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class = "desc">${this.notes}</td>
                        <td class = "info">
                          <p class = "card-text ">${this.address}, ${this.zip}</h6>
                          <br />
                          ${this.phone}<br />
                          <a href="mailto:${this.email}">${this.email}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
            </div>`
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

Listing.prototype.generate_from_obj = (obj) => {
    let newListing = new Listing();
    return Object.assign(newListing, obj);
}

Listing.prototype.sort_listings_by_id= (param) => {
    let listings = JSON.parse(localStorage.getItem('listings'));
    listings = listings.map((l) => {
        return Listing.prototype.generate_from_obj(JSON.parse(l));
    })
    listings = listings.sort((a, b) => (a[`${param}`] > b[`${param}`]) ? 1 : -1);

    const listings_content = document.getElementById('listings-content');
    listings_content.innerHTML = "";
    if (listings_content) {
        listings.forEach((listing)=> {
            listingCard = listing.generate_card();
            listings_content.innerHTML += listingCard;
        });
    }
}
