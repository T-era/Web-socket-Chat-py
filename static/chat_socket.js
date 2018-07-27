var chat = {};
(function() {
    var baseUrl = 'ws://localhost:8888/ws/';
    var socket = new WebSocket(baseUrl);

    socket.onclose = function() {
        console.log("Connection closed.");
        chat.view.disableAllControl();
    };
    socket.onerror = function() {
        console.log("Error!");
    };
    socket.onmessage = function(msgJson) {
        var msg = JSON.parse(msgJson.data);
        var name = msg.name;
        var message = msg.message
        chat.view.showMessage(name, message);
    };
    socket.onopen = function() {
        console.log('Open');
    };

    chat.socket = {
        close: function() {
            socket.close();
        },
        send: function(payload) {
            socket.send(JSON.stringify(payload));
        }
    };
})();
