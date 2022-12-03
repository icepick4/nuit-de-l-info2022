import { Board } from './classes/board.js';
import { Entity } from './classes/entity.js';
import { Pacman } from './classes/pacman.js';
import {
    bottomDoor,
    capotes,
    close,
    creditButton,
    DOWN,
    footer,
    gameName,
    infosButton,
    LEFT,
    leftDoor,
    modal,
    modalBody,
    RIGHT,
    rightDoor,
    scoreContent,
    startButton,
    UP
} from './constants.js';
import { getGhosts, getPacGums } from './functions.js';
let id;
startButton.addEventListener('click', () => {
    canvas.style.display = 'block';
    startButton.style.display = 'none';
    infosButton.style.display = 'none';
    creditButton.style.display = 'none';
    gameName.style.display = 'none';
    id = Math.floor(Math.random() * 3) + 1;
    inGameMenu = false;
    start(id);
});

creditButton.addEventListener('click', () => {
    document.location.href = '/credits.html';
});

infosButton.addEventListener('click', () => {
    document.location.href = '/informations.html';
});

background.addEventListener('click', () => {
    toggleModal();
});
close.addEventListener('click', () => {
    toggleModal();
});

let title;
let desc;
let copyModale = modal.cloneNode(true);

function toggleModal() {
    background.classList.toggle('show');
    modal.classList.toggle('show');
    for (let index = 0; index < capotes.length; index++) {
        const element = capotes[index];
        element.classList.toggle('active');
    }
}

async function loadInfo(id) {
    try {
        let response = await fetch('data/mst.json');
        if (response.ok) {
            let data = await response.json();
            title = data.data[id].name;
            desc = data.data[id].description;
        } else {
            throw new Error('Response error.');
        }
    } catch (error) {
        console.log(error);
    }
}

function openModal(id) {
    loadInfo(id).then(() => {
        modal.children[0].children[0].children[0].innerText =
            'Tu as été contaminé par ' +
            title +
            "... mais dis moi PacSida, qu'est ce que " +
            title +
            ' ?';
        modal.children[0].children[1].children[0].innerHTML = desc;
        toggleModal();
    });
}

let walls;
let emptyCase;
let pacmanSpeed;
let ghostSpeed;
let ghostPosition;
let pacmanPosition;
let pacGumPosition;
let pacman;
let board;
let keys = [];
let ghosts = [];
let startPlaying = false;
let lastDirection = null;
let score;
let interval;
let inQuestion = false;
let currentQuestion;
let question;
let inGameMenu = false;
export let caseWidth = canvas.width / 31;

async function loadLevel(id) {
    try {
        let response = await fetch('levels/' + id + '.json');

        if (response.ok) {
            let data = await response.json();
            walls = data.walls;
            emptyCase = data.emptyCase;
            pacmanPosition = data.pacmanPosition;
            pacGumPosition = data.pacGumPosition;
            ghostPosition = data.ghostPosition;
        } else {
            throw new Error('Response error.');
        }
    } catch (error) {
        console.log(error);
    }
}

async function loadQuestion() {
    try {
        let response = await fetch('../data/question.json');

        if (response.ok) {
            let data = await response.json();
            question = data.questions[Math.floor(Math.random() * 10)];
        } else {
            throw new Error('Response error.');
        }
    } catch (error) {
        console.log(error);
    }
}

function updateKeyUp(e) {
    if (
        (e.keyCode == UP) |
        (e.keyCode == LEFT) |
        (e.keyCode == DOWN) |
        (e.keyCode == RIGHT)
    ) {
        if (!startPlaying && !inGameMenu) {
            console.log('start');
            startPlaying = true;
            step();
        } else {
            if (e.keyCode == UP) {
                //focus modalBody and scroll in it
                modalBody.focus();
                modalBody.scrollTop -= 25;
            }
            if (e.keyCode == DOWN) {
                //scroll down
                modalBody.scrollTop += 25;
            }
        }
        lastDirection = e.keyCode;
        keys[e.keyCode] = false;
    }
    if (e.keyCode == 13 && inGameMenu) {
        if (background.classList.contains('show')) {
            toggleModal();
        }
    }
}
document.body.addEventListener('keyup', updateKeyUp);

