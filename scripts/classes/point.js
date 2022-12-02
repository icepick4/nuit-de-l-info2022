import { Entity } from './entity.js';

export class Point extends Entity {
    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
        this.type = 'POINT';
    }
}
