import '../css/style.css';
import '../css/owfont-regular.min.css';
import getLocation from './location';
import { getWeatherForecast, getCurrentWeather } from './handler';
import { putTodayWeather, putForecastWeather } from './render';
import setMap from './map';

const loader = document.querySelector('body > img');
const searchForm = document.querySelector('body > main > div.search-block > form');
const input = document.querySelector('body > main > div.search-block > form > input[type=search]');
const fahrenheit = document.querySelector('body > main > div.buttons-block > div > button.btn.btn-f');
const celsius = document.querySelector('body > main > div.buttons-block > div > button.btn.btn-c');
const selector = document.querySelector('body > main > div.buttons-block > div');
let measure;
let cityName;

async function setWeatherByCity(city) {
  await getCurrentWeather(city, measure, 'en').then((ans) => {
    if (typeof ans === 'string') {
      alert(ans);
    } else {
      putTodayWeather(ans);
      setMap(ans.lat, ans.lon);
    }
  });
  await getWeatherForecast(city, measure, 'en').then((answer) => {
    if (typeof answer === 'string') {
      alert(answer);
    } else {
      putForecastWeather(answer, 'en');
    }
  });
}

function submitForm(e) {
  e.preventDefault();
  if (input.value.length > 0) {
    cityName = input.value;
    loader.classList.remove('hidden');
    setWeatherByCity(cityName).then(loader.classList.add('hidden'));
  }
}

const setActive = (letter) => {
  if (letter === 'M') {
    celsius.classList.add('active');
    fahrenheit.classList.remove('active');
  } else {
    celsius.classList.remove('active');
    fahrenheit.classList.add('active');
  }
};

function setMeasurement() {
  if (!localStorage.getItem('measurement')) {
    localStorage.setItem('measurement', 'M');
    measure = 'M';
  } else {
    measure = localStorage.getItem('measurement');
  }
  setActive(measure);
}

function selectMeasure(e) {
  e.preventDefault();
  loader.classList.remove('hidden');
  if (e.target.classList.contains('btn-f')) {
    localStorage.setItem('measurement', 'I');
  } else if (e.target.classList.contains('btn-c')) {
    localStorage.setItem('measurement', 'M');
  }
  setMeasurement();
  setWeatherByCity(cityName).then(loader.classList.add('hidden'));
}

document.addEventListener('DOMContentLoaded', () => {
  loader.classList.remove('hidden');
  setMeasurement();
  getLocation().then((res) => {
    cityName = res.city;
    setWeatherByCity(cityName).then(loader.classList.add('hidden'));
  });
  searchForm.addEventListener('submit', (e) => submitForm(e));
  selector.addEventListener('click', (e) => selectMeasure(e));
});
