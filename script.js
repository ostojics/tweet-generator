
const quoteOption = document.querySelector('#opt-quote');
const factOption = document.querySelector('#opt-fact');
const jokeOption = document.querySelector('#opt-joke');
const contentText = document.querySelector('.text-quote');
const authorText = document.querySelector('.text-author');
const tweetBtn = document.querySelector('.btn-twitter');
const newBtn = document.querySelector('.btn-new');
const loader = document.querySelector('.loader');

// Show loader
const showLoader = () => {
   loader.hidden = false;
   contentText.hidden = true;
   authorText.hidden = true;
}
// Hide loader
const hideLoader = () => {
    loader.hidden = true;
    contentText.hidden = false;
   authorText.hidden = false;
}
// Function that handles all api requests and returns required content
async function getContent(proxy, api){
    try {
        showLoader();
        const proxyUrl = proxy;
        const apiUrl = api;
        const response = await fetch(proxyUrl + apiUrl);
        const data =  await response.json();
        // Handle quote requests
        if(api === 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'){
            contentText.textContent = data.quoteText;
            if(data.quoteAuthor === ''){
                authorText.textContent = 'Unknown';
            } else {
                authorText.textContent = `-${data.quoteAuthor}`;
            }
            if(data.quoteText.length > 120){
                contentText.classList.add('long-quote');
            }
            newBtn.textContent = 'New Quote';
        }
        // Handle fact requests
        if(api === 'https://uselessfacts.jsph.pl/random.json?language=en'){
            contentText.textContent = data.text;
            authorText.textContent = '';
            newBtn.textContent = 'New Fact';
            if(data.text.length > 280){
             getContent('','https://uselessfacts.jsph.pl/random.json?language=en');
            }
        }
        // Handle joke requests
        if(api === 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist'){
            authorText.textContent = '';
            newBtn.textContent = 'New Joke';
            if(data.type === 'single'){
            contentText.textContent = data.joke;
            } else {
            contentText.textContent = data.setup + ' ... ' + data.delivery;
            }
        }
        hideLoader();
    } catch (error) {
        if(api === 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'){
            getContent('https://cryptic-forest-14329.herokuapp.com/', 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
        }
    }
}

// Function that handles click events on the options
const handleOptionEvent = (event) => {
    event.target.classList.add('btn-pressed');
    // Get all buttons that have btn-pressed class, if one of the buttons is not the one that is clicked remove that class from it
    const pressedButtons = document.querySelectorAll('.btn-pressed');
    for(let button of pressedButtons){
        if(button !== event.target){
            button.classList.remove('btn-pressed');
        }
    }
    // Check which option is clicked, get content that corresponds with selected option
    if(event.target.id === 'opt-quote'){
        getContent('https://cryptic-forest-14329.herokuapp.com/', 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
    } else if(event.target.id === 'opt-fact'){
        getContent('', 'https://uselessfacts.jsph.pl/random.json?language=en');
    } else {
        getContent('', 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist');
    }
}
  


// On load 
getContent('https://cryptic-forest-14329.herokuapp.com/', 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');

// Event listeners

// Listen to click event on the button that requests new content, check which option is checked, than fetch data from corresponding API
newBtn.addEventListener('click',() => {
    let currentOption = document.querySelector('.btn-pressed');
    if(currentOption.textContent === 'Quote'){
        getContent('https://cryptic-forest-14329.herokuapp.com/', 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
    } else if(currentOption.textContent === 'Random Fact'){
        getContent('', 'https://uselessfacts.jsph.pl/random.json?language=en');
    } else if(currentOption.textContent === 'Joke'){
        getContent('', 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist');
    }
});

quoteOption.addEventListener('click', handleOptionEvent);
    


factOption.addEventListener('click', handleOptionEvent);
  

jokeOption.addEventListener('click', handleOptionEvent);
 
// Listen to click event on twitter button to tweet current content
tweetBtn.addEventListener('click',() => {
    const currentTextContent = contentText.textContent;
    const currentAuthorText = authorText.textContent;
    const twitterUrl = 'https://twitter.com/intent/tweet';
    window.open(`https://twitter.com/intent/tweet?text=${currentTextContent} ${currentAuthorText}`,'_blank');
})