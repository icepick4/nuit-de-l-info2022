import { infosButton, settingsButton, startButton } from './constants.js';

startButton.addEventListener('click', () => {
    console.log('start');
});

settingsButton.addEventListener('click', () => {
    console.log('settings');
});

infosButton.addEventListener('click', () => {
    console.log('infos');
});

async function loadLevel(id) {
    try {
        let response = await fetch('levels/' + id + '.json');

        if (response.ok) {
            let data = await response.json();

            walls = data.walls;
            emptyCase = data.emptyCase;
            pacmanSpeed = data.pacmanSpeed;
            ghostSpeed = data.ghostSpeed;
            ghosts = data.ghostNumber;
        } else {
            throw new Error('Response error.');
        }
    } catch (error) {
        console.log(error);
    }
}

function start() {
    loadLevel(1);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw walls
    for (let i = 0; i < walls.length; i++) {
        ctx.drawImage(wallImage, walls[i].x * 32, walls[i].y * 32);
    }

    //draw empty cases
    for (let i = 0; i < emptyCase.length; i++) {
        ctx.drawImage(emptyCaseImage, emptyCase[i].x * 32, emptyCase[i].y * 32);
    }

    //draw pacman
    ctx.drawImage(pacmanImage, pacman.pos_x * 32, pacman.pos_y * 32);

    //draw ghosts
    for (let i = 0; i < ghosts.length; i++) {
        ctx.drawImage(ghosts[i], ghosts[i].x * 32, ghosts[i].y * 32);
    }

    requestAnimationFrame(draw);
}
