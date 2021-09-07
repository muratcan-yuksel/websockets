import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

function FirstPart() {
  //give an initial state so that the data won't be undefined
  const [asks, setAsks] = useState([0]);
  const [bids, setBids] = useState([0]);
  //define the number of items
  const n = 15;

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
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
          // console.log(json.data.bids);
          // console.log(json.data.asks);
          // console.log(json.data.bids[0][0]);
          // setBids({ usd: json.data.bids[0][0], btc: json.data.bids[0][1] });
          // setAsks({ usd: json.data.bids[0][0], btc: json.data.bids[0][1] });
          // console.log(json.data.bids);

          setBids(json.data.bids.slice(0, 15));
          setAsks(json.data.asks.slice(0, 15));
        }
      } catch (err) {
        console.log(err);
      }
      // console.log(bids);
    };
    //clean up function
    return () => ws.close();
  }, []);

  const firstNElements = bids.map((item) => {
    return <p key={uniqid()}>{item}</p>;
  });

  console.log(bids);
  return (
    <div>
      <p>of</p>

      {/* <p>{bids.btc}</p>
      <p>{bids.usd} </p> */}
      {firstNElements}
    </div>
  );
}

export default FirstPart;
