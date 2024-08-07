const { Router } = require("express");
const fetch = require("node-fetch");
const config = require("config");
const { configureStormglassData, configureOpenWeatherData, configureOpenWeatherDataAverage } = require("../helpers/configure");

const router = Router();

router.get("/", async (req, res) => {
  try {
    if (req.query.service === 'Stormglass') {
      const weatherFromDB = getDataFromDB(req.query)

      if (weatherFromDB) {
        res.status(200).json(configuredWeather)
        return
      }

      const fetchOptions = {
        headers: {
          Authorization:
            '58a31958-8e66-11ec-a301-0242ac130002-58a319d0-8e66-11ec-a301-0242ac130002',
        },
      }
  
      const url = `https://api.stormglass.io/v2/weather/point?lat=${req.query.lat}&lng=${req.query.lon}&params=airTemperature,cloudCover,precipitation,pressure,humidity,windSpeed`
      const data = await fetch(url, fetchOptions)
      const weather = await data.json()
  
      const configuredWeather = configureStormglassData(weather);

      calculateVeracity(req.query)
      addWeatherOnDB(configuredWeather, req.query.service)

      res.status(200).json(configuredWeather)
    } else  if(req.query.service === 'OpenWeather') {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=7fcca01bb2d54b79b55f79a21b62e010&lat=${req.query.lat}&lon=${req.query.lon}`
      const data = await fetch(url)
      
      const weekWeather = await data.json()

      const url2 = `https://api.weatherbit.io/v2.0/forecast/hourly?key=7fcca01bb2d54b79b55f79a21b62e010&lat=${req.query.lat}&lon=${req.query.lon}&hours=24`
      const data2 = await fetch(url2)
      // console.log(data2)
      const todayWeather = await data2.json()
  
      const configuredWeather = configureOpenWeatherData(weekWeather, `${req.query.lat} ${req.query.lon}`, todayWeather);
      res.status(200).json(configuredWeather)
    } else  if(req.query.service === 'average') {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=7fcca01bb2d54b79b55f79a21b62e010&lat=${req.query.lat}&lon=${req.query.lon}`
      const data = await fetch(url)
      // console.log(data)
      const weekWeather = await data.json()

      const url2 = `https://api.weatherbit.io/v2.0/forecast/hourly?key=7fcca01bb2d54b79b55f79a21b62e010&lat=${req.query.lat}&lon=${req.query.lon}&hours=24`
      const data2 = await fetch(url2)
      // console.log(data2)
      const todayWeather = await data2.json()
  
      const configuredWeather = configureOpenWeatherDataAverage(weekWeather, `${req.query.lat} ${req.query.lon}`, todayWeather);
      res.status(200).json(configuredWeather)
    } else {
      res.status(500).json({ message: "что-то пошло не так" });
    }
    
  } catch(e) {
    res.status(500).json({ message: "что-то пошло не так" });
    console.log(e);
  }
});

module.exports = router;
