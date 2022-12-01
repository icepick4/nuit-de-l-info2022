export class Entity {
    constructor(pos_x, pos_y) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.speed = 1;
        //-1 for no move, 0 for left, 1 for right, 2 for up, 3 for down
        this.direction = -1;
    }

    move_right() {
        this.pos_x += 1;
    }

    move_left() {
        this.pos_x -= 1;
    }

    move_up() {
        this.pos_y -= 1;
    }

    move_down() {
        this.pos_y += 1;
    }
}
