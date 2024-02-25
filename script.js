const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '763c810bdfmshb9f4669b80c3925p18d818jsn3db5be365864',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

let viz; // Declare viz variable at a higher scope

const updateMap = (city) => {
    const divElement = document.getElementById('viz1706386426707');
    const vizElement = divElement.getElementsByTagName('object')[0];

    // Assuming the Tableau sheet has a filter named 'cityName'
    vizElement.style.width = '100%';
    vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';

    // Initialize Tableau Viz
    const vizOptions = {
        hideTabs: true,
        hideToolbar: true,
    };

    // Create a new Tableau Viz
    viz = new tableau.Viz(vizElement, 'https://public.tableau.com/views/MapSatellite_17063862482930/Sheet2', vizOptions);

    // Wait for the Viz to fully load before applying the filter
    viz.addEventListener(tableau.TableauEventName.VIZ_LOAD, function () {
        // Update Tableau filter with the new city
        const sheet = viz.getWorkbook().getActiveSheet();
        sheet.applyFilterAsync('cityName', city, tableau.FilterUpdateType.REPLACE);
    });
};

const updateWeatherUI = (data, elementMappings) => {
    for (const [key, value] of Object.entries(elementMappings)) {
        const element = document.getElementById(value);
        if (element) {
            element.innerHTML = data[key];
        }
    }
};

const getWeather = (city) => {
    cityName.innerHTML = city
fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
    .then(response => response.json())
    .then((data) => {


        console.log(data)

        cloud_pct.innerHTML = data.cloud_pct
        temp.innerHTML = data.temp
        temp2.innerHTML = data.temp
        feels_like.innerHTML = data.feels_like
        humidity.innerHTML = data.humidity
        humidity2.innerHTML = data.humidity
        min_temp.innerHTML = data.min_temp
        max_temp.innerHTML = data.max_temp
        wind_speed.innerHTML = data.wind_speed
        wind_speed2.innerHTML = data.wind_speed
        wind_degrees.innerHTML = data.wind_degrees
        sunrise.innerHTML = data.sunrise
        sunset.innerHTML = data.sunset

    })
    .catch(err => console.error(err));
}
const getWeather1 = (pinCity_Mumbai) => {
    pinCity_Mumbai.innerHTML = pinCity_Mumbai;
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + pinCity_Mumbai, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data);

            cloud_Mumbai.innerHTML = data.cloud_pct;
            temp_Mumbai.innerHTML = data.temp;
            feelsLike_Mumbai.innerHTML = data.feels_like;
            humidity_Mumbai.innerHTML = data.humidity;
            minTemp_Mumbai.innerHTML = data.min_temp;
            maxTemp_Mumbai.innerHTML = data.max_temp;
            windSpeed_Mumbai.innerHTML = data.wind_speed;
            windDegrees_Mumbai.innerHTML = data.wind_degrees;
            sunrise_Mumbai.innerHTML = data.sunrise;
            sunset_Mumbai.innerHTML = data.sunset;
        })
        .catch(err => console.error(err));
       
}



getWeather1("Mumbai")

submit.addEventListener("click", (e)=>{
    getWeather(city.value)
})
// Usage example
getWeather("Nagpur");


document.getElementById('submit').addEventListener("click", (e) => {
    e.preventDefault();
    const selectedCity = city.value;
    getWeather(selectedCity);
});


var divElement = document.getElementById('viz1706383148890');
var vizElement = divElement.getElementsByTagName('object')[0];
vizElement.style.width = '100%';
vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';

var scriptElement = document.createElement('script');
scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
vizElement.parentNode.insertBefore(scriptElement, vizElement);

scriptElement.onload = function () {
  var viz = new tableau.Viz(vizElement);

  // Set a filter based on the search input value
  viz.addEventListener(tableau.TableauEventName.VIZ_READY, function () {
    var sheet = viz.getWorkbook().getActiveSheet();
    var searchInput = 'Mumbai';
     document.getElementById('mumbai').onchange(function(){
         console.log(this.value)
        searchInput = this.value;
     });
    
    var searchButton = document.getElementById('submit');

    searchButton.addEventListener('click', function (event) {
      event.preventDefault();
      var searchValue = searchInput.value.trim();
      if (searchValue !== '') {
        sheet.applyFilterAsync('Mumbai', searchValue, tableau.FilterUpdateType.cityName);
      }
    });
  });
};
