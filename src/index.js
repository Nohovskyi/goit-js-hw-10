import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let MAX_COUNTRIES = 10;

const refs = {
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  inputCountry: document.querySelector('input#search-box'),
};

refs.inputCountry.addEventListener(
  'input',
  debounce(searchCountry, DEBOUNCE_DELAY)
);

function searchCountry(e) {
  const nameOfSearchCountry = e.target.value.trim();
  console.log(nameOfSearchCountry);

  if (nameOfSearchCountry === '') {
    return (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }
  fetchCountries(nameOfSearchCountry).then(renderMarkUpCard).catch(onError);
}

function renderMarkUpCard(countries) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  if (countries.length === 1) {
    refs.countryInfo.innerHTML = createMarkUpInfo(countries);
  } else if (countries.length >= MAX_COUNTRIES) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    refs.countryList.innerHTML = createMarkUpList(countries);
  }
}

function createMarkUpInfo(countries) {
  const markUpInfo = countries
    .map(country => {
      return `<div class = "coutry-info-main">
    <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" height = 60, wigth = 100>
    <h1>${country.name.official}</h1>
</div>
<ul>
    <li><b>Capital:</b> ${country.capital}</li>
    <li><b>Population:</b> ${country.population}</li>
    <li><b>Languages:</b> ${Object.values(country.languages)}</li>
</ul>`;
    })
    .join('');
  return markUpInfo;
}

function createMarkUpList(countries) {
  const markUpList = countries
    .map(country => {
      return `<li class = "coutry-list-main">
    <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" height = 40, wigth = 80>
    <h2>${country.name.official}</h2>
</li>`;
    })
    .join('');
  return markUpList;
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
