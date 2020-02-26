class Listing {
    constructor(title, email, address, zip, phone, housing_type, notes = "") {
        this.title = title;
        this.email = email;
        this.address = address;
        this.zip = zip;
        this.phone = phone;
        this.housing_type = housing_type;
        this.notes = notes;
    }
    // TODO: add phone to card
    /**
     * Generates the card using the properties set on this.
     */
    generate_card() {
        return `<div class="card listing-card">
                <div class="card-header">${this.housing_type}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${this.address}, ${this.zip}</h6>
                    <p class="card-text">${this.notes}</p>
                    <button class="btn"><a href="mailto:${this.email}">${this.email}</a></button>
                </div>
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