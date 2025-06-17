const apiKey = "d92f3759be61b20db6954d019da57d68";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=chicago&units=imperial";

async function checkWeather(){
    const response = await fetch(apiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data)
}

checkWeather();