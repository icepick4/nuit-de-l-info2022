export const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth * 0.7;
export let caseWidth = canvas.width / 31;
canvas.height = caseWidth * 21;

export const context = canvas.getContext('2d');

export const startButton = document.getElementById('start');

export const creditButton = document.getElementById('credit');

export const infosButton = document.getElementById('infos');

export const scoreContent = document.getElementById('score');

export const footer = document.getElementById('footer');

export const wallImage = document.getElementById('wall');
export const emptyCaseImage = document.getElementById('emptyCase');
export const pacmanImage = document.getElementById('pacman');
export const pacmanCapoteImage = document.getElementById('pacmanCapote');

export const pacGumImage = document.getElementById('pacGum');
export const gameName = document.getElementById('gameName');
export const background = document.getElementById('background');
export var modal = document.getElementById('modal');
export let modalBody = document.getElementsByClassName('modal-body')[0];
export const close = document.getElementById('close');
export const capotes = document.getElementsByClassName('capote');

export const UP = 38;
export const LEFT = 37;
export const DOWN = 40;
export const RIGHT = 39;

export const leftDoor = [0, 10];
export const rightDoor = [30, 10];
export const bottomDoor = [15, 20];
