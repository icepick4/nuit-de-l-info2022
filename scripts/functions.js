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
