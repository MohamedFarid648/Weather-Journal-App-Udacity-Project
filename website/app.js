/* Global Variables */



// Personal API Key for OpenWeatherMap API
const apiKey = '&APPID=3794968e819429b52119daf3aeb37b53&units=imperial';
let countryCode = '';//Cairo,eg
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    countryCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Create a new date instance dynamically with JS
    const d = new Date();
    const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    if (countryCode) {
        getWeather(baseURL, countryCode, apiKey).then(res => {
            console.log(res);
            postData('http://localhost:8000/addData', { temperature: res?.main?.temp, date: newDate, userResponse: feelings }).then(res => {
                console.log(res);
                updateUI();
            });
        });
    } else {
        alert('Write your country code ,please');
    }

}
/* Function called by event listener */

/* Function to GET Web API Data*/

const getWeather = async (baseURL, code, key) => {

    const res = await fetch(baseURL + code + key)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
/* Function to POST data */

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}
/* Function to GET Project Data */

const updateUI = async () => {
    const request = await fetch('http://localhost:8000/getData');
    try {
      const recentData = await request.json();
     
      console.log(recentData);

      const recentDate = document.getElementById('date');
      const userResponse = document.getElementById('content');
      const recentTemp = document.getElementById('temp');

      recentDate.innerHTML = 'Date: <span class="result">' + recentData.date +'</span>';
      recentTemp.innerHTML = 'Temperature: <span class="result">' +recentData.temperature +'</span>';
      userResponse.innerHTML = 'How are you feeling today?<br><span class="result">'+recentData.userResponse +'</span>';

    } catch (error) {
      console.log("error", error);
    }
  }
  