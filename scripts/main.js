import {
    close,
    DOWN,
    gameName,
    infosButton,
    LEFT,
    modal,
    RIGHT,
    settingsButton,
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
    settingsButton.style.display = 'none';
    gameName.style.display = 'none';
    start();
});

settingsButton.addEventListener('click', () => {
    console.log('settings');
    toggleModal();
});

infosButton.addEventListener('click', () => {
    console.log('infos');
});

background.addEventListener('click', () => {
    toggleModal();
});
close.addEventListener('click', () => {
    toggleModal();
});

function toggleModal() {
    background.classList.toggle('show');
    modal.classList.toggle('show');
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

function start() {
    loadLevel(1).then(() => {
        board = new Board(walls, emptyCase);
        board.initLevel();
        pacman = new Pacman(pacmanPosition[0], pacmanPosition[1], pacmanSpeed);
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
        pacman.moveRight();
    }
    //check if pacman can move
    if (board.canMove(pacman)) {
        board.setCase(pacman);
        board.setCase(new Entity(last_x, last_y));
    } else {
        pacman.pos_x = last_x;
        pacman.pos_y = last_y;
    }
    //check if pacman eat a pacgum
    if (board.isPacGum(pacman)) {
        pacman.atePowerUp();
    }
    //check if pacman eat a point
    if (board.isPoint(pacman)) {
        score++;
        console.log(score);
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
        if (board.canMove(ghosts[i])) {
        } else {
            ghosts[i].pos_x = last_x;
            ghosts[i].pos_y = last_y;
        }
    }
}

function step() {
    setInterval(function () {
        update();
        board.drawBoardCanvas();
    }, 250);
}
