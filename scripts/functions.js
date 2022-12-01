import { Ghost } from './classes/ghost.js';

export function decreasGhostsSpeed(ghosts, speed) {
    ghosts.forEach((ghost) => {
        ghost.setGhostSpeed(speed);
    });
}

export function increaseGhostsSpeed(ghosts, speed) {
    ghosts.forEach((ghost) => {
        ghost.setGhostSpeed(speed);
    });
}

export function getGhosts(ghostNumber, ghostSpeed) {
    let ghosts = [];

    for (let i = 0; i < ghostNumber; i++) {
        let ghost = new Ghost(canvas.width, canvas.hight, i, ghostSpeed);
        ghosts.push(ghost);
    }

    return ghosts;
}
