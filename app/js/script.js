const board = document.querySelector('.memory__board');
const levelModal = document.querySelector('.modal');
const easyLevelCardsImg = ['code', 'code', 'house', 'house', 'mug', 'mug', 'music', 'music'];
const normalLevelCardsImg = ['code', 'code', 'crown', 'crown', 'fly', 'fly', 'house', 'house', 'mug', 'mug', 'music', 'music'];
const hardLevelCardsImg = ['car', 'car', 'cloud', 'cloud', 'code', 'code', 'crown', 'crown', 'fly', 'fly', 'house', 'house', 'mug', 'mug', 'music', 'music'];


const setLevel = () => {
    const levelButtons = document.querySelectorAll('.modal__button');
    levelButtons.forEach(button=>{
        button.addEventListener('click', (e) => {
            const buttonLabel = e.currentTarget.innerHTML;
          
            if (buttonLabel.toLowerCase() === 'easy') {
                displayLevel('easy', 8)
            } else if (buttonLabel.toLowerCase() === 'normal') {
                displayLevel('normal', 12)
            } else if ( buttonLabel.toLowerCase() === 'hard') {
                displayLevel('hard', 16)
            }
        });
    });
}

const displayLevel = (level, cardsNum) => {
    board.classList.add(level);
    clearBoard();
    createGameBoard(cardsNum);
    levelModal.classList.add('hide');
}

const clearBoard = () => {
    board.replaceChildren();
}

const createGameBoard = (lvl) => {
    const cards = [];
    const cardsBack = [];
    
    for (var i = 0; i < lvl; i++) {
        const card = document.createElement('div');
        const cardInner = document.createElement('div');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');

        card.classList.add('memory__card');
        cardInner.classList.add('memory__card-inner');
        cardFront.classList.add('memory__card-front');
        cardBack.classList.add('memory__card-back');
       
        cardFront.style.backgroundImage = "url('app/img/question-icon.svg')";
    
        cardInner.append(cardBack, cardFront);
        card.append(cardInner);
        cards.push(card);
        cardsBack.push(cardBack);
    }

    cards.forEach(card => { 
        board.append(card);

        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });
    addImageToCardBack(cardsBack, lvl);
}


const addImageToCardBack = (cards, cardsNum) => {
    let level;

    switch (cardsNum) {
        case 8: 
            level = easyLevelCardsImg;
            break;
        case 12: 
            level = normalLevelCardsImg;
            break;
        case 16: 
            level = hardLevelCardsImg;
            break;
        default:
            alert('Something went wrong. Please try again!')
    }

    let shuffledCards = level.sort((a,b) => 0.5 - Math.random());

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundImage = `url('app/img/${shuffledCards[i]}.svg')`;
    }
}


setLevel();
