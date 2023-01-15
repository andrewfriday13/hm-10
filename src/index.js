import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import debounce from 'lodash.debounce';
import notiflix from 'notiflix';

const input = document.getElementById('search-box')
const countryList = document.querySelector('.country-list')
const cardCountry = document.querySelector('.card-country')

const DEBOUNCE_DELAY = 300  

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY))

function searchCountry() {
  const nameCountry = input.value.trim()
  if (nameCountry === '') {
  countryList.innerHTML = "";
      
    return
  }
 
  fetchCountries(nameCountry)
    .then(getSuccess)
    .catch(removeCountry)
}

function getSuccess(data) {

   if (data.length > 10) {
    return notiflix.Notify.info('Дай більше букв')
   }
  
  createCards(data)
  
   if (data.length == 1) {
    return countryCard(data)
   }
}

function createCards(arr) {
  const make = arr.map(({ name, flags }) =>
   `    <li class="card-country" style="display: flex; align-items: center">
    <img src="${flags.svg}" alt="" width="50" height="30">
    <h2>${name.official}</h2>
  </li>
  `
  ).join('')
  countryList.innerHTML = make
  countryList.style.padding = "0" 
}

function countryCard(arr) {
  const make = arr.map(({ name, capital, population, flags, languages }) =>
   `    <li class="card-country" >
    <img src="${flags.svg}" alt="" width="50" height="30">
    <h2>${name.official}</h2>
     <h3>Столиця:${capital}<span></span></h3>
    <p>Населення: ${population}</p>  
    <p>Мови: ${Object.values(languages)}</p>
  </li>
  `
  ).join('')
  countryList.innerHTML = make
  countryList.style.padding = "0"
}

function removeCountry(){
  countryList.innerHTML = "";
  countryCard.innerHTML = ""
   notiflix.Notify.failure('не правильні букви')
}