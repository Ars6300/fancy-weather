import '../css/style.css';
import '../css/owfont-regular.min.css';
import getLocation from './location';
import { getWeatherForecast, getCurrentWeather } from './handler';
import { putTodayWeather, putForecastWeather } from './render';
import setMap from './map';

const loader = document.querySelector('body > img');
const searchForm = document.querySelector('body > main > div.search-block > form');
const input = document.querySelector('body > main > div.search-block > form > input[type=search]');

async function setWeatherByCity(city) {
  await getCurrentWeather(city, 'en').then((ans) => {
    if (typeof ans === 'string') {
      alert(ans);
    } else {
      putTodayWeather(ans);
      setMap(ans.lat, ans.lon);
    }
  });
  await getWeatherForecast(city, 'en').then((answer) => {
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
    loader.classList.remove('hidden');
    setWeatherByCity(input.value).then(loader.classList.add('hidden'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loader.classList.remove('hidden');
  getLocation().then((res) => setWeatherByCity(res.city).then(loader.classList.add('hidden')));
  searchForm.addEventListener('submit', (e) => submitForm(e));
});
