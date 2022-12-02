export class Entity {
    constructor(pos_x, pos_y) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.speed = 1;
        //-1 for no move, 0 for left, 1 for right, 2 for up, 3 for down
        this.direction = -1;
        this.type = 'EMPTY';
    }

    moveRight() {
        this.pos_x += 1;
    }

    moveLeft() {
        this.pos_x -= 1;
    }

    moveUp() {
        this.pos_y -= 1;
    }

    moveDown() {
        this.pos_y += 1;
    }
}
