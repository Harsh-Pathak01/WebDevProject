const platform = new H.service.Platform({
    apikey: 'aeBu0GkfKm7QWDg1tXqpul8XcdwwzqpFljU0XxPfeiU'
});

const defaultLayers = platform.createDefaultLayers();
const map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map, {
        zoom: 7,
        center: { lat: 12.981271, lng: 79.166130 }
    }
);

const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
window.addEventListener('resize', () => map.getViewPort().resize());
const ui = H.ui.UI.createDefault(map, defaultLayers);

document.getElementById('searchBtn').addEventListener('click', async () => {
    const ipAddress = document.getElementById('ipInput').value;
    const ipApiResponse = await fetch(`https://ipinfo.io/${ipAddress}/json`);
    const ipLocationData = await ipApiResponse.json();

    const [latitude, longitude] = ipLocationData.loc.split(',');
    map.setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    map.setZoom(14, {duration:1000});

    const marker = new H.map.Marker({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    map.addObject(marker);

    document.getElementById('ipDetails').innerHTML = `
        <p>IP: ${ipLocationData.ip}</p>
        <p>Country: ${ipLocationData.country}</p>
        <p>Region: ${ipLocationData.region}</p>
        <p>City: ${ipLocationData.city}</p>
        <p>Latitude: ${latitude}</p>
        <p>Longitude: ${longitude}</p>
    `;

    generateQRCode(`Latitude: ${latitude}, Longitude: ${longitude}`);
});

document.getElementById('searchBtn').addEventListener('click', async () => {
    const ipAddress = document.getElementById('ipInput').value;
    const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=YOUR_TOKEN`);
    const ipDetails = await response.json();
    const [latitude, longitude] = ipDetails.loc.split(',');
    const location = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;

    updateDashboard(ipDetails);
    animateMapZoom(location);
});


function animateMapZoom(location) {
    map.setZoom(5, true);  
    setTimeout(() => {
        map.setCenter(location);
        map.setZoom(14, true); 
    }, 1000); 
}


document.getElementById('searchBtn').addEventListener('click', async () => {
    const ipAddress = document.getElementById('ipInput').value;
    const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=YOUR_TOKEN`);
    const ipDetails = await response.json();
    const location = `${ipDetails.loc.split(',').join(',')}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;

    updateDashboard(ipDetails);
    generateQR(mapsUrl); 
});

document.getElementById('qrBtn').addEventListener('click', () => {
    const ipAddress = document.getElementById('ipInput').value;
    window.open(`qr-page.html?ip=${ipAddress}`, '_blank');
});

function updateDashboard(details) {
    const dashboard = document.getElementById('ipDetails');
    dashboard.innerHTML = `
        <h4>IP Details</h4>
        <p><strong>IP:</strong> ${details.ip}</p>
        <p><strong>Country:</strong> ${details.country}</p>
        <p><strong>Region:</strong> ${details.region}</p>
        <p><strong>City:</strong> ${details.city}</p>
        <p><strong>Latitude and Longitude:</strong> ${details.loc}</p>
    `;
}
