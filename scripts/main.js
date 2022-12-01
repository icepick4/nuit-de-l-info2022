import {
    DOWN,
    infosButton,
    LEFT,
    RIGHT,
    settingsButton,
    startButton,
    UP
} from './constants.js';

import { Board } from './classes/board.js';
import { Pacman } from './classes/pacman.js';
import { getGhosts } from './functions.js';

startButton.addEventListener('click', () => {
    start();
});

settingsButton.addEventListener('click', () => {
    console.log('settings');
});

infosButton.addEventListener('click', () => {
    console.log('infos');
});

let walls;
let emptyCase;
let pacmanSpeed;
let ghostSpeed;
let ghostNumber;
let pacmanPosition;
let keys = [];

async function loadLevel(id) {
    try {
        let response = await fetch('levels/' + id + '.json');

        if (response.ok) {
            let data = await response.json();
            walls = data.walls;
            console.log(walls);
            emptyCase = data.emptyCase;
            pacmanSpeed = data.pacmanSpeed;
            pacmanPosition = data.pacmanPosition;
            console.log(pacmanPosition);
            ghostSpeed = data.ghostSpeed;
            ghostNumber = data.ghostNumber;
            console.log(ghostNumber);
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
        keys[e.keyCode] = false;
    }
}
document.addEventListener('keyup', updateKeyUp);

function updateKeyDown(e) {
    if (
        (e.keyCode == UP) |
        (e.keyCode == LEFT) |
        (e.keyCode == DOWN) |
        (e.keyCode == RIGHT)
    ) {
        keys[e.keyCode] = true;
    }
}
document.addEventListener('keydown', updateKeyDown);

function start() {
    loadLevel(1).then(() => {
        let board = new Board(walls, emptyCase);
        board.initLevel();
        board.setCase(pacman);
        const pacman = new Pacman(
            pacmanPosition[0],
            pacmanPosition[1],
            pacmanSpeed
        );
        const ghosts = getGhosts(ghostNumber, ghostSpeed);
        board.drawBoardCanvas();
    });
}

function update() {
    if (keys[UP]) {
        pacman.moveUp();
    }
    if (keys[LEFT]) {
        pacman.moveLeft();
    }
    if (keys[DOWN]) {
        pacman.moveDown();
    }
    if (keys[RIGHT]) {
        pacman.moveRight();
    }
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].move();
    }
}
