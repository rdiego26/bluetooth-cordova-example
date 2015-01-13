var app = {

    devices : [],

    // Application Constructor
    initialize: function() {
        $("#loading").fadeIn('slow');
        setTimeout( app.scanDevices, 3000);
    },

    scanDevices: function() {

        $("#loading").fadeIn('slow');
        console.debug('Scanning devices...');
        BC.Bluetooth.StartScan();

        //Update UI
        setTimeout( app.showDevices , 10000);
    },

    //TODO use underscore template
    showDevices: function() {

        var template;

        app.devices = _.values(BC.bluetooth.devices); // is a object

        $("#loading").fadeOut('slow');

        if(app.devices.length > 0) {

            template = _.template($("script.device").html());
            $('#devices').html(template());

        } else {

            alert('not found devices!');

        }

    },

    connectToDevice: function(_macDevice) {
        console.debug('Attempting connect to ' + _macDevice);


    }

};
