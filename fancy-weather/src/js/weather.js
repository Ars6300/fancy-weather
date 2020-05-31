import {
  langCode, langLat, langLon, langFeel, langWind, langHum, belDays,
} from './languages';

const getDate = (date, lang) => new Date(Date.parse(date.substring(0, 10))).toLocaleString(langCode[lang], { weekday: 'short', day: 'numeric', month: 'long' });
const getDay = (date, lang) => {
  if (lang === 'be') {
    return belDays[new Date(Date.parse(date.substring(0, 10))).toLocaleString(langCode.en, { weekday: 'long' })];
  }
  return new Date(Date.parse(date.substring(0, 10))).toLocaleString(langCode[lang], { weekday: 'long' });
};

export default class Day {
  constructor(city, country, date, lat, lon, temp,
    icon, description, wind, feels, humidity, dayOrNight) {
    this.city = city;
    this.country = country;
    this.date = date;
    this.lat = lat;
    this.lon = lon;
    this.temp = temp;
    this.icon = icon;
    this.description = description;
    this.wind = wind;
    this.feels = feels;
    this.humidity = humidity;
    this.dayOrNight = dayOrNight;
  }

  getTodayWeather(lang) {
    return {
      city: this.city,
      country: this.country,
      date: getDate(this.date, lang),
      lat: `${langLat[lang]}: ${this.lat}`,
      lon: `${langLon[lang]}: ${this.lon}`,
      temp: `${this.temp}&#176;`,
      icon: `owf owf-${this.icon}-${this.dayOrNight} owf-5x`,
      description: this.description,
      wind: `${langWind[lang]}: ${this.wind}`,
      feels: `${langFeel[lang]}: ${this.feels}&#176;`,
      humidity: `${langHum[lang]}: ${this.humidity}%`,
      time: this.dayOrNight,
    };
  }

  getForecastWeather(lang) {
    return {
      day: getDay(this.date, lang),
      temp: `${this.temp}&#176;`,
      icon: `owf owf-${this.icon} owf-3x`,
    };
  }
}
