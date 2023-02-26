// http://openweathermap.org/img/wn/01n@2x.png

import { generateForecastItem } from "./htmlGenerator.js";

document.getElementById("city").addEventListener("input", async (e) => {
  // go get the weather long lat from the city name
  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&appid=ff6df12c26f549aa8a0830985ed37687`
  );

  // get wearher from long lat

  if (data[0] && data[0]) {
    const { lat, lon } = data[0];
    const { data: weather } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=10&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`
    );

    // console.log(data);

    const html = weather.list.map((item) => {
      return `<div class="searchweather"> 
      <h1> ${new Date(item.dt * 1000).toLocaleString()}</h1>
      <p>${Math.round(item.main.temp - 273.15)}&#8451;</p>
      <p>${item.weather[0].main}</p>
      <img src="http://openweathermap.org/img/wn/${
        item.weather[0].icon
      }.png" alt="">
      </div>`;
    });

    document.getElementById("root").innerHTML = html.join("");
  }

  // write data into the dom
});

const createWeatherForecast = (list) => {
  const results = list.map((item, index) => {
    if (index % 3 !== 0) {
      return;
    }

    return generateForecastItem(item);
  });
  root.insertAdjacentHTML("beforeend", results.join(""));
};

const setInterface = (weather) => {
  const { name, country } = weather.city;

  // budild the page title
  const title = `<h1 class="title">Weather for ${name},  ${country}</h1>`;
  console.log(title);

  // write the ttlein the dom
  root.insertAdjacentHTML("beforebegin", title);

  createWeatherForecast(weather.list);
};

const success = async ({ coords }) => {
  const { latitude, longitude } = coords;
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=10&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`
  );

  setInterface(data);
};

function error(error) {
  root.innerHTML = `<h1>sorry you need to enable location services</h1>`;
}

navigator.geolocation.getCurrentPosition(success, error);
