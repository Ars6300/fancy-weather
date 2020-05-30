import { countries } from 'country-data';
import Day from './weather';

const langCode = {
  en: 'en-us',
  ru: 'ru-ru',
  be: 'be-be',
};

const getDate = (date, lang) => new Date(Date.parse(date.substring(0, 10))).toLocaleString(langCode[lang], { weekday: 'short', day: 'numeric', month: 'long' });
const getDay = (date, lang) => new Date(Date.parse(date.substring(0, 10))).toLocaleString(langCode[lang], { weekday: 'long' });

async function getCurrentWeather(city, lang) {
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&units=M&lang=${lang}&key=d670cbf8d57c44dba4768427624689af`;
  try {
    const res = await fetch(url);
    if (!res.ok) { res.text().then((text) => { throw Error(text); }); }
    const data = await res.json();
    const src = data.data[0];
    const day = new Day(
      src.city_name,
      countries[src.country_code].name,
      getDate(src.datetime, lang),
      getDay(src.datetime, lang),
      src.lat,
      src.lon,
      Math.round(src.temp),
      src.weather.code,
      src.weather.description,
      Math.round(src.wind_spd),
      Math.round(src.app_temp),
      src.rh,
      src.pod,
    );
    return day;
  } catch (e) {
    return e.message;
  }
}

async function getWeatherForecast(city, lang) {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=4&units=M&lang=${lang}&key=d670cbf8d57c44dba4768427624689af`;
  const result = [];
  try {
    const res = await fetch(url);
    if (!res.ok) { res.text().then((text) => { throw Error(text); }); }
    const data = await res.json();
    for (let i = 1; i <= 3; i += 1) {
      const day = new Day(
        data.city_name,
        countries[data.country_code].name,
        getDate(data.data[i].valid_date, lang),
        getDay(data.data[i].valid_date, lang),
        data.lat,
        data.lon,
        Math.round(data.data[i].temp),
        data.data[i].weather.code,
        data.data[i].weather.description,
        Math.round(data.data[i].wind_spd),
      );
      result.push(day);
    }
  } catch (e) {
    return e.message + 1;
  }
  return result;
}

export { getWeatherForecast, getCurrentWeather };
