
let locationSpan = document.getElementById("location");
let activitySpan = document.getElementById("activity");
let simulateButton = null;

let map = L.map('map').setView([-5.04, -42.78], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([-5.04, -42.78]).addTo(map);
marker.bindPopup("Posição do animal").openPopup();

function atualizarLocalizacao(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  locationSpan.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  marker.setLatLng([lat, lng]);
  map.setView([lat, lng]);

  const parado = Math.random() < 0.3;
  activitySpan.textContent = parado ? "Parado" : "Em movimento";
}

function erroLocalizacao() {
  locationSpan.textContent = "Não foi possível obter a localização real. Use o botão de simulação.";
  activitySpan.textContent = "Desconhecido";
}

function simularLocalizacao() {
  const lat = -5.0400 + Math.random() * 0.002;
  const lng = -42.7800 + Math.random() * 0.002;

  locationSpan.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  marker.setLatLng([lat, lng]);
  map.setView([lat, lng]);

  const parado = Math.random() < 0.3;
  activitySpan.textContent = parado ? "Parado (simulado)" : "Em movimento (simulado)";
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(atualizarLocalizacao, erroLocalizacao, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
  });
} else {
  erroLocalizacao();
}
