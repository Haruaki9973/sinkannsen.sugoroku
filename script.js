const rollButton = document.getElementById('roll-dice');
const statusElement = document.getElementById('status');
const eventMessageElement = document.getElementById('event-message');

// 新幹線の駅リスト（新大阪から東京まで）
const stations = [
  { name: '新大阪', lat: 34.7333, lon: 135.5023 },
  { name: '京都', lat: 35.0116, lon: 135.7681 },
  { name: '米原', lat: 35.5282, lon: 136.5641 },
  { name: '岐阜羽島', lat: 35.3647, lon: 136.7753 },
  { name: '名古屋', lat: 35.1682, lon: 136.8813 },
  { name: '三河安城', lat: 34.9742, lon: 137.1111 },
  { name: '豊橋', lat: 34.7663, lon: 137.3872 },
  { name: '浜松', lat: 34.7073, lon: 137.7267 },
  { name: '掛川', lat: 34.7574, lon: 137.9727 },
  { name: '静岡', lat: 34.9769, lon: 138.3847 },
  { name: '新富士', lat: 35.1180, lon: 138.6790 },
  { name: '三島', lat: 35.1194, lon: 138.9136 },
  { name: '熱海', lat: 35.0923, lon: 139.0671 },
  { name: '小田原', lat: 35.2500, lon: 139.1500 },
  { name: '新横浜', lat: 35.5070, lon: 139.6226 },
  { name: '品川', lat: 35.6295, lon: 139.7385 },
  { name: '東京', lat: 35.6823, lon: 139.7595 }
];

let currentPosition = 0; // 初期位置は新大阪

// Leaflet.jsで地図を作成
const map = L.map('map').setView([stations[currentPosition].lat, stations[currentPosition].lon], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 新幹線のアイコンを作成
const trainIcon = L.icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/SHINKANSEN_ICON.svg', // 新幹線アイコンのURL
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

const trainMarker = L.marker([stations[currentPosition].lat, stations[currentPosition].lon], { icon: trainIcon }).addTo(map);

// サイコロを振って進む
rollButton.addEventListener('click', function() {
  // サイコロを振る（1～6のランダムな数字を生成）
  const diceResult = Math.floor(Math.random() * 6) + 1;

  // 現在の位置からサイコロの目分だけ進む
  currentPosition += diceResult;

  // もし東京に到達したら
  if (currentPosition >= stations.length) {
    currentPosition = stations.length - 1; // 東京を越えないように
    statusElement.textContent = `東京に到達しました！サイコロの目は ${diceResult} でした！`;
    eventMessageElement.textContent = '';
  } else {
    // 駅を表示
    statusElement.textContent = `現在の駅: ${stations[currentPosition].name} (サイコロの目: ${diceResult})`;
    eventMessageElement.textContent = `新幹線は ${stations[currentPosition].name} に到着しました！`;
  }

  // 新幹線の位置を更新
  trainMarker.setLatLng([stations[currentPosition].lat, stations[currentPosition].lon]);

  // 地図を再調整（新幹線の位置が画面中央に来るように）
  map.setView([stations[currentPosition].lat, stations[currentPosition].lon], 6);
});
