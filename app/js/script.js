const cardsImg = ['car', 'car', 'cloud', 'cloud', 'code', 'code', 'crown', 'crown', 'fly', 'fly', 'house', 'house', 'mug', 'mug', 'music', 'music'];
const easyLevelCardsImg = cardsImg.slice(0,8);
const normalLevelCardsImg = cardsImg.slice(0,12);
const hardLevelCardsImg = [...cardsImg];
const gameBoard = document.querySelector('.memory__board');
const modal = document.querySelector('.modal');
const cards = [];
let clickedCount = 1;
let level;
let imagesToDisplay;


document.addEventListener('DOMContentLoaded', () => {
    setLevel();
});

const setLevel = () => {
    const levelButtons = document.querySelectorAll('.modal__button');

    levelButtons.forEach(button=>{
        button.addEventListener('click', (e) => {
            level = e.currentTarget.innerHTML;
            createBoard(level);
            hideModal();
        });
    });
}


const createBoard = (gameLevel) => {
    const restartButton = document.querySelector('.memory__restart-button');
    const memoryWrapper = document.querySelector('.memory__wrapper');

    switch (gameLevel.toLowerCase()) {
         case 'easy':
            createCards(easyLevelCardsImg)
            break;
        case 'normal':
            createCards(normalLevelCardsImg)
            break;    
        case 'hard':
            createCards(hardLevelCardsImg)
            break; 
        default:
            console.log('Something went wrong. Please try again!')
            break;
    }
    
    gameBoard.classList.add(gameLevel.toLowerCase());
    memoryWrapper.style.display = 'flex';

    restartButton.addEventListener('click', () => {
        resetBoard();
    });
}

const hideModal = () => {
    modal.classList.add('hide');
}

const createCards = (cardsData) => {
    imagesToDisplay = cardsData;
    
    cardsData.forEach(() => {
        const card = document.createElement('div');
        card.classList.add('memory__card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('memory__card-inner');

        card.append(cardInner);
        gameBoard.append(card);
        cards.push(card);
    });


    setCardFront();
    setCardBack();

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            startTimer();
            card.classList.toggle('toggle');
            checkCards(card, cardsData.length);
            clickedCount++;
        })
    })
}

const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}


const setCardFront = () => {
    const cardsInner = document.querySelectorAll('.memory__card-inner'); 
    
    cardsInner.forEach((cardInner) => {
        const cardFront = document.createElement('div');
        cardFront.classList.add('memory__card-front', level.toLowerCase()); 
        cardFront.style.backgroundImage = "url('app/img/question-icon.svg')";

        cardInner.append(cardFront);
    });
}


const setCardBack = () => {
    const cardsInner = document.querySelectorAll('.memory__card-inner'); 
    
    cardsInner.forEach((cardInner) => {   
        const cardBack = document.createElement('div')
        cardBack.classList.add('memory__card-back');
        cardInner.append(cardBack);
    });

    setBackImage();
}


const setBackImage = () => {
    const cardsBack = document.querySelectorAll('.memory__card-back');
    shuffleCards(imagesToDisplay);
    
    for (let i = 0; i < cardsBack.length; i++) {
        const parentEl = cardsBack[i].parentElement.parentElement;
        cardsBack[i].style.backgroundImage = `url('app/img/${imagesToDisplay[i]}.svg')`;
        parentEl.setAttribute('id', imagesToDisplay[i]);
    }
}


const checkCards = (clickedCard, numCards) => {
    clickedCard.classList.add('clicked');
    
    console.log(clickedCount);
    const clickedCards = document.querySelectorAll('.clicked');
    const toggledCards = document.querySelectorAll('.toggle');
    const firstCard = clickedCards[0];
    const secondCard = clickedCards[1];
    
    if (clickedCards.length === 2) {
         if (firstCard.getAttribute('id')===secondCard.getAttribute('id')){
            clickedCards.forEach(card => {
                card.classList.remove('clicked'); 
                card.style.pointerEvents = 'none';
            });
            clickedCount = 0;
        } else {
            clickedCards.forEach(card => {
               card.classList.remove('clicked');
               setTimeout(()=>{card.classList.remove('toggle')}, 1000);
           });
           clickedCount = 0;
        }
    } 

    // Prevent double click on one card
    if (clickedCard === firstCard && clickedCount === 2 ){
       clickedCard.classList.remove('clicked');
       clickedCount = 0;
    }

    if (toggledCards.length === numCards) {
      setTimeout(() => {
          restartGame();
      }, 1000);
    }
}


const restartGame = () => {
    window.location = window.location;
    resetTimer();
}


const resetBoard = () => {
    const toggledCards = document.querySelectorAll('.toggle');
    toggledCards.forEach(card => {
        card.classList.remove('clicked');
        card.classList.remove('toggle');
        card.style.pointerEvents = 'auto';
    });
   
    setTimeout(() => {
        setBackImage();
    }, 1000);

    resetTimer();
}


// Timer 
const timer = document.querySelector('.memory__timer');
let [seconds, minutes] = [0,0];
let idInt = null;
let executed = false;

const startTimer = () => {
    if(!executed) {
        idInt = setInterval(displayTimer,1000);
    } 
    executed = true; 
}

const resetTimer = () => {
    executed = false;
    clearInterval(idInt);
    timer.innerHTML = '00:00';
    [seconds, minutes] = [0,0];
}

const displayTimer = () => {
    seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
    }
  
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;

 timer.innerHTML = `${m} : ${s}`;
}

