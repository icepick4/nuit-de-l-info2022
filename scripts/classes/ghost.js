import { Entity } from './entity.js';

export class Ghost extends Entity {
    constructor(pos_x, pos_y, id, image) {
        super(pos_x, pos_y);
        this.direction = -1;
        this.id = id;
        this.type = 'GHOST';
        this.defaultPos = [pos_x, pos_y];
        this.canMove = true;
        this.image = image;
    }

    die() {
        this.pos_x = this.defaultPos[0];
        this.pos_y = this.defaultPos[1];
        this.direction = -1;
        this.canMove = false;
        //die for 3 seconds
        setTimeout(() => {
            this.revive();
        }, 4000);
    }

    revive() {
        this.canMove = true;
    }

    isAlive() {
        return this.canMove;
    }

    setGhostSpeed(speed) {
        this.speed = speed;
    }

    moveTo(pacman) {
        //move the ghost to the pacman
        let x = pacman.pos_x - this.pos_x;
        let y = pacman.pos_y - this.pos_y;
        if (x > 0) {
            this.direction = 1;
        } else if (x < 0) {
            this.direction = 0;
        } else if (y > 0) {
            this.direction = 3;
        } else if (y < 0) {
            this.direction = 2;
        }
    }
}
