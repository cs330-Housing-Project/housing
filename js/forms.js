window.addEventListener('load', () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');
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
    add_form_events();
}, false);

function add_form_events() {
    const listing_form = document.getElementById('listing-form')
    listing_form.addEventListener('submit', (event) => {
        if (listing_form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            // console.log($('#listing-form').serializeArray())
            // (new Listing(
            //     title = "Itay's House",
            //     email = "stuff@northwestern.edu",
            //     address = "2110 Maple Ave. Evanston, Il",
            //     zip = "60201", phone = "123-456-7890",
            //     housing_type = "House", notes = "Sig Chi darty house", price=700)).add_listing_to_local_storage();
            listing_form.reset();
        }
        return false;
    })
}