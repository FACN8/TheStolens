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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (currencyInput.value === '' || fromInput.value === '') {
        return;
    }
    const url = ('http://localhost:8080/search?currency=' + currencyInput.value + '&from=' + fromInput.value)
    fetchData(url, (err, res) => {
        if (err) {
            //No Results Found
            console.log(err)
            return;
        }
        //Show user suggestions
        res.data.forEach((element) => {
            routesContainer.innerHTML += element;
        })
        console.log(res.data);
    })
})