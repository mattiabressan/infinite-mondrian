/**
 * Created by Jonathan on 12/14/2014.
 */

    var name = Please.make_color();
    name = 'controller-' + name.substring(1);

    var peer = new Peer(name, {host: '149.142.228.107', port: 3000, path: '/peerjs',
    debug: 3, config: {'iceServers': [
        ]}
});
var conn = peer.connect('receiver');

//

var button = document.getElementById('send');

function bind( scope, fn ) {
    return function () {
        fn.apply( scope, arguments );
    };
};

var orientationControl = {

    onDeviceOrientationChangeEvent : function( rawEvtData ) {
        this.deviceOrientation = rawEvtData;
    },

    onScreenOrientationChangeEvent : function() {
        this.screenOrientation = window.orientation || 0;
    }

};

conn.on('open', function() {
    // Send messages
    conn.send(name);


    window.addEventListener('deviceorientation', function(eventData) {
        var deviceOrientation = {};

        deviceOrientation.compassHeading = eventData.compassHeading;
        deviceOrientation.webkitCompassHeading = eventData.webkitCompassHeading;
        deviceOrientation.alpha = eventData.alpha;
        deviceOrientation.beta = eventData.beta;
        deviceOrientation.gamma = eventData.gamma;

       conn.send(deviceOrientation);

    });

    window.addEventListener('orientationchange', function(eventData){
        var orientation = {orientationChange: window.orientation || 0};

        conn.send(orientation);
    });

    button.addEventListener('click', function () {
        conn.send('Hello!');
    })

});
