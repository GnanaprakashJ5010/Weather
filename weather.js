const apiKey = "de52598e17a94a1b23154f6cfd08553e";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "❗ Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>🌤️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
      `;
    } else {
      resultDiv.innerHTML = `⚠️ City not found.`;
    }
  } catch (error) {
    resultDiv.innerHTML = `❌ Error: Could not fetch weather data.`;
    console.error("Weather fetch error:", error);
  }
}
