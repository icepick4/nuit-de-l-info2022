import { Entity } from './entity.js';

export class Ghost extends Entity {
    constructor(pos_x, pos_y, id) {
        super(pos_x, pos_y);
        this.speed = 1;
        this.direction = -1;
        this.id = id;
        this.ghost = true;
        //image of the ghost (later)
        this.image = new Image();
    }

    dead() {
        this.pos_x = 0;
        this.pos_y = 0;
    }

    setGhostSpeed(speed) {
        this.speed = speed;
    }
}
