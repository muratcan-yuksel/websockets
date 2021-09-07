import React, { useState } from "react";

function FirstPart() {
  const [data, setData] = useState();

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    // console.log("ororo");
    ws.send(JSON.stringify(apiCall));
  };
  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    // console.log(`[message] Data received from server: ${json}`);
    try {
      if ((json.event = "data")) {
        // console.log(json.data.bids);
        // console.log(json.data.asks);
        // console.log(json.data.bids[0][0]);
        // setData(json.data.bids[0]);
        setData({ usd: json.data.bids[0][0], btc: json.data.bids[0][1] });
        // setData(json.data.bids[1]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <p>{data.btc}</p>
      <p>{data.usd} </p>
      <p>of</p>
    </div>
  );
}

export default FirstPart;
