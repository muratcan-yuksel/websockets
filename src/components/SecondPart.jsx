import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "../style/app.css";

const SecondPart = () => {
  const [price, setPrice] = useState([0]);
  const [state, setState] = useState([0]);

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
      // console.log(event);
      const json = JSON.parse(event.data);
      // console.log(`[message] Data received from server: ${json}`);
      try {
        if ((json.event = "data")) {
          // console.log("price" + json.data.price);
          // console.log("amount" + json.data.amount);
          // console.log(json.data.order_type);
          // console.log("date time" + json.data.datetime);
          // console.log("micro time " + json.data.microtimestamp);
          // console.log(json.data);
          setPrice((price) => [json.data.price, ...price.slice(0, 30)]);
          setState((state) => [json.data, ...state.slice(0, 30)]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);
  // console.log(price);
  console.log(state);
  //map prices with dynamic colors
  const mapPrices = state.map((item) => {
    if (item.order_type === 0) {
      return (
        <p key={item.id} style={{ color: "green" }}>
          {item.price}
        </p>
      );
    } else if (item.order_type === 1) {
      return (
        <p key={item.id} style={{ color: "red" }}>
          {item.price}
        </p>
      );
    }
  });

  return <div>{mapPrices}</div>;
};

export default SecondPart;
