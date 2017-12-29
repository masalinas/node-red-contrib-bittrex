module.exports = function(RED) {
    "use strict";

    // load bittrex package
    var bittrex = require('node-bittrex-api');

    // load RED settings
    var settings = RED.settings;

    // Bittrex: WebSocket
    function BittrexWebSocket(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        var websocketClient;

        // configure bittrex connection
        bittrex.options({
            websockets: {
                onConnect: function() {
                    node.status({fill: "green", shape: "ring", text: "Connected"});
                    node.log("Websocket Connected");

                    // configure bittrex service handlers
                    websocketClient.serviceHandlers.connectFailed = function(error) {
                        node.status({fill: "red", shape: "ring", text: "Connect failed"});
                        node.error("Websocket connectFailed", error);

                        return;
                    };

                    websocketClient.serviceHandlers.onerror = function(error) {
                        node.status({fill: "red", shape: "ring", text: "Error"});
                        node.error("Websocket error", error);

                        return;
                    };

                    websocketClient.serviceHandlers.connectionLost = function(error) {
                        node.status({fill:"red", shape: "ring", text: "Connection lost"});
                        node.error("Connection Lost", error);

                        return;
                    };

                    // subscribe to bittrex websocket
                    bittrex.websockets.listen(function(data) {
                        var msg = {};

                        if (data.M === 'updateSummaryState') {
                            data.A.forEach(function(data_for) {
                                msg.payload = data_for.Deltas;

                                node.send(msg);
                            });
                        }
                    });
                },
                onDisconnect: function() {
                    node.status({fill: "yellow", shape: "ring", text: "Disconnected"});
                    node.warn("Websocket disconnected");
                }
            }
        });

        // connect to bittrex websocket
        bittrex.websockets.client(function(client) {
            websocketClient = client;
        });
    }

    RED.nodes.registerType('bittrex-websocket', BittrexWebSocket);
};