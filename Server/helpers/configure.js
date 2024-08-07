const getWeatherType = (clouds, precipitation) => {
  if (precipitation > 0.5) {
    return 'rain'
  }

  if (clouds < 40) {
    return 'Clear Sky'
  } else if (clouds < 70) {
    return 'Few clouds'
  } else {
    return 'Scattered clouds'
  }
}

const configureStormglassData = data => {
  const dateAndTime = new Date
  const result = {
    todayWeather: {
      serviceId: '647c9dd9517c8d18f1f3ec1a',
      weatherByHours: [],
      otherWeather: {
        feelsLike: 0,
        pressure: 0,
        humidity: 0,
        windSpeed: 0,
        weatherType: 'clearSky'
      },
      dateAndTime,
      location: data.location
    },
    weekWeather: {
      serviceId: '647c9dd9517c8d18f1f3ec1a',
      dateAndTime,
      weatherByDays: [],
      location: data.location
    }
    
  }
  console.log(data)
  data.hours.slice(0, 24).forEach(hour => {
    const {
      airTemperature: { sg },
      pressure,
      humidity,
      windSpeed,
      cloudCover,
      precipitation,
      // time
    } = hour;

    result.todayWeather.weatherByHours.push({
      // time: new Date(time).getHours(),
      airTemperature: Math.round(sg),
      feelsLike: Math.round(sg),
      weatherType: getWeatherType(
        cloudCover.noaa,
        precipitation.noaa,
      ),
      pressure: pressure.sg * 0.750062,
      humidity: humidity.sg,
      windSpeed: windSpeed.sg,
    })
  })
  const currentHour = dateAndTime.getHours()

  result.todayWeather.otherWeather = result.todayWeather.weatherByHours[currentHour]

  for (let i = 24; i < 24 * 7; i += 24) {
    result.weekWeather.weatherByDays.push({
      name: new Date(data.hours[i].time)
        .toDateString()
        .slice(0, 3),
      airTemperature: Math.round(data.hours[i].airTemperature),
      weatherType: getWeatherType(
        data.hours[i].cloudCover.noaa,
        data.hours[i].precipitation.noaa,
      ),
    })
  }

  return result
}

function configureOpenWeatherData(data, location, today) {
  const dateAndTime = new Date(); // Set time to 00:00:00 to match requirement

  // Convert hourly weather to required format
  const weatherByHours = today.data.map(hour => ({
    airTemperature: hour.temp,
    weatherType: hour.weather.description,
    time: new Date(hour.timestamp_utc)
  }));

  // Collect other weather data required for 'todayWeather'
 const otherWeather = {
    feelsLike: data.data[0].temp,
    pressure: data.data[0].pres * 0.750062,
    humidity: data.data[0].rh,
    windSpeed: data.data[0].wind_spd * 3.6,
    weatherType: data.data[0].weather.description
  };

  // Prepare 'todayWeather' object
  const todayWeather = { 
    weatherByHours,
    otherWeather,
    dateAndTime,
    location
  };

   // Prepare 'weekWeather' object
  const weatherByDays = data.data.slice(0, 7).map(day => ({
    weatherType: day.weather.description,
    airTemperature: day.temp,
    date: new Date(day.valid_date),
    windSpeed: day.wind_spd
  }))
  const weekWeather = { dateAndTime, weatherByDays, location };

  // Combine the two objects into resulting
  const result = { todayWeather, weekWeather };

  return result;
}

function configureOpenWeatherDataAverage(data, location, today) {
  const dateAndTime = new Date(); // Set time to 00:00:00 to match requirement

  // Convert hourly weather to required format
  const weatherByHours = today.data.map(hour => ({
    airTemperature: Math.round(hour.temp) + 1,
    weatherType: hour.weather.description,
    time: new Date(hour.timestamp_utc)
  }));

  // Collect other weather data required for 'todayWeather'
 const otherWeather = {
    feelsLike: Math.round(data.data[0].temp),
    pressure: Math.round(data.data[0].pres * 0.750062 - 20),
    humidity: data.data[0].rh - 5,
    windSpeed: data.data[0].wind_spd * 3.6,
    weatherType: data.data[0].weather.description
  };

  // Prepare 'todayWeather' object
  const todayWeather = { 
    weatherByHours,
    otherWeather,
    dateAndTime,
    location
  };

   // Prepare 'weekWeather' object
  const weatherByDays = data.data.slice(0, 7).map(day => ({
    weatherType: day.weather.description,
    airTemperature: Math.round(day.temp) + 1,
    date: new Date(day.valid_date),
    windSpeed: day.wind_spd + 1
  }))
  const weekWeather = { dateAndTime, weatherByDays, location };

  // Combine the two objects into resulting
  const result = { todayWeather, weekWeather };

  return result;
}

module.exports = { configureStormglassData, configureOpenWeatherData, configureOpenWeatherDataAverage }
