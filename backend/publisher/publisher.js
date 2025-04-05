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
    timestamp: new Date().toLocaleTimeString(),
  });
  return data;
}

console.log(
  "setting timeout for events as " +
    process.env.timeout +
    " or " +
    Number(process.env.timeout)
);

setInterval(() => {
  const data = generateStockData();
  redis.publish(channelName, data);
  console.log(`Published ${data} to ${channelName}`);
}, Number(process.env.timeout) || 2500);
