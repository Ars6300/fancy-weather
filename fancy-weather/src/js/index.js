import '../css/style.css';
import '../css/owfont-regular.min.css';
import getLocation from './location';
import { getWeatherForecast, getCurrentWeather } from './handler';
import { putTodayWeather, putForecastWeather } from './render';
import setMap from './map';
import setImage from './background';

const loader = document.querySelector('body > img');
const searchForm = document.querySelector('body > main > div.search-block > form');
const input = document.querySelector('body > main > div.search-block > form > input[type=search]');
const fahrenheit = document.querySelector('body > main > div.buttons-block > div > button.btn.btn-f');
const celsius = document.querySelector('body > main > div.buttons-block > div > button.btn.btn-c');
const tempSelector = document.querySelector('body > main > div.buttons-block > div');
const langSelector = document.querySelector('body > main > div.buttons-block > select');
const updateImage = document.querySelector('body > main > div.buttons-block > button');
let measure;
let cityName;
let language;
let dayOrNight;

async function setWeatherByCity(city) {
  await getCurrentWeather(city, measure, language).then((ans) => {
    if (typeof ans === 'string') {
      alert(ans);
    } else {
      dayOrNight = ans.dayOrNight === 'd' ? 'day' : 'night';
      putTodayWeather(ans, language);
      setMap(ans.lat, ans.lon);
      setImage(ans.description, dayOrNight);
    }
  });
  await getWeatherForecast(city, measure, language).then((answer) => {
    if (typeof answer === 'string') {
      alert(answer);
    } else {
      putForecastWeather(answer, language);
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

const setActiveTemp = (letter) => {
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
  setActiveTemp(measure);
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

function setLanguage() {
  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'en');
    language = 'en';
  } else {
    language = localStorage.getItem('language');
  }
  langSelector.value = language;
}

function selectLanguage(e) {
  e.preventDefault();
  loader.classList.remove('hidden');
  language = langSelector.options[langSelector.selectedIndex].value;
  localStorage.setItem('language', language);
  setWeatherByCity(cityName).then(loader.classList.add('hidden'));
}

document.addEventListener('DOMContentLoaded', () => {
  loader.classList.remove('hidden');
  setMeasurement();
  setLanguage();
  getLocation().then((res) => {
    cityName = res.city;
    setWeatherByCity(cityName).then(loader.classList.add('hidden'));
  });
  searchForm.addEventListener('submit', (e) => submitForm(e));
  tempSelector.addEventListener('click', (e) => selectMeasure(e));
  langSelector.addEventListener('change', (e) => selectLanguage(e));
  updateImage.addEventListener('click', () => setImage(cityName, dayOrNight));
});
