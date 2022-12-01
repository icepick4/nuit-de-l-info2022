import { Entity } from './entity.js';

export class PacGum extends Entity {
    constructor(pos_x, pos_y) {
        super(pos_x, pos_y);
        this.type = 'PAC_GUM';
    }
}
