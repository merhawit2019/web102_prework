/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
console.log(gamesContainer)



// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i=0; i < games.length; i++ ) {
        
        // create a new div element, which will become the game card
        let div = document.createElement('div');     

        // add the class game-card to the list   
        div.classList.add('game-card')
          
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const desc = `
        <img class=game-img  src= ${games[i].img}>
        <h1>${games[i].name}</h1>
        <h3>${games[i].description}</h3>
        <h4>Backers:${games[i].backers}</h4>
        `
        div.innerHTML=desc;

        // append the game to the games-container
        gamesContainer.appendChild(div)
       
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalNumberOfContributions = GAMES_JSON.reduce((acc, game) => {
return acc + game.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalNumberOfContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmaountRaised = GAMES_JSON.reduce((acc, game) =>{
    return acc + game.pledged;

}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = '$' + totalAmaountRaised.toLocaleString();

// grab number of games card and set its inner HTML
let gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    let gamesLessThanAmountRaised = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesLessThanAmountRaised)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let gamesGreaterOrEqualThanAmountRaised = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesGreaterOrEqualThanAmountRaised)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly, true);
fundedBtn.addEventListener("click", filterFundedOnly, true);
allBtn.addEventListener("click", showAllGames, true);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let unfundedGamesList = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});

let unfundedGamesCount = unfundedGamesList.length;
// create a string that explains the number of unfunded games using the ternary operator

let checkingStrForArrayLength = GAMES_JSON.length > 1 ? "games" : "game";
let checkingunfundedGamesList = unfundedGamesList.length > 1 ? "games" : "game";

let displayStr = `A total of $${totalAmaountRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} ${checkingStrForArrayLength}. 
${unfundedGamesList ? `Currently, ${unfundedGamesList.length.toLocaleString()} ${checkingunfundedGamesList} remains unfunded. we need your help to fund these amazing games!` : ""} `

// create a new DOM element containing the template string and append it to the description container
let par = document.createElement('p'); 
par.innerHTML = displayStr;
descriptionContainer.appendChild(par)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
 console.log(sortedGames)
let [firstGame, secondGame, ... rest ] = sortedGames;

const { name, ... others } = firstGame;
let firstGameName = name;
function secondname(){
    let  { name, ... others } = secondGame;
    return name;
}

let secondGameName = secondname()
console.log(secondGameName)


// create a new element to hold the name of the top pledge game, then append it to the correct element
let h4 = document.createElement('h4');   
h4.innerHTML =firstGameName;
firstGameContainer.appendChild(h4)

// do the same for the runner up item

let h4_1 = document.createElement('h4');   
h4_1.innerHTML =secondGameName;
secondGameContainer.appendChild(h4_1)