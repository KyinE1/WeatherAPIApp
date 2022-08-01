let weather = {
	// From the openweather.org site, use your own API key for the value.
	'apiKey': '8db8cd24a76a50c361707a27c0a5f9bb',

	// Type into console 'weather.fetchWeather('Denver')' for testing.
	fetchWeather: function (city) {
		// Notice the assignment of 'q' and 'id'. Instead 
		// of using a fixed value, variables can change
		// the information dependent on the user city.
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=' 
			+ city              // Grab th city specified in search bar.
			+ '&units=metric&appid=' 
			+ this.apiKey       // Grab the apiKey of the user above.
		)
        
        // Check if the location exists or a connection could be made.
		.then((response) => {
            if (!response.ok) {
                alert('Location was not found.');
                throw new Error('Location was not found.');
            }

            return response.json();
        })
        
		.then((data) => this.displayWeather(data));
	},

	/** 
	 * Details on the object properties are found on 
	 * the openweather site (such as data members).
     * 
     * @param data: Object containing the weather information.
	 * */
	displayWeather: function(data) {
        // Debug 401 access error.
        console.log(data);
        console.log(data.response);

		// Extract name from the object (parameter).
		const {name} = data;
		const {icon, description} = data.weather[0];
		const {temp, humidity} = data.main;
		const {speed} = data.wind;

		console.log(name, icon, description, temp, humidity, speed);

		// Overwrite the data fields for each function call.
		document.querySelector('.city').innerText = 'Weather in ' + name;
		document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
		document.querySelector('.description').innerText = description;
		document.querySelector('.temp').innerText = temp + '°C';
		document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
		document.querySelector('.wind').innerText = 'Wind Speed: ' + speed + ' km/h';
        
        // Remove the loading card display once the information is present.
        document.querySelector('.weather').classList.remove('loading');

        // You can replace random with 1600x900.
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?" + name + "')";
    },

    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

// Enable events for clicking the search button or pressing enter. 
document
    .querySelector('.search button')
    .addEventListener('click', function () {
        weather.search();
});

document
    .querySelector('.search-bar')
    .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});

weather.fetchWeather('Springfield');