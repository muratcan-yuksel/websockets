import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import "../style/app.css";

const ThirdPart = () => {
  const [state, setState] = useState([]);

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "live_trades_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  //clean up lest memory leaks
  useEffect(() => {
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          console.log(json.data);
          setState((state) => [json.data, ...state]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);
  //map type with dynamic colors
  const mapType = state.map((item) => {
    if (item.type === 0) {
      return (
        <p key={uniqid()} style={{ color: "green" }}>
          BUY(BTC)
        </p>
      );
    } else if (item.type === 1) {
      return (
        <p key={uniqid()} style={{ color: "red" }}>
          SELL(BTC)
        </p>
      );
    }
  });

  const mapPrices = state.map((item) => {
    return (
      <p key={uniqid()} style={{ color: "white" }}>
        {item.price}
      </p>
    );
  });

  const mapAmount = state.map((item) => {
    return (
      <p key={uniqid()} style={{ color: "white" }}>
        {item.amount}
      </p>
    );
  });

  let mapDate = state.map((item) => {
    //this if statement solves the problem with getting a first NaN on the screen
    if (item.timestamp !== undefined) {
      let date = item.timestamp;
      let dateArr = Array.from(String(date), Number);
      dateArr.splice(2, 0, ":");
      dateArr.splice(5, 0, ":");
      dateArr.splice(-4);
      let lastArr = dateArr.join("");
      return (
        <p key={uniqid()} style={{ color: "white" }}>
          {lastArr}{" "}
        </p>
      );
    }
  });
  //   console.log(mapDate);

  return (
    <div>
      <div className="flexing">
        <h4 style={{ color: "grey" }}>Tür</h4>
        <h4 style={{ color: "grey" }}>Fiyat</h4>
        <h4 style={{ color: "grey" }}>Miktar</h4>
        <h4 style={{ color: "grey" }}>Saat</h4>
      </div>
      <div className="flexing">
        <div>{mapType}</div>
        <div>{mapPrices}</div>
        <div>{mapAmount}</div>
        <div>{mapDate}</div>
      </div>
    </div>
  );
};

export default ThirdPart;
