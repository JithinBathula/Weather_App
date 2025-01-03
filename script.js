const apikey = "Enter-Api-Key"

function getWeather() {
    const city = document.getElementById("place").value.trim()
    if (!city) {
        alert("Please enter a city.")
        return
    }    
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`
    fetch(weatherURL)
        .then(r => {
            if (!r.ok) throw new Error("Error fetching current weather.")
            return r.json()
        })
        .then(d => displayweather(d))
        .catch(() => {
            alert("Could not retrieve current weather. Check city name and try again.")
        })
    fetch(forecastURL)
        .then(r => {
            if (!r.ok) throw new Error("Error fetching forecast.")
            return r.json()
        })
        .then(d => displayforecast(d.list))
        .catch(() => {
            alert("Could not retrieve forecast. Check city name and try again.")
        })
}

function displayweather(d) {
    const tempdivinfo = document.getElementById("temp-div")
    const weatherdivinfo = document.getElementById("weather-div")
    const weathericonimg = document.getElementById("weather-icon")
    const cityName = d.name
    const temperature = Math.round(d.main.temp - 273.15)
    const description = d.weather[0].description
    const icon = `https://openweathermap.org/img/wn/${d.weather[0].icon}@4x.png`
    tempdivinfo.innerHTML = `${temperature}°C`
    weatherdivinfo.innerHTML = `${cityName} - ${description}`
    weathericonimg.src = icon
}

function displayforecast(data) {
    const hourlyforecastinfo = document.getElementById("hourly-forecast-div")
    hourlyforecastinfo.innerHTML = ""
    const next24hours = data.slice(0, 8)
    next24hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000)
        const hour = dateTime.getHours()
        const temperature = Math.round(item.main.temp - 273.15)
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`
        hourlyforecastinfo.innerHTML += `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${icon}">
                <span>${temperature}°C</span>
            </div>
        `
    })
}
