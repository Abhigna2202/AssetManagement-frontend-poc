import { ResponsiveStream } from "@nivo/stream";
import React, { useState, useEffect } from "react";
import data from "../../components/data";
import "./chart.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import Buy from "./../../components/Invest/Buy";
import Sell from "./../../components/Invest/Sell";
import {
  getTransactionsHistory
} from "../../actions/Query/AssetManagement";

let PortfolioValue = 0;

const Chart = () => {
  const [data, setData] = useState([]);
  let value = 0;

  useEffect(() => {
      
      getTransactionsHistory(window.ethereum).then(data => {
        let date = new Date();
        let temp = 0;
        let d = [];
        data.map((details) => {
            temp = temp + parseFloat(details.amount)/Math.pow(10,18)*(details.action == 'Buy' ? 1 : -1)
            d.push({ name: new Date(parseInt(details.Date) * 1000).toLocaleString("en-US", {timeZone: "Australia/Melbourne"}), Portfolio_Value: temp });
        })
        setData(d);
        console.log(d);
        })

  }, [])

  return (
    <div>
      <h1>Portfolio Value</h1>
      <LineChart
        width={850}
        height={300}
        data={data}
        margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="Portfolio_Value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Chart;