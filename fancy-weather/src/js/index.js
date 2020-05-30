import '../css/style.css';
import '../css/owfont-regular.min.css';
import getLocation from './location';
import { getWeatherForecast, getCurrentWeather } from './handler';
import { putTodayWeather, putForecastWeather } from './render';
import setMap from './map';

document.addEventListener('DOMContentLoaded', () => {
  getLocation().then((res) => {
    getCurrentWeather(res.city, 'en').then((ans) => {
      if (typeof ans === 'string') {
        alert(ans);
      } else {
        putTodayWeather(ans);
        setMap(ans.lat, ans.lon);
      }
    });
    getWeatherForecast(res.city, 'en').then((ans) => putForecastWeather(ans));
  });
});
