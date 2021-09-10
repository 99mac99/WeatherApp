
const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=9bd6012af8b48f567338ede27622d9b9';
const units = '&units=metric'
let city ;
let url;


const getWeather = () => {
    city = (!input.value) ? 'New York' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
    .then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const status = Object.assign({}, ...res.data.weather)

        cityName.textContent = res.data.name;
        weather.textContent = status.main;
        temperature.textContent = Math.floor(temp) + 'C';
        humidity.textContent = hum + '%';
        warning.textContent = ''
        input.value = '';

        if( status.id > 200 && status.id < 300){
            photo.setAttribute('src', "./picApp/");
        }else if (status.id >= 300 && status.id < 400) {
            photo.setAttribute('src', "./picApp/drizzle.png");
        }else if (status.id >= 500 && status.id < 600) {
            photo.setAttribute('src', "./picApp/rain.png");
        }else if (status.id >= 600 && status.id < 700) {
            photo.setAttribute('src', "./picApp/ice.png");
        }else if (status.id >= 700 && status.id < 800) {
            photo.setAttribute('src', "./picApp/fog.png");
        }else if (status.id === 800){
            photo.setAttribute('src', './picApp/sun.png');
        }else if (status.id >= 800 && status.id < 900) {
            photo.setAttribute('src', "./picApp/cloud.png");
        }else {
            photo.setAttribute('src', './picApp/unknown.png');
        }

    })
    .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta.' )
}

const enterCheck = () => {
    if(event.keyCode === 13) {
        getWeather();
    }
};

getWeather();
btn.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck )