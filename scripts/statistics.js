const startTime = new Date();
let requestCount = 0;
let lastDowntime = null;
let isLive = true;

const statistics = {
  incrementRequests: () => {
    // Only count requests to /api/ endpoints
    requestCount++;
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
  },
  setLive: () => {
    isLive = true;
  }
};

module.exports = statistics; 