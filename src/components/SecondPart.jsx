import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "../style/app.css";

const SecondPart = () => {
  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "live_orders_btcusd" },
  };

  ws.onopen = (event) => {
    // console.log("ororo");
    ws.send(JSON.stringify(apiCall));
  };

  //clean up lest memory leaks
  useEffect(() => {
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      // console.log(`[message] Data received from server: ${json}`);
      try {
        if ((json.event = "data")) {
          console.log("price" + json.data.price);
          console.log("amount" + json.data.amount);
          console.log(json.data.order_type);
          console.log("date time" + json.data.datetime);
          console.log("micro time " + json.data.microtimestamp);
        }
      } catch (err) {
        console.log(err);
      }
      // console.log(bids);
    };
    //clean up function
    return () => ws.close();
  }, []);

  return <div></div>;
};

export default SecondPart;