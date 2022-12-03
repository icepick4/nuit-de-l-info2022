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

export function getGhosts(ghostPosition) {
    let ghosts = [];
    const mobs = document.getElementById('mobs').children;
    const mobsImages = [];
    let indexes = [];
    for (let i = 0; i < mobs.length; i++) {
        //random number between 0 and mobs.length
        const random = Math.floor(Math.random() * mobs.length);
        //add the random image to the array
        mobsImages.push(mobs[random]);
        indexes.push(random);
    }
    for (let i = 0; i < ghostPosition.length; i++) {
        let ghost = new Ghost(
            ghostPosition[i][0],
            ghostPosition[i][1],
            indexes[i],
            mobsImages[i]
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

export function audio(src, volume) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.play();
}
