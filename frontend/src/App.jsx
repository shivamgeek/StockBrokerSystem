import React, { useEffect, useState } from "react";

export default function App() {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const ws = new WebSocket("ws://broker-service:8080");

    ws.onmessage = (event) => {
      const { company, price, timestamp } = JSON.parse(event.data);
      setStockData((prev) => ({ ...prev, [company]: { price, timestamp } }));
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📈 Real-Time Stock Prices
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(stockData).map(([company, { price, timestamp }]) => (
          <div
            key={company}
            className="bg-white rounded-2xl shadow-md p-4 transition hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">{company}</h2>
            <p className="text-green-600 text-lg font-mono">${price}</p>
            <p className="text-gray-400 text-sm mt-1">
              {new Date(timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
