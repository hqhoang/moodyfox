$('#dismiss-button').on('click', function() {
    self.postMessage('close-panel');
});

self.port.on('not-found', function(notFoundList) {
    $('#result-text-box').val(notFoundList);
});
