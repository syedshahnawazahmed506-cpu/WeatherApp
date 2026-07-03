// 1. Setup variables (These MUST be at the top)
const apiKey = "c7a63a1cee00832c618cd65e13ea3548";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");

// 2. Click Event Listener to trigger the search
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") return;
    getWeather(city);
});

// 3. The main function to fetch data and update the UI
async function getWeather(city) {
    try {
        const response = await fetch(apiURL + `q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        cityName.textContent = data.name + ", " + data.sys.country;
        temp.textContent = Math.round(data.main.temp) + "°C";
        desc.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = data.wind.speed + " km/h";
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Show the weather layout and hide the search box
        document.getElementById("weatherBox").style.display = "block";
        document.querySelector(".search-box").style.display = "none";

    } catch (error) {
        alert(error.message);
    }
}