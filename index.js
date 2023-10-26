const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const restartButton = document.querySelector('#restart');
const spaces = [];
const tickCircle = 'O';
const tickX = 'X';

let currentSym = tickCircle;


const drawBoard = ()  => {
    boxes.forEach(
        (box, i) => {
            box.classList.add('grid-item');

            if (i < 3) {
                box.classList.add('border-bottom');
            }

            if (i % 3 === 0) {
                box.classList.add('border-right');
            }

            if (i % 3 === 2) {
                box.classList.add('border-left');
            }

            if (i > 5) {
                box.classList.add('border-top');
            }

            box.addEventListener('click', boxClicked);
        }
    );
};


const boxClicked = (a) => {
    const id = a.target.id;
    if ( !spaces[id] ) {
        spaces[id] = currentSym;
        a.target.innerText = currentSym;

        if (playerWon()) {
            text.innerText = `${currentSym} has won`;
            setTimeout(restart, 5000);
            return;
        }

        else if (playerDraw()) {
            text.innerText = `DRAW`;
            return;
        }

        currentSym = currentSym === tickCircle ? tickX : tickCircle;
    }
}


const playerWon = () => {
    if ( spaces[0] === currentSym ) {
        if ( spaces [1] === currentSym && spaces[2] === currentSym ) {
            strategy.innerText = `${currentSym} has captured the top row`;
            return true;
        }

        if ( spaces[3] === currentSym && spaces[6] === currentSym) {
            strategy.innerText = `${currentSym} has captured the left column`;
            return true;
        }

        if ( spaces[4] === currentSym && spaces[8] === currentSym) {
            strategy.innerText = `${currentSym} has captured the diagonal`;
            return true;
        }
    }
    if (spaces[8] === currentSym) {
        if (spaces[5] === currentSym && spaces[2] === currentSym) {
            strategy.innerText = `${currentSym} has captured the right column`;
            return true;
        }
        if (spaces[6] === currentSym && spaces[7] === currentSym) {
            strategy.innerText = `${currentSym} has captured the bottom row`;
            return true;
        }
    }
    if (spaces[4] === currentSym) {
        if (spaces[1] === currentSym && spaces[7] === currentSym) {
            strategy.innerText = `${currentSym} has captured the middle column`;
            return true;
        }
        if (spaces[3] === currentSym && spaces[5] === currentSym) {
            strategy.innerText = `${currentSym} has captured the middle row`;
            return true;
        }
        if (spaces[2] === currentSym && spaces[6] === currentSym) {
            strategy.innerText = `${currentSym} has captured the diagonal`;
            return true;
        }
    }
}

const playerDraw = () => {
    let draw = 0;
    spaces.forEach((space, i) => {
        if ( spaces[i] !== null) draw ++;
    });

    if (draw === 9) {
        text.innerText = `It's a Draw`;
        setTimeout(restart, 5000);
        return true;
    }

    return false;
}

const restart = () => {
    spaces.forEach((space, i) => {
        spaces[i] = null;
    });
    boxes.forEach((box) => {
        box.innerText = '';
    });
    text.innerText = 'Play';
    strategy.innerText = '';
}
restartButton.addEventListener('click', restart);
drawBoard();

