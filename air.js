let baseurl = 'https://api.openaq.org/v1/measurements?page=1&parameter%5B%5D=pm25&limit=1&date_from=2019-06-18T22:12:28.781Z&date_to=2019-06-19T12:12:28.781Z&location=';

const submit = document.querySelector('button');
let chosenLocation = document.getElementById('chosenLocation');
let div = document.querySelector('div.data');

submit.addEventListener('click', pullInfo);

function pullInfo(a) {
    console.log(a);
    let location = chosenLocation.value;
    url = baseurl+location;
    console.log(url);
    
    fetch(url)
    .then(function(result) {
        return result.json();
    })
    .then(function(json) {
        displayResults(json);
    })
    
} 

function displayResults(json) {
    let info = document.createElement('h2');
    let warning = document.createElement('h4');
    let reading = json.results[0].value;

    info.textContent =  reading ;

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    if (reading <=100) {
        info.appendChild(warning);
        div.style.backgroundColor='green'
        warning.textContent = 'The pm25 readings seem to be low in this area. You are free to resume your daily activities without the worry of breathing in too many particles that could be potentially harmful.'
    } else if (reading <= 300 && reading > 100) {
        info.appendChild(warning);
        div.style.backgroundColor='orange'
        warning.textContent = 'There is a decent amount of particles in this area. People that are older or have pre-existing conditions have the biggest risk. In general, it is still recommended to not to participate in outdoor activities for an extended period of time.'
    } else if (reading > 300) {
        info.appendChild(warning);
        div.style.backgroundColor='red'
        warning.textContent = 'You have reached the Danger Zone.  It is time to stay inside and avoid all outdoor activities.  The particles level are abnormally concernly high.'
    }

    div.appendChild(info);
    info.appendChild(warning);

}