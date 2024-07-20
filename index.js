const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const restartButton = document.querySelector('#restart');
const turnIndicator = document.querySelector('#current-symbol');
const spaces = Array(9).fill(null);
const tickCircle = 'O';
const tickX = 'X';

let currentSym = tickCircle;

const drawBoard = () => {
    boxes.forEach((box) => {
        box.addEventListener('click', boxClicked);
    });
};

const boxClicked = (e) => {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentSym;
        e.target.innerText = currentSym;

        if (playerWon()) {
            text.innerText = `${currentSym} has won`;
            strategy.innerText = `${strategy.innerText}`;
            disableBoxes();
            setTimeout(restart, 3000);
            return;
        } else if (playerDraw()) {
            text.innerText = `DRAW`;
            disableBoxes();
            setTimeout(restart, 3000);
            return;
        }

        currentSym = currentSym === tickCircle ? tickX : tickCircle;
        turnIndicator.innerText = currentSym;
    }
}

const playerWon = () => {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            strategy.innerText = `${currentSym} wins with ${getWinStrategy(condition)}`;
            highlightWinningCombination(condition);
            return true;
        }
    }
    return false;
}

const getWinStrategy = (condition) => {
    const strategies = {
        '0,1,2': 'top row',
        '3,4,5': 'middle row',
        '6,7,8': 'bottom row',
        '0,3,6': 'left column',
        '1,4,7': 'middle column',
        '2,5,8': 'right column',
        '0,4,8': 'diagonal from top-left',
        '2,4,6': 'diagonal from top-right'
    };
    return strategies[condition.toString()] || 'a winning combination';
}

const highlightWinningCombination = (condition) => {
    condition.forEach(index => {
        boxes[index].style.backgroundColor = 'rgba(215, 241, 113, 0.5)';
    });
}

const playerDraw = () => {
    return spaces.every(space => space !== null);
}

const disableBoxes = () => {
    boxes.forEach(box => box.style.pointerEvents = 'none');
}

const enableBoxes = () => {
    boxes.forEach(box => box.style.pointerEvents = 'auto');
}

const restart = () => {
    spaces.fill(null);
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });
    text.innerText = 'Play';
    strategy.innerText = '';
    currentSym = tickCircle;
    turnIndicator.innerText = currentSym;
    enableBoxes();
}

restartButton.addEventListener('click', restart);
drawBoard();