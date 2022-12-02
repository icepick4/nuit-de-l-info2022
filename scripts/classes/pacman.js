import { Entity } from './entity.js';

export class Pacman extends Entity {
    constructor(pos_x, pos_y, speed) {
        super(pos_x, pos_y);
        this.speed = speed;
        this.ghost = false;
        //image of the pacman (later)
        this.image = new Image();
        this.powerUp = false;
        this.type = 'PACMAN';
    }

    atePowerUp() {
        this.powerUp = true;
    }

    lostPowerUp() {
        this.powerUp = false;
    }

    isPoweredUp() {
        return this.powerUp;
    }
}
