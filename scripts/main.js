import {
    capotes,
    close,
    creditButton,
    DOWN,
    gameName,
    infosButton,
    LEFT,
    leftDoor,
    modal,
    RIGHT,
    startButton,
    UP
} from './constants.js';

import { Board } from './classes/board.js';
import { Entity } from './classes/entity.js';
import { Pacman } from './classes/pacman.js';
import { getGhosts, getPacGums } from './functions.js';
startButton.addEventListener('click', () => {
    canvas.style.display = 'block';
    startButton.style.display = 'none';
    infosButton.style.display = 'none';
    creditButton.style.display = 'none';
    gameName.style.display = 'none';
    start(1);
});

creditButton.addEventListener('click', () => {
    console.log('settings');
    document.location.href = '/credits.html';
});

infosButton.addEventListener('click', () => {
    console.log('infos');
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
        modal.children[0].children[0].children[1].innerText =
            "Dis moi PacSida, qu'est ce que " + title;
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
let id = 1;
let currentQuestion;
let question;

async function loadLevel(id) {
    try {
        let response = await fetch('levels/' + id + '.json');

        if (response.ok) {
            let data = await response.json();
            walls = data.walls;
            emptyCase = data.emptyCase;
            pacmanSpeed = data.pacmanSpeed;
            pacmanPosition = data.pacmanPosition;
            pacGumPosition = data.pacGumPosition;
            ghostSpeed = data.ghostSpeed;
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
        if (!startPlaying) {
            startPlaying = true;
            step();
        }
        lastDirection = e.keyCode;
        keys[e.keyCode] = false;
    }
    if (e.keyCode == 13) {
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
    loadLevel(id).then(() => {
        pacman = new Pacman(pacmanPosition[0], pacmanPosition[1], pacmanSpeed);
        board = new Board(walls, emptyCase, pacman);
        board.initLevel();
        board.setCase(pacman);
        ghosts = getGhosts(ghostSpeed, ghostPosition);
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
}

function update() {
    let last_x = pacman.pos_x;
    let last_y = pacman.pos_y;
    //pacman can go in the opposite direction, if direction is the same as last direction then use it
    if (keys[UP] || lastDirection == UP) {
        pacman.moveUp();
    } else if (keys[LEFT] || lastDirection == LEFT) {
        pacman.moveLeft();
    } else if (keys[DOWN] || lastDirection == DOWN) {
        pacman.moveDown();
    } else if (keys[RIGHT] || lastDirection == RIGHT) {
        console.log('right');
        pacman.moveRight();
    }
    //check if pacman eat a pacgum
    if (board.isPacGum(pacman)) {
        pacman.atePowerUp();
        //pacman is poweredUp for 10 seconds
        setTimeout(() => {
            pacman.lostPowerUp();
        }, 100000);
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

            score += 100;
        } else {
            //game over
            return false;
        }
    }
    //check if pacman can move
    if (board.canMove(pacman)) {
        board.setCase(pacman);
        board.setCase(new Entity(last_x, last_y));
    } else {
        pacman.pos_x = last_x;
        pacman.pos_y = last_y;
    }
    //check if pacman eat a point
    if (board.isPoint(pacman)) {
        score++;
    }

    for (let i = 0; i < ghosts.length; i++) {
        last_x = ghosts[i].pos_x;
        last_y = ghosts[i].pos_y;
        let random = Math.floor(Math.random() * 4);
        if (random == 0) {
            ghosts[i].moveUp();
        } else if (random == 1) {
            ghosts[i].moveLeft();
        } else if (random == 2) {
            ghosts[i].moveDown();
        } else if (random == 3) {
            ghosts[i].moveRight();
        }
        //if ghost move into pacman
        if (board.isPacman(ghosts[i])) {
            if (pacman.isPoweredUp()) {
                //eat ghost
                ghosts[i].die();
                last_x = ghosts[i].pos_x;
                last_y = ghosts[i].pos_y;
                score += 100;
            } else {
                //game over
                return false;
            }
        }
        //check if ghost can move
        if (!board.canMove(ghosts[i]) || !ghosts[i].canMove) {
            ghosts[i].pos_x = last_x;
            ghosts[i].pos_y = last_y;
        }
    }

    if (board.checkWin()) {
        return true;
    }
    return 'continue';
}

function updateQuestion() {
    //detect pacman is in leftdoor or rightdoor or bottomdoor
    if (pacman.pos_x == leftDoor[0] && pacman.pos_y == leftDoor[1]) {
        if (question.idResponse == 1) {
            score += 100;
            return true;
        } else {
            return false;
        }
    }
    if (pacman.pos_x == rightDoor[0] && pacman.pos_y == rightDoor[1]) {
        if (question.idResponse == 2) {
            score += 100;
            return true;
        } else {
            return false;
        }
    }
    if (pacman.pos_x == bottomDoor[0] && pacman.pos_y == bottomDoor[1]) {
        if (question.idResponse == 3) {
            score += 100;
            return true;
        } else {
            return false;
        }
    }
}

function step() {
    interval = setInterval(function () {
        if (!inQuestion) {
            let status = update();
            if (status == false) {
                board.drawBoardCanvas();
                clearInterval(interval);
                openModal(board.getGhost(pacman));
                reset();
            } else if (status == true) {
                board.drawBoardCanvas();
                clearInterval(interval);
                startPlaying = false;
                initQuestion();
            }
        } else {
            let status = updateQuestion();
            if (status == false) {
                board.drawBoardCanvas();
                clearInterval(interval);
                openModal(board.getGhost(pacman));
                reset();
            } else {
                board.drawBoardCanvas();
                inQuestion = false;
                start(id++);
            }
        }
        board.drawBoardCanvas();
    }, 200);
}

function reset() {
    startPlaying = false;
    startButton.style.display = 'block';
    infosButton.style.display = 'block';
    creditButton.style.display = 'block';
    gameName.style.display = 'block';
    canvas.style.display = 'none';
    board = null;
    pacman = null;
    ghosts = [];
    clearInterval(interval);
}

function initQuestion() {
    board.initQuestionBoard();
    board.setCase(pacman);
    loadQuestion().then(() => {
        inQuestion = true;
        let modal = copyModale.cloneNode(true);
        modal.children[0].children[0].innerHTML = question.question;
        modal.children[0].children[1].children[0].innerHTML =
            question.responses[0];
        modal.children[0].children[1].children[1].innerHTML =
            question.responses[1];
        modal.children[0].children[1].children[2].innerHTML =
            question.responses[2];
        toggleModal();
    });
}
/*
//clique droit
document.onselectstart = new Function('return false');
document.oncontextmenu = new Function('return false');

//clique gauche
document.body.style.pointerEvents = 'none';
*/

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
};
