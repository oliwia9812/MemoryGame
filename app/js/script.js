const cardsImg = ['car', 'car', 'cloud', 'cloud', 'code', 'code', 'crown', 'crown', 'fly', 'fly', 'house', 'house', 'mug', 'mug', 'music', 'music'];
const easyLevelCardsImg = cardsImg.slice(0,8);
const normalLevelCardsImg = cardsImg.slice(0,12);
const hardLevelCardsImg = [...cardsImg];
const gameBoard = document.querySelector('.memory__board');
let level;


document.addEventListener('DOMContentLoaded', () => {
    setLevel();
})

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
}

const hideModal = () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('hide');
}

const createCards = (cardsData) => {
    cardsData.sort(() => Math.random() - 0.5);
    
    cardsData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('memory__card');
        card.setAttribute('id', item);
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('memory__card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('memory__card-front', level.toLowerCase()); 
        cardFront.style.backgroundImage = "url('app/img/question-icon.svg')";

        const cardBack = document.createElement('div')
        cardBack.classList.add('memory__card-back');
        cardBack.style.backgroundImage = `url('app/img/${item}.svg')`;

        cardInner.append(cardFront, cardBack);
        card.append(cardInner);
        gameBoard.append(card);

        card.addEventListener('click', () => {
            card.classList.toggle('toggle');
            checkCards(card);
        })
    })
}

const checkCards = (clickedCard) => {
    clickedCard.classList.add('clicked');
    const clickedCards = document.querySelectorAll('.clicked');
   
    if(clickedCards.length === 2) {
        if(clickedCards[0].getAttribute('id')===clickedCards[1].getAttribute('id')){
            clickedCards.forEach(card => {
                card.classList.remove('clicked'); 
                card.style.pointerEvents = 'none';
            })
        } else {
            clickedCards.forEach(card => {
               card.classList.remove('clicked');
               setTimeout(()=>{card.classList.remove('toggle')},1000)
               
           })
        }
    }
}



