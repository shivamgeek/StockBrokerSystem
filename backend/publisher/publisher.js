const Redis = require("ioredis");

const redis = new Redis({
  host: "redis-service", // This matches the service name in docker-compose.yml
  port: 6379,
});
const channelName = "stocks-channel";

const stocks = ["AAPL", "MSFT", "AMZN", "GOOGL"];

function getStockPrice() {
  return Math.floor(Math.random() * 100) + 1;
}

function generateStockData() {
  const company = Math.floor(Math.random() * stocks.length);
  const price = getStockPrice();
  const data = JSON.stringify({
    company: stocks[company],
    price,
    timestamp: new Date().getDate().toLocaleString(),
  });
  return data;
}

setInterval(() => {
  const data = generateStockData();
  redis.publish(channelName, data);
  console.log(`Published ${data} to ${channelName}`);
}, 8000);