function updateKeyDown(e) {
    if (
        (e.keyCode == UP) |
        (e.keyCode == LEFT) |
        (e.keyCode == DOWN) |
        (e.keyCode == RIGHT)
    ) {
        if (startPlaying) {
            keys[e.keyCode] = true;
        }
    }
}
document.body.addEventListener('keydown', updateKeyDown);

function start(id) {
    footer.style.display = 'none';
    loadLevel(id).then(() => {
        pacman = new Pacman(pacmanPosition[0], pacmanPosition[1], pacmanSpeed);
        board = new Board(walls, emptyCase, pacman);
        board.initLevel();
        board.setCase(pacman);

        ghosts = getGhosts(ghostPosition);
        for (let i = 0; i < ghosts.length; i++) {
            board.ghosts.push(ghosts[i]);
        }
        const pacGums = getPacGums(pacGumPosition);
        for (let i = 0; i < pacGumPosition.length; i++) {
            board.setCase(pacGums[i]);
        }
        board.drawBoardCanvas();
    });
    score = 0;
    scoreContent.style.display = 'block';
}

function update() {
    console.log('update');
    let last_x = pacman.pos_x;
    let last_y = pacman.pos_y;
    if ((keys[UP] || lastDirection == UP) && board.canMove(pacman, UP)) {
        pacman.moveUp();
    } else if (
        (keys[LEFT] || lastDirection == LEFT) &&
        board.canMove(pacman, LEFT)
    ) {
        pacman.moveLeft();
    } else if (
        (keys[DOWN] || lastDirection == DOWN) &&
        board.canMove(pacman, DOWN)
    ) {
        pacman.moveDown();
    } else if (
        (keys[RIGHT] || lastDirection == RIGHT) &&
        board.canMove(pacman, RIGHT)
    ) {
        pacman.moveRight();
    }
    //check if pacman eat a point
    if (board.isPoint(pacman)) {
        score += 20;
    }
    //check if pacman eat a pacgum
    if (board.isPacGum(pacman)) {
        pacman.atePowerUp();
        //pacman is poweredUp for 10 seconds
        setTimeout(() => {
            pacman.lostPowerUp();
        }, 10000);
    }
    //check if pacman eat a ghost
    if (board.isGhost(pacman)) {
        if (pacman.isPoweredUp()) {
            //eat ghost
            for (let i = 0; i < ghosts.length; i++) {
                if (
                    ghosts[i].pos_x == pacman.pos_x &&
                    ghosts[i].pos_y == pacman.pos_y
                ) {
                    ghosts[i].die();
                }
            }
            score += 200;
        } else {
            //game over
            return false;
        }
    }
    //set new position
    board.setCase(new Entity(last_x, last_y));
    board.setCase(pacman);

    for (let i = 0; i < ghosts.length; i++) {
        last_x = ghosts[i].pos_x;
        last_y = ghosts[i].pos_y;
        let random = Math.floor(Math.random() * 4);
        let ghostMove = false;
        while (!ghostMove && ghosts[i].canMove) {
            random = Math.floor(Math.random() * 4);
            if (random == 0 && board.canMove(ghosts[i], UP)) {
                ghosts[i].moveUp();
                ghostMove = true;
            } else if (random == 1 && board.canMove(ghosts[i], LEFT)) {
                ghosts[i].moveLeft();
                ghostMove = true;
            } else if (random == 2 && board.canMove(ghosts[i], DOWN)) {
                ghosts[i].moveDown();
                ghostMove = true;
            } else if (random == 3 && board.canMove(ghosts[i], RIGHT)) {
                ghosts[i].moveRight();
                ghostMove = true;
            }
        }
        if (ghosts[i].pos_x != last_x || ghosts[i].pos_y != last_y) {
            board.setCase(ghosts[i]);
            board.setCase(new Entity(last_x, last_y));
        }

        //if ghost move into pacman
        if (board.isPacman(ghosts[i])) {
            if (pacman.isPoweredUp()) {
                //eat ghost
                ghosts[i].die();
                last_x = ghosts[i].pos_x;
                last_y = ghosts[i].pos_y;
            } else {
                //game over
                return false;
            }
        }
    }

    if (board.checkWin()) {
        return true;
    }
    return 'continue';
}

