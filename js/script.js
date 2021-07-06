let cardDeck = [];
const  cards = [
    {
        "card": "2",
        "value": 2,
    },
    {
         "card": "3",
         "value": 3,
     },
     {
         "card": "4",
         "value": 4,
     },
     {
         "card": "5",
         "value": 5,
     },
     {
         "card": "6",
         "value": 6,
     },
     {
         "card": "7",
         "value": 7,
     },
     {
         "card": "8",
         "value": 8,
     },
     {
         "card": "9",
         "value": 9,
     },
     {
         "card": "10",
         "value": 10,
     },
     {
         "card": "J",
         "value": 10,
     },
     {
         "card": "D",
         "value": 10,
     },
     {
         "card": "K",
         "value":10,
     },
     {
         "card": "T",
         "value": 11,
     },
]

 let cards1 = cards.map((e,i)=>{
     return {
         "card":e.card,
         "value":e.value,
         "img": 'images/heart.png'
     }
 });

 let cards2 = cards.map((e,i)=>{
     return {
         "card":e.card,
         "value":e.value,
         "img": 'images/diamond.png'
     }
 })

 let cards3 = cards.map((e,i)=>{
     return {
         "card":e.card,
         "value":e.value,
         "img": 'images/spade.png'
     }
 })

 let cards4 = cards.map((e,i)=>{
     return {
         "card":e.card,
         "value":e.value,
         "img": 'images/clubs.png'
     }
 })

 for(let i = 0; i< cards1.length; i++){
     cardDeck.push(cards1[i]);
     cardDeck.push(cards2[i]);
     cardDeck.push(cards3[i]);
     cardDeck.push(cards4[i]);

 }
//user elem
const containerUserCards = document.querySelector("#cards");
const userCardValue = document.querySelectorAll(".card-value");
const userCardImg = document.querySelectorAll(".user-img");
const userScorePlace = document.querySelector(".total-score");

const pushCardBtn = document.querySelector(".pushCardBtn");
const playAgainBtn = document.querySelector(".playAgain");
const notifyUser = document.querySelector(".alertUser");
const compareButton = document.querySelector(".compare");
// comp elem
const containerCompCards = document.querySelector("#containerCompCards");
const compCardValue = document.querySelectorAll(".compCard-value");
const compCardImg = document.querySelectorAll(".comp-img");
const compScorePlace = document.querySelector(".comp-total-score")

let chosenCards = [];
let chosenCardsComp = [];

// functions
function getTotalValue(selectedCards){
    let totalUser =  selectedCards.reduce((acc, curr)=>{
        return acc + curr.value;
    },0)
    return totalUser;
}
function shuffle(){
    return cardDeck.sort(() => Math.random() - 0.5);
}
shuffle()
function firstCards(playerCards, selectedCards, playerScorePlace, cardImgSrc){
    playerCards.forEach((e,i)=>{
        selectedCards.push(cardDeck.pop())
        e.innerHTML = selectedCards[i].card;
    })
    cardImgSrc.forEach((e,i)=>{
        e.attributes.src.nodeValue = selectedCards[i].img;
    })

    let playerTotalScore =  getTotalValue(selectedCards);
    playerScorePlace.innerHTML = playerTotalScore;
}

function addNewCard(template, containerToAppend, selectedCards, playerCards,playerCardImgSel, playerScorePlace){
    let temp = document.querySelector(template);
    let clone = temp.content.cloneNode(true);
    containerToAppend.appendChild(clone);
    selectedCards.push(cardDeck.pop());
    let cardsP = document.querySelectorAll(playerCards);
    cardsP[cardsP.length - 1].innerHTML = selectedCards[selectedCards.length - 1].card;
    let cardImgSrc = document.querySelectorAll(playerCardImgSel);
    cardImgSrc[cardImgSrc.length-1].attributes.src.nodeValue = selectedCards[selectedCards.length - 1].img;
    let playerTotalScore =  getTotalValue(selectedCards);
    playerScorePlace.innerHTML = playerTotalScore;

}
// start game
// user
function userFunction(){
    firstCards(userCardValue, chosenCards, userScorePlace, userCardImg);
    pushCardBtn.onclick = function(){
        addNewCard("#temp", containerUserCards, chosenCards, ".card-value", '.user-img',userScorePlace)
    }

}
userFunction()
// comp
function compFunction(){
    firstCards(compCardValue,chosenCardsComp,compScorePlace,compCardImg);

    compareButton.addEventListener("click", function(){
        compareButton.style.display = "none";
        const compCards = document.querySelectorAll('.comp-card');
        compCards.forEach(e=>e.style.display ="block")
        pushCardBtn.style.display = "none";
        compScorePlace.style.display = "block";
        playAgainBtn.style.display = "block";
        containerCompCards.style.display = "block";
        containerCompCards.style.display = "flex";
        if(getTotalValue(chosenCardsComp)<=14){
            addNewCard("#temp2", containerCompCards, chosenCardsComp, ".compCard-value", '.comp-img',compScorePlace)
        }
        function alertUser(){
            if(getTotalValue(chosenCards) > 21 ){
                notifyUser.innerHTML = "You have more than 21. You lost "
            } else if(getTotalValue(chosenCardsComp) > 21&& getTotalValue(chosenCards)<=21){
                notifyUser.innerHTML = "You win!!!! "
            }
            else if(getTotalValue(chosenCards)  <= 21 && getTotalValue(chosenCards) > getTotalValue(chosenCardsComp) ){
                notifyUser.innerHTML = "You win!!!! "
            } else if(getTotalValue(chosenCards)  <= 21 && getTotalValue(chosenCards) < getTotalValue(chosenCardsComp)){
                notifyUser.innerHTML = "You Lost!!!! "
            }
        }
        alertUser()
    })

}
compFunction()
//  play again
playAgainBtn.addEventListener("click", function(){
    const compCards = document.querySelectorAll(".comp-card");
    const userCards = document.querySelectorAll(".user-card");
    pushCardBtn.style.display = "block";
    compareButton.style.display = "block";
    containerCompCards.style.display = "none";
    compScorePlace.style.display = "none";

    notifyUser.innerHTML  = "";
    chosenCards.map((e,i)=>{
        cardDeck.push(e);
    })
    chosenCardsComp.map((e,i)=>{
        cardDeck.push(e);
    })
    shuffle()

    chosenCards = [];
    chosenCardsComp = [];
    userCards.forEach((e,i )=>{
        if(i > 1){
            e.remove();
        }
    })
    userFunction();

    compCards.forEach((e,i)=>{
        if(i > 1){
            e.remove();
        }
    })
    compFunction();

 })
