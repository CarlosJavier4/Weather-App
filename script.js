'use strict';

let dataAPI; // API's data JSON format

const input = document.querySelector('input'); // field where the data enters.
const search = document.querySelector('.fa-search'); // Button for search
const close = document.querySelector('.f-box--hidden'); // Button that will return to the state of the initial search.
const _window = document.querySelector('.collapse'); // container that collapses to show the rest of the content
const notFound = document.querySelector('.not__found'); // Section that will be shown only if Status is 'Not Found'
const details = document.querySelector('.weather__details'); // Climate details section that will be shown if it is 'Found'
const temp = document.querySelector('.weather__temp'); // Title containing the temperature.
const humedad = document.querySelector('.humedad'); // Climate humidity
const wind = document.querySelector('.wind'); // Wind Speed
const descriptionWeather = document.querySelector('.weather__status'); // Weather description for today.
/**************************************************************************** */

const collapse = () => {
    console.log('collapse');
    _window.style.height = _window.style.height == '350px' ? '75px' : '350px';
};

const changeImage = () => {
    let timeImg;

    const description = descriptionWeather.textContent.toLocaleLowerCase();

    if (description == 'clear sky') {
        timeImg = './public/clear-sky.svg';
    }
    if (description.includes('cloud')) {
        timeImg = './public/cloudy.svg';
    }
    if (description.includes('snow')) {
        timeImg = './public/snow.svg';
    }
    if (description.includes('rain')) {
        timeImg = './public/rain.svg';
    }

    document.querySelector('.timeImg').setAttribute('src', timeImg);
};

/*
    ! Don't touch those function
    * collapse() is a function that has the
    * Functionality to increase the _window 'height'
    * So let all the details of the search show
    *
    * changeImage() only change the image depending on the
    * Climate Description.
*/

/***************************************************************************** */

function fetchData(city) {
    const apiKey = 'f3710a25260ea999721cc65a9bef9f09'; // API's key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    /*
        ! apiKey It is the key to the API that only works for my user
        ! apiUrl It is the url to which we will make `fetch`
        * The URL is made up of 'City' -> the city to look for, 'apiKey'
    */

    const res = fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            dataAPI = data;
        })
        .catch((error) => console.error('2', error))
        .finally(() => {
            console.log('Success Fetch');

            if (dataAPI.cod != '404') {
                notFound.classList.add('hidden');
                details.classList.remove('hidden');

                const temperatureCelsius = `${(
                    dataAPI.main.temp - 273.15
                ).toFixed(1)}°C`;

                const description = dataAPI.weather[0].description;

                temp.textContent = temperatureCelsius;
                humedad.textContent += ` ${dataAPI.main.humidity}%`;
                wind.textContent += ` ${dataAPI.wind.speed}km/h`;
                descriptionWeather.textContent = description;
                changeImage();
            } else {
                notFound.classList.remove('hidden');
                details.classList.add('hidden');
            }

            collapse();
        });
}

search.addEventListener('click', () => {
    console.log('Searching...');
    if (input.value !== '') {
        fetchData(input.value);
        close.style.display = '';
        search.style.display = 'none';
    }
});

close.addEventListener('click', () => {
    close.style.display = 'none';
    search.style.display = '';
    input.value = '';

    collapse();

    if (!details.classList.contains('hidden')) {
        details.classList.add('hidden');
        notFound.classList.remove('hidden');
        humedad.textContent = 'Humidity:';
        wind.textContent = 'Wind Speed:';
    }
});
