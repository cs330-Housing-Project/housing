// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });

        const listing_form = document.getElementById('listing-form')
        listing_form.addEventListener('submit', (event) => {
            if (listing_form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                const email_address = document.getElementById('email_address').value;
                const address = document.getElementById('address').value;
                const zip = document.getElementById('inputZip').value;
                const housing_type = document.getElementById('housing_type').value;
                const notes = document.getElementById('notes').value;
                const title = document.getElementById('listing_title').value;
                add_listing_to_page(email_address, address, zip, housing_type, notes, title);
            }
            return false;
        })
    }, false);
})();


function add_listing_to_page(email_address, address, zip, housing_type, notes, title) {
    document.getElementById('listings-content').innerHTML += `
    <div class="card listing-card">
        <div class="card-header">${housing_type}
        </div>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${address}, ${zip}</h6>
            <p class="card-text">${notes}</p>
            <button class="btn"><a href="mailto:${email_address}">Contact</a></button>
        </div>
    </div>
    `
}

const dummy_data = [
    {
        e: "link@link.com",
        a: "811 Emerson St.",
        h: "Apartment",
        z: 60201,
        n: "nice apartment",
        t: "The Link"
    },
    {
        e: "test@gmail.com",
        a: "121 Maple Ave.",
        h: "House",
        z: 60203,
        n: "super chill house",
        t: "Houseparty"
    }
]

for (let d of dummy_data) {
    add_listing_to_page(d.e, d.a, d.z, d.h, d.n, d.t);
}