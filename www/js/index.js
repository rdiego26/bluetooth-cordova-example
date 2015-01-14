var app = {

    devices : [],

    // Application Constructor
    initialize: function() {
        $("#loading").fadeIn('slow');
        setTimeout( app.scanDevices, 3000);
    },

    scanDevices: function() {

        if(!BC.bluetooth.isopen) {
            BC.Bluetooth.OpenBluetooth(
                function(success) {
                    console.debug('Turning on bluetooth...ok');
                    $("#loading").fadeIn('slow');
                    console.debug('Scanning devices...');
                    BC.Bluetooth.StartScan();

                    //Update UI
                    setTimeout( app.showDevices , 10000);
                },
                function(error){ alert('Failed to turn on Bluetooth!');}
            );
        } else {
            $("#loading").fadeIn('slow');
            console.debug('Scanning devices...');
            BC.Bluetooth.StartScan();

            //Update UI
            setTimeout( app.showDevices , 10000);
        }

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

        var _device = window.device = BC.bluetooth.devices[_macDevice];

        console.debug('Attempting pair to ' + _macDevice);

        if( _device ) {
            _device.createPairSuccess = function(success) {
                console.debug('Pair Success!');
            };
            _device.createPairError = function(error) {
                console.debug('Pair Error!');
            };
            BC.bluetooth.createPair(_device);
        } else {
            alert('Error!');
        }


    }

};
