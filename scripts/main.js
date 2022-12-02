import {
    capotes,
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
    start(1);
});

settingsButton.addEventListener('click', () => {
    console.log('settings');
    document.location.href="/credits.html"
});

infosButton.addEventListener('click', () => {
    console.log('infos');
    document.location.href = '/information.html';
});

background.addEventListener('click', () => {
    toggleModal();
});
close.addEventListener('click', () => {
    toggleModal();
});

let title;
let desc;

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
        console.log();
        modal.children[0].children[0].children[0].innerText =
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
let id = 1;

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
            console.log('start');
            step();
        }
        lastDirection = e.keyCode;
        keys[e.keyCode] = false;
    }
}
document.body.addEventListener('keyup', updateKeyUp);

function updateKeyDown(e) {
    console.log(e.keyCode);
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
        }, 20000);
    }
    //check if pacman eat a ghost
    if (board.isGhost(pacman)) {
        if (pacman.isPoweredUp()) {
            //eat ghost
            board.removeGhost(pacman);
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
        if (
            ghosts[i].pos_x == pacman.pos_x &&
            ghosts[i].pos_y == pacman.pos_y
        ) {
            if (pacman.isPoweredUp()) {
                //eat ghost
                board.removeGhost(ghosts[i]);
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

function step() {
    interval = setInterval(function () {
        console.log('step');
        let status = update();
        if (status == false) {
            board.drawBoardCanvas();
            clearInterval(interval);
            openModal(board.getGhost(pacman));
            alert('Game Over');
            reset();
        } else if (status == true) {
            board.drawBoardCanvas();
            clearInterval(interval);
            alert('You won');
            startPlaying = false;
            id++;
            start(id);
        }
        board.drawBoardCanvas();
    }, 200);
}

function reset() {
    startPlaying = false;
    startButton.style.display = 'block';
    infosButton.style.display = 'block';
    settingsButton.style.display = 'block';
    gameName.style.display = 'block';
    canvas.style.display = 'none';
    board = null;
    pacman = null;
    ghosts = [];
    clearInterval(interval);
}
