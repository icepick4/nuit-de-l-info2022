import { Entity } from './entity.js';

export class Ghost extends Entity {
    constructor(pos_x, pos_y, id, speed) {
        super(pos_x, pos_y);
        this.speed = speed;
        this.direction = -1;
        this.id = id;
        this.type = 'GHOST';
        this.defaultPos = [pos_x, pos_y];
        this.canMove = true;
    }

    die() {
        this.pos_x = this.defaultPos[0];
        this.pos_y = this.defaultPos[1];
        this.direction = -1;
        this.canMove = false;
        //die for 3 seconds
        setTimeout(() => {
            console.log('rivie');
            this.revive();
        }, 3000);
    }

    revive() {
        console.log('revive');
        this.canMove = true;
    }

    isAlive() {
        return this.canMove;
    }

    setGhostSpeed(speed) {
        this.speed = speed;
    }

    followPacman(pacman) {
        if (this.pos_x < pacman.pos_x) {
            this.direction = 1;
        } else if (this.pos_x > pacman.pos_x) {
            this.direction = 0;
        } else if (this.pos_y < pacman.pos_y) {
            this.direction = 3;
        } else if (this.pos_y > pacman.pos_y) {
            this.direction = 2;
        }
    }
}
