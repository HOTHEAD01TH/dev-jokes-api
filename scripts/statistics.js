const WebSocket = require('ws');
const startTime = new Date();
let requestCount = 0;
let lastDowntime = null;
let isLive = true;
let wss;

const statistics = {
  initWebSocket: (server) => {
    wss = new WebSocket.Server({ server });
    
    wss.on('connection', (ws) => {
      console.log('Client connected to WebSocket');
      ws.send(JSON.stringify(statistics.getStatistics()));
      
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    wss.on('error', (error) => {
      console.error('WebSocket server error:', error);
    });
  },

  broadcastStats: () => {
    if (wss) {
      const stats = statistics.getStatistics();
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(stats));
        }
      });
    }
  },

  incrementRequests: () => {
    // Only count requests to /api/ endpoints
    requestCount++;
    statistics.broadcastStats();
  },

  getStatistics: () => {
    return {
      uptime: Math.floor((new Date() - startTime) / 1000),
      requests: requestCount,
      lastDowntime: lastDowntime || 'No downtime recorded',
      status: isLive ? 'live' : 'down'
    };
  },

  setDowntime: () => {
    lastDowntime = new Date().toISOString();
    isLive = false;
    statistics.broadcastStats();
  },

  setLive: () => {
    isLive = true;
    statistics.broadcastStats();
  }
};

module.exports = statistics; 