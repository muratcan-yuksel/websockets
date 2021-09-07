import React from "react";

function FirstPart() {
  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    console.log("ororo");
    ws.send(JSON.stringify(apiCall));
  };
  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    console.log(`[message] Data received from server: ${json}`);
    try {
      if ((json.event = "data")) {
        console.log(json.data.bids);
        console.log(json.data.asks);
        console.log(json.data.bids[0]);
        para.textContent = json.data.bids[0];
      }
    } catch (err) {
      console.log(err);
    }
  };
  return <div>loool</div>;
}

export default FirstPart;
