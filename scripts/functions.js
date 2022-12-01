import { Ghost } from './classes/ghost.js';
import { PacGum } from './classes/pacGum.js';
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

export function getGhosts(ghostSpeed, ghostPosition) {
    let ghosts = [];
    for (let i = 0; i < ghostPosition.length; i++) {
        let ghost = new Ghost(
            ghostPosition[i][0],
            ghostPosition[i][1],
            i,
            ghostSpeed
        );
        ghosts.push(ghost);
    }
    return ghosts;
}

export function getPacGums(pacGumPosition) {
    let pacGums = [];
    for (let i = 0; i < pacGumPosition.length; i++) {
        let pacGum = new PacGum(pacGumPosition[i][0], pacGumPosition[i][1]);
        pacGums.push(pacGum);
    }
    return pacGums;
}
