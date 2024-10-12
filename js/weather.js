
    const apiKey = "9880ab983641aea02500479fb7768c65";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkweather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            document.querySelector(".error").style.display = "none";
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            const weatherCondition = data.weather[0].main;
            const weatherIcons = {
                "Clouds": "/images/clouds.png",
                "Clear": "/images/clear.png",
                "Rain": "/images/rain.png",
                "Drizzle": "/images/drizzle.png",
                "Mist": "/images/mist.png"
            };

            weatherIcon.src = weatherIcons[weatherCondition] || "/images/default.png";
            
            document.querySelector(".weather").style.display = "block";
        }
    }

    searchBtn.addEventListener("click", () => {
        checkweather(searchBox.value);
    });

    checkweather("Nigeria");  // Default weather check