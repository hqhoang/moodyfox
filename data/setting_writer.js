/**
 * content script to read the role settings from page
 */

self.on("click", function(node, settings) {
    console.log('Applying settings');

    // check for advanced mode first
    var advancedBtn = $('input[type="submit"][name="toggleadvanced"]').first();

    if (advancedBtn.val() == 'Show advanced') {
        alert('Please switch to advanced mode first');
        return false;
    }

    settings = JSON.parse(settings);

    var orphanKeys = {};   // those settings not in the source
    var inDest     = {};   // those settings that are in destination

    // get all the capability radioboxes
    $('#defineroletable input[type="radio"]').each(function() {
        var radio = $(this);

        // verify against the list of settings
        var propName = radio.prop('name');

        if (settings.hasOwnProperty(propName)) {
            if (radio.val() == settings[propName]) {
                radio.prop('checked', true);
            }
        }
        else {
            // not available in source
            orphanKeys[propName] = true;
        }

        inDest[propName] = true;
    });

    // subtract inDest from settings to find what's not in dest
    var notInDest = [];
    $.each(settings, function(index, val) {
        if (!inDest.hasOwnProperty(index)) {
            notInDest.push(index);
        }
    });

    // convert orphanKeys into array
    var notInSource = $.map(orphanKeys, function(value, key) {
		return key;
	}); 

    // signal the panel about the the difference in settings
    var msg = '';
    if (notInSource.length > 0) {
        msg += 'SETTINGS NOT IN SOURCE:\n' + notInSource.join('\n') + '\n';
    }

    if (notInDest.length > 0) {
        if (msg != '') {
            msg += '\n\n====================\n\n';
        }

        msg += 'SETTINGS NOT IN TARGET:\n' + notInDest.join('\n');
    }

    if (msg != '') {
        self.postMessage(msg);
    }
});
