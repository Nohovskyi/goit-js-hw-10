const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}
${name}?fields=${FILTER}`)
    .then(res => res.json())
}