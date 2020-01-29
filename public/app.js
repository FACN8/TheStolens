const searchForm = document.querySelector('#searchForm');
const routesContainer = document.querySelector('#routes');
const toInput = document.querySelector("input[type='text' name='toInput']");
const fromInput = document.querySelector("input[type='text' name='fromInput']");
const form = document.querySelector('form')
const axios = require('axios');

const fetchData = (url, cb) => {
    axios.get(url)
        .then((response) => {
            cb(null, response)
        })
        .catch((error) => {
            cb(error)
        })
        .finally(() => {
            console.log('request to back-end')
        })
};



















form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (toInput.value === '' || fromInput.value === '') {
        return;
    }
    const url = ('http://localhost:9000/search?to=' + toInput.value + '&from=' + fromInput.value)
    fetchData(url, (err, res) => {
        if (err) {
            //No Results Found
            return;
        }
        //Show user suggestions

    })
})