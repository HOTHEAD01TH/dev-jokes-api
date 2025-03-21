function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
}

function updateStatus(status) {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status');
    
    statusDot.className = status;
    statusText.textContent = status === 'live' ? 'Online' : 'Offline';
}

function updateStats() {
    fetch('/api/statistics')
        .then(response => response.json())
        .then(data => {
            document.getElementById('uptime').textContent = formatUptime(data.uptime);
            document.getElementById('requests').textContent = data.requests.toLocaleString();
            document.getElementById('downtime').textContent = data.lastDowntime;
            updateStatus(data.status);
        })
        .catch(error => {
            console.error('Error fetching statistics:', error);
            updateStatus('down');
        });
}

// Only update once when page loads
document.addEventListener('DOMContentLoaded', updateStats); 