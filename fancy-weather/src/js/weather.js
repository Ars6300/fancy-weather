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

const symbols = {
  celsius: '&#176;',
  percent: '%',
  owfont: 'owf',
};

export default class Day {
  constructor(city, country, date, lat, lon, temperature,
    icon, description, wind, feels, humidity, dayOrNight) {
    this.city = city;
    this.country = country;
    this.date = date;
    this.lat = lat;
    this.lon = lon;
    this.temperature = temperature;
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
      temp: `${this.temperature}${symbols.celsius}`,
      icon: `${symbols.owfont} ${symbols.owfont}-${this.icon}-${this.dayOrNight} ${symbols.owfont}-5x`,
      description: this.description,
      wind: `${langWind[lang]}: ${this.wind}`,
      feels: `${langFeel[lang]}: ${this.feels}${symbols.celsius}`,
      humidity: `${langHum[lang]}: ${this.humidity}${symbols.percent}`,
      time: this.dayOrNight,
    };
  }

  getForecastWeather(lang) {
    return {
      day: getDay(this.date, lang),
      temp: `${this.temperature}${symbols.celsius}`,
      icon: `${symbols.owfont} ${symbols.owfont}-${this.icon} ${symbols.owfont}-3x`,
    };
  }
}
