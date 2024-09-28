const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

const countryTxt = document.querySelector('.country-text');
const tempTxt = document.querySelector('.temp-text');
const conditionTxt = document.querySelector('.condition-txt');
const humudityValueTxt = document.querySelector('.humudity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

const apiKey = `fbc28ed22ac5819182ed40f9bf6285fa`;

searchBtn.addEventListener('click', () => {
	if (cityInput.value.trim() != '') {
		// console.log(cityInput.value);
		// * with func
		updateWeatherInfo(cityInput.value);
		cityInput.value = '';
		cityInput.blur();
		//!remove focus from the element.
	}
});

cityInput.addEventListener('keydown', (event) => {
	if (event.key == 'Enter' && cityInput.value.trim() != '') {
		// console.log(cityInput.value);
		// * with func
		updateWeatherInfo(cityInput.value);
		cityInput.value = '';
		cityInput.blur();
	}
});
async function getFetchData(endPoint, city) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
	const response = await fetch(apiUrl);

	return response.json();
}

async function updateWeatherInfo(city) {
	const weatherData = await getFetchData('weather', city);

	if (weatherData.cod != 200) {
		showDisplaySection(notFoundSection);
		return;
	}

	console.log(weatherData);

	const {
		name: country,
		main: { temp, humidity },
		weather: [{ id, main }],
		wind: { speed },
	} = weatherData;

	countryTxt.textContent = country;
	tempTxt.textContent = Math.round(temp) + '°C';
	conditionTxt.textContent = main;
	humudityValueTxt.textContent = humidity + '%';
	windValueTxt.textContent = speed + ' M/s';

	weatherSummaryImg.scroll = `assets/weather${getWeatherImgIcons(id)}`;
	showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
	[weatherInfoSection, searchCitySection, notFoundSection].forEach(
		(section) => (section.style.display = 'none')
	);
	section.style.display = 'flex';
}
