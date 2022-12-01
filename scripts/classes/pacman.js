export class Pacman extends Entity {
    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
        this.speed = 1;
        this.direction = -1;
        this.ghost = false;
        //image of the pacman (later)
        this.image = new Image();
        this.powerUp = false;
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

    update() {
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
}
