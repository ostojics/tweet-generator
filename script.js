
const quoteOption = document.querySelector('#opt-quote');
const factOption = document.querySelector('#opt-fact');
const jokeOption = document.querySelector('#opt-joke');
const contentText = document.querySelector('.text-quote');
const authorText = document.querySelector('.text-author');
const tweetBtn = document.querySelector('.btn-twitter');
const newBtn = document.querySelector('.btn-new');

// Get quote function
async function getQuote(){
    try {
        const proxyUrl = 'https://cryptic-forest-14329.herokuapp.com/'
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
        const response = await fetch(proxyUrl + apiUrl);
        const data =  await response.json();
        contentText.textContent = data.quoteText;
        if(data.quoteAuthor === ''){
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = data.quoteAuthor;
        }
        newBtn.textContent = 'New Quote';
    } catch (error) {
        getQuote();
        console.log('error', error);
    }
}

// Get facts function
async function getFacts(){
    try {
        const apiUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';
        const response = await fetch(apiUrl);
        const data = await response.json();
        contentText.textContent = data.text;
        authorText.textContent = '';
        newBtn.textContent = 'New Fact';
    } catch (error) {
        console.log('error',error);
    }
}

// Get joke function
async function getJoke(){
    try {
        const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist';
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if(data.type === 'single'){
            contentText.textContent = data.joke;
        } else {
            contentText.textContent = data.setup + ' ... ' + data.delivery;
        }
    } catch (error) {
        console.log('error',error);
    }
    
}

// On load 
getQuote();

// Event listeners

// Listen to click event on the button that requests new content, check which option is checked, than fetch data from corresponding API
newBtn.addEventListener('click',() => {
    let currentOption = document.querySelector('.btn-pressed');
    if(currentOption.textContent === 'Quote'){
        getQuote();
    } else if(currentOption.textContent === 'Random Fact'){
        getFacts();
    }
});

quoteOption.addEventListener('click', () => {
    quoteOption.classList.add('btn-pressed');
    factOption.classList.remove('btn-pressed');
    jokeOption.classList.remove('btn-pressed');
    getQuote();
});

factOption.addEventListener('click',() => {
    quoteOption.classList.remove('btn-pressed');
    factOption.classList.add('btn-pressed');
    jokeOption.classList.remove('btn-pressed');
    getFacts();
})