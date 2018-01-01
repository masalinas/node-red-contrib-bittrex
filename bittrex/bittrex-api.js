module.exports = function(RED) {
    "use strict";

    // load bittrex package
    var bittrex = require('node-bittrex-api');

    // load RED settings
    var settings = RED.settings;

    // Bittrex: API
    function BittrexApi(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        // execute Bittrex API
        node.on('input', function(msg) {
            bittrex.options({
                apikey: config.apikey,
                apisecret: config.apisecret
            });

            if (msg.payload.api == "getticker") {
                bittrex.getticker( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get ticker error"});
                        node.error("Get ticker error", err);

                        return;
                    }

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getbalances") {
                bittrex.getbalances( function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get balances"});
                        node.error("Get balances", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getmarkethistory") {
                bittrex.getmarkethistory( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get market history error"});
                        node.error("Get market history error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getmarketsummaries") {
                bittrex.getmarketsummaries( function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get market summaries error"});
                        node.error("Get market summaries error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getmarketsummary") {
                bittrex.getmarketsummary( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get market summary error"});
                        node.error("Get market summary error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getorderbook") {
                bittrex.getorderbook( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get orderbook error"});
                        node.error("Get orderbook error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getwithdrawalhistory") {
                bittrex.getwithdrawalhistory( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get withdrawal history error"});
                        node.error("Get withdrawal history error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getdepositaddress") {
                bittrex.getdepositaddress( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get deposit address error"});
                        node.error("Get deposit address error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getdeposithistory") {
                bittrex.getdeposithistory( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get deposit history error"});
                        node.error("Get deposit history error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "getbalance") {
                bittrex.getbalance( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Get balance error"});
                        node.error("Get balance error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else if (msg.payload.api == "withdraw") {
                bittrex.withdraw( msg.payload.options, function( data, err ) {
                    if (err) {
                        node.status({fill:"red", shape: "ring", text: "Withdraw error"});
                        node.error("Withdraw error", err);

                        return;
                    }

                    node.status({fill: "green", shape: "ring", text: "API executed"});

                    msg.payload = data;
                    node.send(msg);
                });
            }
            else {
                node.status({fill:"yellow", shape: "ring", text: "Bittrex API not exist"});
                node.warning("Bittrex API not exist");
            }
        });
    }

    RED.nodes.registerType('bittrex-api', BittrexApi);
};