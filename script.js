let ws;
let uptimeInterval;

function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
}

function updateUptime(initialUptime) {
    let currentUptime = initialUptime;
    
    // Clear any existing interval
    if (uptimeInterval) clearInterval(uptimeInterval);
    
    // Update uptime every second
    uptimeInterval = setInterval(() => {
        currentUptime++;
        document.getElementById('uptime').textContent = formatUptime(currentUptime);
    }, 1000);
}

function updateStatus(status) {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status');
    
    statusDot.className = status;
    statusText.textContent = status === 'live' ? 'Online' : 'Offline';
}

function connectWebSocket() {
    const isProduction = window.location.hostname.includes('github.io');
    const wsUrl = isProduction 
        ? 'wss://dev-jokes-api.onrender.com'
        : `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`;
    
    ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateUptime(data.uptime);
        document.getElementById('requests').textContent = data.requests.toLocaleString();
        document.getElementById('downtime').textContent = data.lastDowntime;
        updateStatus(data.status);
    };

    ws.onclose = () => {
        clearInterval(uptimeInterval);
        setTimeout(connectWebSocket, 5000);
        updateStatus('down');
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        clearInterval(uptimeInterval);
        updateStatus('down');
    };
}

// Connect when page loads
document.addEventListener('DOMContentLoaded', connectWebSocket); 