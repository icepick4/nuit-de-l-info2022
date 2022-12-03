import { audio } from '../functions.js';
import { Entity } from './entity.js';
export class Ghost extends Entity {
    constructor(pos_x, pos_y, id, image) {
        super(pos_x, pos_y);
        this.id = id;
        this.type = 'GHOST';
        this.defaultPos = [pos_x, pos_y];
        this.canMove = true;
        this.image = image;
    }

    die() {
        this.pos_x = this.defaultPos[0];
        this.pos_y = this.defaultPos[1];
        if (this.canMove) {
            audio('../assets/sounds/eatGhost.wav', 0.4);
        }
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
}
