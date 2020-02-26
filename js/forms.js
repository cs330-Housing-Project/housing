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

            add_listing_to_local_storage();
        }
        return false;
    })
}