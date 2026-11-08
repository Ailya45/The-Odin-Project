import { getWeatherData, processWeatherData } from "./api.js";

let currentWeatherData = null;
let isFahrenheit = false;

const weatherForm = document.getElementById("weather-form");
const locationInput = document.getElementById("location-input");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  if (!location) return;

  try {
    const rawData = await getWeatherData(location);

    currentWeatherData = processWeatherData(rawData);

    renderWeather(currentWeatherData, "metric");
  } catch (error) {
    console.error("No se pudo obtener el clima:", error.message);
  }
});

function renderWeather(weatherData, unit = "metric") {
  const locationName = document.getElementById("location-name");
  const tempDisplay = document.getElementById("temp-display");
  const conditionsDisplay = document.getElementById("condition-display");

  let finalTemp = weatherData.temp;
  let symbol = "°C";

  if (unit === "us") {
    finalTemp = (weatherData.temp * 9) / 5 + 32;
    symbol = "°F";
  }

  locationName.textContent = weatherData.location;
  tempDisplay.textContent = `${finalTemp.toFixed(1)}${symbol}`;

  conditionsDisplay.textContent = weatherData.conditions;
}

const unitToggleBtn = document.getElementById("unit-toggle");

unitToggleBtn.addEventListener("click", () => {
  if (!currentWeatherData) return;

  isFahrenheit = !isFahrenheit;
  const unit = isFahrenheit ? "us" : "metric";
  renderWeather(currentWeatherData, unit);

  unitToggleBtn.textContent = isFahrenheit ? "Cambiar a °C" : "Cambiar a °F";
});
