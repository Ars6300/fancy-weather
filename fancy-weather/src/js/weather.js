export default class Day {
  constructor(city, country, date, day, lat, lon, temp,
    icon, description, wind, feels, humidity, dayOrNight) {
    this.city = city;
    this.country = country;
    this.date = date;
    this.day = day;
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

  getTodayWeather() {
    return {
      city: this.city,
      country: this.country,
      date: this.date,
      lat: this.lat,
      lon: this.lon,
      temp: `${this.temp}&#176;`,
      icon: `owf owf-${this.icon}-${this.dayOrNight} owf-5x`,
      description: this.description,
      wind: this.wind,
      feels: `${this.feels}&#176;`,
      humidity: this.humidity,
      time: this.dayOrNight,
    };
  }

  getForecastWeather() {
    return {
      day: this.day,
      temp: `${this.temp}&#176;`,
      icon: `owf owf-${this.icon} owf-3x`,
    };
  }
}
