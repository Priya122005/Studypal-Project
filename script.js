const apiKey = "afa301e090889051c411832f906f0c11";

function getWeather() {

  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert('Please enter city name');
    return;
  }
  if(!isNaN(city)){
    alert('Please enter valid city name');
    return;
  }
  fetchWeather(city, "WeatherResult");
}

function fetchWeather(city, elementId) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      const resultBox = document.getElementById(elementId);
      if (data.cod === 200) {
        resultBox.innerHTML =
          `<strong>${data.name}</strong><br>
          Temp: ${data.main.temp}°C<br>
          Humidity: ${data.main.humidity}%<br>
          Condition: ${data.weather[0].description}`;
      } else {
        resultBox.innerHTML = "City not found or API error.";
      }
    })
    .catch(error => {
      document.getElementById(elementId).innerHTML = "Error fetching data.";
      console.error(error);
    });
}

function compareWeather() {
  const city1 = document.getElementById("city1").value.trim();
  const city2 = document.getElementById("city2").value.trim();
  const result = document.getElementById("comparisonResult");
  result.innerHTML = "";

  if (!city1 || !city2) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data1 => {
      if (data1.cod === 200) {
        const box1 = createCityBox(data1);
        result.appendChild(box1);
        localStorage.setItem('city1', city1);
        localStorage.setItem('city2', city2);
      } else {
        result.innerHTML += `<div class="city-box">City 1 not found</div>`;
      }
    });

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data2 => {
      if (data2.cod === 200) {
        const box2 = createCityBox(data2);
        result.appendChild(box2);
      } else {
        result.innerHTML += `<div class="city-box">City 2 not found</div>`;
      }
    });
}

function createCityBox(data) {
  const div = document.createElement("div");
  div.className = "city-box";
  div.innerHTML = `<strong>${data.name}</strong><br>
    Temp: ${data.main.temp}°C<br>
    Humidity: ${data.main.humidity}%<br>
    Condition: ${data.weather[0].description}`;
  return div;
}

function saveFavorite() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  let favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
    loadFavorites();
  }
}

function loadFavorites() {
  const list = document.getElementById("favoritesList");
  list.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
  favorites.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => fetchWeather(city, "weatherResult");
    list.appendChild(li);
  });
}

window.onload = loadFavorites;