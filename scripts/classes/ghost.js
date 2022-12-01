import { Entity } from './entity.js';

export class Ghost extends Entity {
    constructor(pos_x, pos_y, id, speed) {
        super(pos_x, pos_y);
        this.speed = speed;
        this.direction = -1;
        this.id = id;
        this.ghost = true;
        //image of the ghost (later)
        this.image = new Image();
        this.type = 'GHOST';
    }

    dead() {
        this.pos_x = 0;
        this.pos_y = 0;
    }

    setGhostSpeed(speed) {
        this.speed = speed;
    }

    move() {
        switch (this.direction) {
            case 0:
                this.move_left();
                break;
            case 1:
                this.move_right();
                break;
            case 2:
                this.move_up();
                break;
            case 3:
                this.move_down();
                break;
        }
    }

    update() {
        //random direction
        this.direction = Math.floor(Math.random() * 4);
        this.move();
    }
}
