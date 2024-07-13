document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'dcfc9df0d3d8e3ed40b9c1b710c56a6a';
    const locationDiv = document.getElementById('location');
    const temperatureDiv = document.getElementById('temperature');
    const audioPlayer = document.getElementById('audioPlayer');

    function fetchWeatherData(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const city = data.name;
                const weatherCondition = data.weather[0].main.toLowerCase();

                locationDiv.innerHTML = `Location: ${city}`;
                temperatureDiv.innerHTML = `Current temperature: ${temperature}°C`;
                playMusicBasedOnWeather(weatherCondition);
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                temperatureDiv.innerHTML = 'Could not load temperature data';
            });
    }

    function playMusicBasedOnWeather(condition) {
        let musicUrl;

        switch (condition) {
            case 'clear':
                musicUrl = 'music/I-Wanna-Be-Yours.mp3.mp3'; // Music for sunny weather
                break;
            case 'clouds':
                musicUrl = 'music/Mann Mera.mp3'; // Music for cloudy weather
                break;
            case 'haze':
                musicUrl = 'music/mi-amor.mp3'; // Music for hazy weather
                break;
            case 'rain':
                musicUrl = 'music/hale-dil.mp3'; // Music for rainy weather
                break;
            case 'snow':
                musicUrl = 'music/closer.mp3'; // Music for winter weather
                break;
            case 'autumn':
                musicUrl = 'music/closer.mp3'; // Music for autumn weather
                break;
            default:
                musicUrl = 'music/Satranga.mp3'; // Default music for unknown conditions
        }

        audioPlayer.src = musicUrl;
        audioPlayer.play();
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(lat, lon);
        }, error => {
            console.error('Error getting location:', error);
            locationDiv.innerHTML = 'Could not detect location';
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        locationDiv.innerHTML = 'Geolocation is not supported by this browser.';
    }
});
