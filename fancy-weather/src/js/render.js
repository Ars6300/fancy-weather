const cityAndCountry = document.querySelector('body > main > div.weather-block > div.today > div.locale > h1');
const date = document.querySelector('body > main > div.weather-block > div.today > div.locale > h3');
const degree = document.querySelector('body > main > div.weather-block > div.today > div.today-main > p');
const description = document.querySelector('#details > p:nth-child(1)');
const feeling = document.querySelector('#details > p:nth-child(2)');
const wind = document.querySelector('#details > p:nth-child(3)');
const humidity = document.querySelector('#details > p:nth-child(4)');
const forecastArea = document.querySelector('body > main > div.weather-block > div.forecast');
const weatherIcon = document.getElementById('weather-icon');


function createForecastElement(day, temp, icon) {
  const element = document.createElement('div');
  element.className = 'forecast-element';
  forecastArea.appendChild(element);
  const name = document.createElement('p');
  name.className = 'name';
  name.innerHTML = day;
  element.appendChild(name);
  const deg = document.createElement('p');
  deg.className = 'deg';
  deg.innerHTML = temp;
  element.appendChild(deg);
  const image = document.createElement('i');
  image.className = `${icon} small-icon`;
  element.appendChild(image);
}

function putTodayWeather(weather) {
  const today = weather.getTodayWeather();
  cityAndCountry.innerHTML = `${today.city}, ${today.country}`;
  date.innerHTML = `${today.date}`;
  degree.innerHTML = `${today.temp}`;
  description.innerHTML = today.description;
  weatherIcon.className = today.icon;
  feeling.innerHTML = today.feels;
  wind.innerHTML = today.wind;
  humidity.innerHTML = today.humidity;
}

// eslint-disable-next-line no-unused-vars
function putForecastWeather(weatherForThreeDays) {
  forecastArea.innerHTML = '';
  weatherForThreeDays.forEach((day) => {
    const forecast = day.getForecastWeather();
    createForecastElement(forecast.day, forecast.temp, forecast.icon);
  });
}

export { putTodayWeather, putForecastWeather };
