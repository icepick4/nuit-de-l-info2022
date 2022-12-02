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
export const pacmanCapoteImage = document.getElementById('pacmanCapote');
export const ghostImages = document.getElementById('mobs').children;

export const pacGumImage = document.getElementById('pacGum');
export const gameName = document.getElementById('gameName');
export const background = document.getElementById('background');
export const modal = document.getElementById('modal');
export const close = document.getElementById('close');
export const capotes = document.getElementsByClassName('capote');

export const UP = 38;
export const LEFT = 37;
export const DOWN = 40;
export const RIGHT = 39;
