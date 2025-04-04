const Redis = require("ioredis");
const WebSocket = require("ws");

const redis = new Redis({
  host: "redis-service", // This matches the service name in docker-compose.yml
  port: 6379,
});
const channelName = "stocks-channel";

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Subscribe to Redis channel
redis.subscribe(channelName);

redis.on("message", (channel, message) => {
  if (channel === channelName) {
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
});
