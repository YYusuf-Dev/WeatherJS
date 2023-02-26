export function generateForecastItem(item) {
  return `
    <div class="forecastitem">
    <p>${new Date(item.dt * 1000).toLocaleString()}</p>
    <p>${Math.round(item.main.temp - 273.15)}&#8451;</p>
    <p>${item.weather[0].main}</p>
    <img src="http://openweathermap.org/img/wn/${
      item.weather[0].icon
    }.png" alt="">
    </div>
    `;
}
