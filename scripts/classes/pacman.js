import { Entity } from './entity.js';

export class Pacman extends Entity {
    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
        this.ghost = false;
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
