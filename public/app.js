const searchForm = document.querySelector('#searchForm');
const routesContainer = document.querySelector('#routes');
const currencyInput = document.querySelector('#currencyInput');
const fromInput = document.querySelector('#fromInput');
const form = document.querySelector('form');

const fetchData = (url, cb) => {
    axios.get(url)
        .then((response) => {
            cb(null, response)
        })
        .catch((error) => {
            cb(error)
        })
};

const searchFlights = (event) => {
    if (event) event.preventDefault();
    if (currencyInput.value === '' || fromInput.value === '') {
        return;
    }
    const url = ('/search?currency=' + currencyInput.value + '&from=' + fromInput.value)
    fetchData(url, (err, res) => {
        currencyInput.value = '';
        fromInput.value = '';
        if (err || res.data.length === 0) {
            alert('No results found');
            console.log(err);
            return;
        }
        while (routesContainer.firstChild) {
            routesContainer.removeChild(routesContainer.firstChild);
        }
        res.data.forEach((element) => {
            routesContainer.innerHTML += element;
        })
        console.log(res.data);
    })
};

searchFlights();
form.addEventListener("submit", searchFlights);