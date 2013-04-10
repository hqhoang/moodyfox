/**
 * content script to read the role settings from page
 */

self.on("click", function() {
    console.log('Reading settings');

    // check for advanced mode first
    var advancedBtn = $('input[type="submit"][name="toggleadvanced"]').first();

    if (advancedBtn.val() == 'Show advanced') {
        alert('Please switch to advanced mode first');
        return false;
    }

    var settings = {};

    // get all the capability radioboxes
    $('#defineroletable input[type="radio"]').each(function() {
        var radio = $(this);

        if (radio.is(':checked')) {
            settings[radio.prop('name')] = radio.val();
        }
    });

    self.postMessage(JSON.stringify(settings));
});
