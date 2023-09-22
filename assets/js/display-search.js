var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
    var searchParamsArr = document.location.search.split('=');
  console.log(searchParamsArr)
    var query = searchParamsArr[1]
  console.log(query)
    searchApi(query);
}

function printResults(resultObj) {
    console.log(resultObj);
  
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML = resultObj.weather;
    bodyContentEl.innerHTML =
      '<strong>Date:</strong> ' + resultObj.dt_txt + '<br/>';
  
    if (resultObj.main.temp) {
      bodyContentEl.innerHTML +=
        '<strong>Temp:</strong> ' + resultObj.main.temp + ' degrees K' + '<br/>';
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Temp:</strong> No subject for this entry.';
    }
  
    if (resultObj.main.humidity) {
      bodyContentEl.innerHTML +=
        '<strong>Humidity:</strong> ' + resultObj.main.humidity + '%' + '<br/>';
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Humidity:</strong>  No description for this entry.';
    }

    if (resultObj.wind.speed) {
      bodyContentEl.innerHTML +=
        '<strong>Wind Speed:</strong> ' + resultObj.wind.speed + 'MPH' + '<br/>';
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Wind Speed:</strong>  No description for this entry.';
    }
  
  
    resultBody.append(titleEl, bodyContentEl);
  
    resultContentEl.append(resultCard);
}

function searchApi(query) {
  var weatherQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=9408696d7801aca44a45676615e70a71`;

  console.log(weatherQueryUrl)
  
    fetch(weatherQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (weatherRes) {
        resultTextEl.textContent = query;
  
        console.log(weatherRes);
  
        if (!weatherRes.list.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < weatherRes.list.length; i++) {
            printResults(weatherRes.list[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal);
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
  getParams();