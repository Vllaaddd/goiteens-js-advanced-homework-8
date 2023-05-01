import { debounce } from 'lodash';

const searchInput = document.querySelector('.searchInput');
const countriesList = document.querySelector('.countriesList');
const countryContainer = document.querySelector('.countryContainer');
const countryName = document.querySelector('.countryName');

searchInput.addEventListener('input', debounce( e => {
    
    let query = searchInput.value;

    countriesList.innerHTML = '';
    countryContainer.innerHTML = '';
    countryName.textContent = '';
    
    fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then(res => res.json())
        .then(countries => {
            if(countries.length > 1){
                for(let i = 0; i <= 10 && i < countries.length; i++){
                    const countryItem = document.createElement('li');
                    countryItem.textContent = countries[i].name.common;
                    countryItem.classList.add('countryItem');
    
                    countriesList.append(countryItem);
                }
            }else{
                countriesList.innerHTML = '';

                countryName.textContent = countries[0].name.common

                const countryInfo = document.createElement('div');
                countryInfo.classList.add('countryInfo')

                const countryFlag = document.createElement('div');
                countryFlag.classList.add('countryFlag')

                const countryCapital = document.createElement('h3');
                countryCapital.classList.add('countryCapital')
                countryCapital.textContent = 'Capital: ' + countries[0].capital[0];

                const countryPopulation = document.createElement('h3');
                countryPopulation.classList.add('countryPopulation')
                countryPopulation.textContent = 'Population: ' + countries[0].population;

                const languagesTitle = document.createElement('h3')
                languagesTitle.classList.add('languagesP')
                languagesTitle.textContent = 'Languages: '

                const countryLanguagesList = document.createElement('ul')
                countryLanguagesList.classList.add('countryLanguagesList')
                const languagesArr = Object.values(countries[0].languages);

                for(let i = 0; i < languagesArr.length; i++){
                    const countryLanguageItem = document.createElement('li');
                    countryLanguageItem.classList.add('countryLanguageItem')
                    countryLanguageItem.textContent = languagesArr[i]

                    countryLanguagesList.append(countryLanguageItem)
                }

                const countryFlagImg = document.createElement('img');
                countryFlagImg.classList.add('coutryFlagImg')
                countryFlagImg.src = countries[0].flags.png;

                countryFlag.append(countryFlagImg)

                countryInfo.append(countryCapital, countryPopulation, languagesTitle, countryLanguagesList)

                countryContainer.append(countryInfo, countryFlag)
            }
        })

}, 300))