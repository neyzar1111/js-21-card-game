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

 let compTotalScore;
 let userTotalScore;
  const startBtn = document.querySelector(".startBtn");
 startBtn.addEventListener('click',function(){
     startBtn.style.display = "none"
     const containerUserCards = document.querySelector("#cards");
     const userCards = document.querySelectorAll(".user-card");
     const userScorePlace = document.querySelector(".total-score");
     const pushCardBtn = document.querySelector(".pushCardBtn");
     const playAgainBtn = document.querySelector(".playAgain");
     const containerCompCards = document.querySelector("#containerCompCards");
     const compCards = document.querySelectorAll('.comp-card');
     const compScorePlace = document.querySelector(".comp-total-score")

     let chosenCards = [];
     let userScore = [];
     let chosenCardsComp = [];
     let compScore = [];

     containerUserCards.style.display = "block";
     containerUserCards.style.display = "flex";

     const randomCards = ()=>Math.floor(Math.random() * cards.length);

     function firstCardsAndGetScore(playerscards, cardsChosen, playerScore){
         playerscards.forEach(e=>e.innerHTML = cards[randomCards()].card);
         for(let item of playerscards){
             cardsChosen.push(cards.find(card => card.card === item.innerHTML));
         }
         for(let i = 0; i < cardsChosen.length; i++){
             playerScore.push(cardsChosen[i].value);
         }
         let getTotalPlayerScore = ()=> playerScore.reduce((accumulator, element) => {
             return accumulator + element;
         }, 0);
         return getTotalPlayerScore();
     }
     const getTotalScore = (playerScore)=> playerScore.reduce((accumulator, element) => {
         return accumulator + element;
     }, 0);
     const setScoresOnScreen =(element, playersTotalScore)=>{
         element.innerHTML = playersTotalScore;
     }
     function addNewCard(template, container, playerCards, playerScore,playerTotalScore,placetoShow){
         let temp = document.querySelector(template);
         let clone = temp.content.cloneNode(true);
         container.appendChild(clone);
         const cardsP = document.querySelectorAll(playerCards);
         console.log(cardsP)
         const pushNewCard =()=>cardsP[cardsP.length -1].innerHTML = cards[randomCards()].card
         pushNewCard();
         let newCard = cardsP[cardsP.length -1];
         let newCardValue = (cards.find(card => card.card === newCard.innerHTML).value);
         playerScore.push(newCardValue);
         playerTotalScore = getTotalScore(playerScore);
         console.log(playerTotalScore)
         setScoresOnScreen(placetoShow,playerTotalScore);

     }

     // for user
    function userFunction(){
        userTotalScore = firstCardsAndGetScore(userCards,chosenCards,userScore);
        setScoresOnScreen(userScorePlace, userTotalScore);
        pushCardBtn.onclick = function(){
            addNewCard("#temp", containerUserCards, ".user-card", userScore,userTotalScore, userScorePlace);
        }
    }
     userFunction();
     // <<< for computer >>>
     function compFunction(){
         compTotalScore = firstCardsAndGetScore(compCards,chosenCardsComp,compScore);
         setScoresOnScreen(compScorePlace,compTotalScore);
         document.querySelector(".compare").addEventListener("click", function(){
             const compCards = document.querySelectorAll('.comp-card');
             compCards.forEach(e=>e.style.display ="block")
             pushCardBtn.style.display = "none";
             compScorePlace.style.display = "block";
             playAgainBtn.style.display = "block";
             containerCompCards.style.display = "block";
             containerCompCards.style.display = "flex";



         })
         let compCardsLength = document.querySelectorAll('.comp-card').length;
         if( compCardsLength === 2 && compTotalScore < 16){
             console.log(compCardsLength)
             console.log("length-3,<16")
             addNewCard("#temp2", containerCompCards, ".comp-card", compScore,compTotalScore,compScorePlace);
         }
     }
     compFunction();
     // function checkingT(){
     //     console.log(userCards);
     // }
     // checkingT()

     playAgainBtn.addEventListener("click", function(){
         pushCardBtn.style.display = "block";
         const compCards = document.querySelectorAll(".comp-card");
         containerCompCards.style.display = "none";
         compScorePlace.style.display = "none";
         // playAgainBt

         userTotalScore = 0;
        chosenCards = [];
        userScore = [];
        chosenCardsComp = [];
        compScore = [];
        let userCards = document.querySelectorAll(".user-card");
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
 })
