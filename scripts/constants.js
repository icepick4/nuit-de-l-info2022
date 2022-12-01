export const canvas = document.getElementById('canvas');
export const context = canvas.getContext('2d');

export const startButton = document.getElementById('start');

export const settingsButton = document.getElementById('settings');

export const infosButton = document.getElementById('infos');

export const caseWidth = 32;
export const caseHeight = 32;

const mobs = document.getElementsByClassName('mobs');
export const mobsImages = [];
for (let i = 0; i < mobs.length; i++) {
    mobsImages.push(mobs[i]);
}

export const wallImage = document.getElementById('wall');
export const emptyCaseImage = document.getElementById('emptyCase');
export const pacmanImage = document.getElementById('pacman');
export const ghostImage = document.getElementById('ghost');
