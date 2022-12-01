import { infosButton, settingsButton, startButton } from './constants.js';

import { Board } from './classes/board.js';

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

async function loadLevel(id) {
    try {
        let response = await fetch('levels/' + id + '.json');

        if (response.ok) {
            let data = await response.json();
            walls = data.walls;
            console.log(walls);
            emptyCase = data.emptyCase;
            pacmanSpeed = data.pacmanSpeed;
            ghostSpeed = data.ghostSpeed;
            ghostNumber = data.ghostNumber;
        } else {
            throw new Error('Response error.');
        }
    } catch (error) {
        console.log(error);
    }
}

function start() {
    loadLevel(1).then(() => {
        let board = new Board(walls, emptyCase);
        board.initLevel();
        board.drawBoardCanvas();
    });
}
