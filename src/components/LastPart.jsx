import React from "react";
import TradingViewWidget from "react-tradingview-widget";
import "../style/app.css";

const LastPart = () => {
  return (
    <div>
      <TradingViewWidget
        width="500"
        height="300"
        symbol="BITSTAMP:BTCUSD "
        interval="5"
        timezone="Etc/UTC"
        theme="dark"
        style="1"
        locale="en"
        toolbar_bg="#f1f3f6"
        enable_publishing:false
        allow_symbol_change:true
        container_id="tradingview_e4a85"
      />
    </div>
  );
};

export default LastPart;
