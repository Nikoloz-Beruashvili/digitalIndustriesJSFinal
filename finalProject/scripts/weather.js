function getWeatherDescription(weatherCode) {
    switch (weatherCode) {
        case 0:
            return "Clear sky";
        case 1:
            return "Mainly Clear";
        case 2:
            return "Partly Cloudy";
        case 3:
            return "Overcast";
        case 45:
            return "Fog";
        case 48:
            return "Depositing rime fog";
        case 51:
            return "Light Drizzle";
        case 53:
            return "Moderate Drizzle";
        case 55:
            return "Dense Intensity Drizzle";
        case 56:
            return "Light Freezing Drizzle";
        case 57:
            return "Dense Intensity Freezing Drizzle";
        case 61:
            return "Slight Rain";
        case 63:
            return "Moderate Rain";
        case 65:
            return "Heavy Intensity Rain";
        case 66:
            return "Light Freezing Rain";
        case 67:
            return "Heavy Intensity Freezing Rain";
        case 71:
            return "Slight Snow Fall";
        case 73:
            return "Moderate Snow Fall";
        case 75:
            return "Heavy Intensity Snow Fall";
        case 77:
            return "Snow grains";
        case 80:
            return "Slight Rain Showers";
        case 81:
            return "Moderate Rain Showers";
        case 82:
            return "Violent Rain Showers";
        case 85:
            return "Slight Snow Showers";
        case 86:
            return "Heavy Snow Showers";
        case 95:
            return "Thunderstorm: Slight or moderate";
        case 96:
            return "Thunderstorm With Slight Hail";
        case 99:
            return "Thunderstorm With Heavy Hail";
        default:
            return "Unknown Weather Type";
    }
}

function weatherApp(cityName) {
    let result = document.getElementById("resultParis");

    fetch(`https://geocode.maps.co/search?q=${cityName}&api_key=661428db18e9f245220327tcqc5b864`, {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch city data.');
        }
        return response.json();
    })
    .then(data => {
        let latitude = data[0].lat;
        let longitude = data[0].lon; 

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`, {
            method: "GET"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data.');
            }
            return response.json();
        })
        .then(weatherInfo => {
            if (weatherInfo.current_weather && 
                typeof weatherInfo.current_weather.temperature !== 'undefined' &&
                typeof weatherInfo.current_weather.is_day !== 'undefined' &&
                typeof weatherInfo.current_weather.weathercode !== 'undefined' &&
                typeof weatherInfo.current_weather.windspeed !== 'undefined' &&
                typeof weatherInfo.current_weather.winddirection !== 'undefined') {
                
                let temperatureCelsius = weatherInfo.current_weather.temperature;
                let dayOrNight = weatherInfo.current_weather.is_day ? 'Day' : 'Night';
                let weatherCode = getWeatherDescription(weatherInfo.current_weather.weathercode);
                let windSpeed = weatherInfo.current_weather.windspeed;
                let windDirection = weatherInfo.current_weather.winddirection;

                result.innerText = `In ${cityName}:
                                    Temperature: ${temperatureCelsius}°C
                                    Day/Night: ${dayOrNight}
                                    Weather: ${weatherCode}
                                    Wind Speed: ${windSpeed} m/s
                                    Wind Direction: ${windDirection}°`;

            } else {
                result.textContent = "Weather information unavailable.";
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            result.textContent = "Failed to fetch weather data. Please try again later.";
        });
    })
    .catch(error => {
        console.error('Error fetching city data:', error);
        result.textContent = "Failed to fetch city data. Please try again later.";
    });
}