import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "../style/app.css";

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
          //önce sıralayalım
          //büyükten küçüğe
          //(bids is arranged by itself)
          setBids(json.data.bids.slice(0, 15));
          //küçükten büyüğe
          //(asks too is arranged by itself)
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

  //map the first 15 bids
  const firstBids = bids.map((item) => {
    return (
      <div className="flexing" key={uniqid()}>
        <p style={{ color: "green" }}> {item[0]}</p>
        <p style={{ color: "white" }}> {item[1]}</p>
        <p style={{ color: "white" }}> {(item[0] * item[1]).toFixed(4)}</p>
      </div>
    );
  });
  //map the first 15 asks
  const firstAsks = asks.map((item) => {
    return (
      <div className="flexing" key={uniqid()}>
        <p style={{ color: "red" }}> {item[0]}</p>
        <p style={{ color: "white" }}> {item[1]}</p>
        <p style={{ color: "white" }}> {(item[0] * item[1]).toFixed(4)}</p>
      </div>
    );
  });

  // console.log(bids);
  // console.log(asks);
  return (
    <div>
      <p>of</p>

      {/* <p>{bids.btc}</p>
      <p>{bids.usd} </p> */}
      <div>
        <h1 style={{ color: "white" }}>Asks</h1>
        <div className="flexing">
          <h4 style={{ color: "grey" }}>Fiyat(USDT)</h4>
          <h4 style={{ color: "grey" }}>Miktar(BTC)</h4>
          <h4 style={{ color: "grey" }}>Toplam</h4>
        </div>
        {firstAsks}
      </div>
      <div>
        <h1 style={{ color: "white" }}>Bids</h1>
        {firstBids}
      </div>
    </div>
  );
}

export default FirstPart;