function updateQuestion() {
    let last_x = pacman.pos_x;
    let last_y = pacman.pos_y;
    if (keys[UP] || lastDirection == UP) {
        if (board.canMove(pacman, UP)) {
            pacman.moveUp();
        }
    } else if (keys[LEFT] || lastDirection == LEFT) {
        if (board.canMove(pacman, LEFT)) {
            pacman.moveLeft();
        }
    } else if (keys[DOWN] || lastDirection == DOWN) {
        if (board.canMove(pacman, DOWN)) {
            pacman.moveDown();
        }
    } else if (keys[RIGHT] || lastDirection == RIGHT) {
        if (board.canMove(pacman, RIGHT)) {
            pacman.moveRight();
        }
    }
    //detect pacman is in leftdoor or rightdoor or bottomdoor
    if (pacman.pos_x == leftDoor[0] && pacman.pos_y == leftDoor[1]) {
        if (question.idResponse == 0) {
            score += 100;
            return true;
        } else {
            return false;
        }
    }
    if (pacman.pos_x == rightDoor[0] && pacman.pos_y == rightDoor[1]) {
        if (question.idResponse == 1) {
            score += 100;
            return true;
        } else {
            return false;
        }
    }
    if (pacman.pos_x == bottomDoor[0] && pacman.pos_y == bottomDoor[1]) {
        if (question.idResponse == 2) {
            score += 100;
            return true;
        } else {
            return false;
        }
    }
    board.setCase(new Entity(last_x, last_y));
    board.setCase(pacman);
    return 'continue';
}

function step() {
    interval = setInterval(function () {
        if (!inQuestion) {
            let status = update();
            if (status == false) {
                board.drawBoardCanvas();
                clearInterval(interval);
                reset();
                openModal(board.getGhost(pacman));
            } else if (status == true) {
                board.drawBoardCanvas();
                console.log('initQuestion');
                initQuestion();
            }
        } else {
            let status = updateQuestion();
            if (background.classList.contains('show')) {
                toggleModal();
            }
            if (status == false) {
                board.drawBoardCanvas();
                clearInterval(interval);
                modal.children[0].children[0].children[0].innerText = 'Perdu';
                console.log(question);
                modal.children[0].children[1].children[0].innerHTML =
                    '<p> ' + question.response + '</p>';
                reset();
                toggleModal();
            } else if (status == true) {
                inQuestion = false;
                board.drawBoardCanvas();
                clearInterval(interval);
                startPlaying = false;
                id++;
                if (id > 3) {
                    id = 1;
                }
                start(id);
            }
        }
        board.drawBoardCanvas();
        scoreContent.innerHTML = 'Score : ' + score;
    }, 200);
}

function reset() {
    startPlaying = false;
    startButton.style.display = 'block';
    infosButton.style.display = 'block';
    creditButton.style.display = 'block';
    gameName.style.display = 'block';
    footer.style.display = 'flex';
    canvas.style.display = 'none';
    inQuestion = false;
    inGameMenu = true;
    scoreContent.style.display = 'none';
    score = 0;
    lastDirection = null;
    scoreContent.innerHTML = 'Score : ' + score;
}

function initQuestion() {
    board.initQuestionBoard();

    pacman.pos_x = 15;
    pacman.pos_y = 15;
    board.setCase(pacman);
    loadQuestion().then(() => {
        inQuestion = true;
        modal.children[0].children[0].children[0].innerText = question.question;
        modal.children[0].children[1].children[0].innerHTML =
            '<p> Gauche : ' +
            question.responses[0] +
            '</p>' +
            '<p> Droite : ' +
            question.responses[1] +
            '</p>' +
            '<p> Bas : ' +
            question.responses[2] +
            '</p>';
        toggleModal();
    });
    clearInterval(interval);
    startPlaying = false;
}

onkeyup = (e) => {
    if (e.shiftKey && e.key === 'J') {
        startButton.click();
    }

    if (e.shiftKey && e.key === 'C') {
        creditButton.click();
    }

    if (e.shiftKey && e.key === 'I') {
        infosButton.click();
    }

    if (e.shiftKey && e.key === 'X') {
        close.click();
    }
};

document.onselectstart = new Function('return false');
document.oncontextmenu = new Function('return false');
document.body.style.pointerEvents = 'none';

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.7;
    caseWidth = canvas.width / 31;
    canvas.height = caseWidth * 21;
    board.drawBoardCanvas();
});
