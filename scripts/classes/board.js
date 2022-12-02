import {
    canvas,
    caseWidth,
    context,
    ghostImage,
    pacGumImage,
    pacmanImage,
    wallImage
} from '../constants.js';

export class Board {
    constructor(walls, emptyCase) {
        this.walls = walls;
        this.emptyCase = emptyCase;
        this.board = new Array(21);
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(31);
        }
        this.initBoard();
        this.ghosts = [];
    }

    initBoard() {
        //parse the datas from the boardData
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (i == 0 || i == 20 || j == 0 || j == 30) {
                    this.board[i][j] = 'WALL';
                } else if (
                    (i == 8 && j >= 13 && j <= 17) ||
                    (i == 12 && j >= 13 && j <= 17)
                ) {
                    this.board[i][j] = 'WALL';
                } else if (
                    (j == 13 && i >= 8 && i <= 12) ||
                    (j == 17 && i >= 8 && i <= 12)
                ) {
                    this.board[i][j] = 'WALL';
                } else {
                    this.board[i][j] = 'POINT';
                }
                if (i == 8 && j == 15) {
                    this.board[i][j] = 'EMPTY';
                }
                if (i > 8 && i < 12 && j > 13 && j < 17) {
                    this.board[i][j] = 'EMPTY';
                }
            }
        }
    }

    initLevel() {
        //init the level with walls
        for (let i = 0; i < this.walls.length; i++) {
            let currentWall = this.walls[i];
            this.board[currentWall[1]][currentWall[0]] = 'WALL';
        }
        for (let i = 0; i < this.emptyCase.length; i++) {
            let currentCase = this.emptyCase[i];
            this.board[currentCase[1]][currentCase[0]] = 'EMPTY';
        }
    }

    clearBoard() {
        //clear the board
        this.board = [];
    }

    setCase(entity) {
        //set the case value
        //'PACMAN' OR 'GHOST' OR 'EMPTY' OR 'WALL' OR 'PAC_GUM'
        let pos_x = entity.pos_x;
        let pos_y = entity.pos_y;
        this.board[pos_y][pos_x] = entity.type;
    }

    drawBoardCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //draw the board
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 'WALL') {
                    context.drawImage(
                        wallImage,
                        j * caseWidth,
                        i * caseWidth,
                        caseWidth,
                        caseWidth
                    );
                } else if (this.board[i][j] == 'PACMAN') {
                    context.drawImage(
                        pacmanImage,
                        j * caseWidth,
                        i * caseWidth,
                        caseWidth,
                        caseWidth
                    );
                } else if (this.board[i][j] == 'PAC_GUM') {
                    context.drawImage(
                        pacGumImage,
                        j * caseWidth,
                        i * caseWidth,
                        caseWidth,
                        caseWidth
                    );
                } else if (this.board[i][j] == 'POINT') {
                    context.beginPath();
                    context.arc(
                        j * caseWidth + 15,
                        i * caseWidth + 15,
                        3.3,
                        0,
                        2 * Math.PI
                    );
                    context.fillStyle = '#CC6699';
                    context.fill();
                }
            }
        }
        for (let i = 0; i < this.ghosts.length; i++) {
            let currentGhost = this.ghosts[i];
            context.drawImage(
                ghostImage,
                currentGhost.pos_x * caseWidth,
                currentGhost.pos_y * caseWidth,
                caseWidth,
                caseWidth
            );
        }
    }

    canMove(entity) {
        //check if the entity can move
        let pos_x = entity.pos_x;
        let pos_y = entity.pos_y;
        if (entity.direction == 0) {
            pos_x -= 1;
        } else if (entity.direction == 1) {
            pos_x += 1;
        } else if (entity.direction == 2) {
            pos_y -= 1;
        } else if (entity.direction == 3) {
            pos_y += 1;
        }
        if (this.board[pos_y][pos_x] == 'WALL') {
            return false;
        } else {
            return true;
        }
    }

    isPacGum(entity) {
        //check if the entity is on a pac gum
        let pos_x = entity.pos_x;
        let pos_y = entity.pos_y;
        if (this.board[pos_y][pos_x] == 'PAC_GUM') {
            return true;
        } else {
            return false;
        }
    }

    isPoint(entity) {
        //check if the entity is on a point
        let pos_x = entity.pos_x;
        let pos_y = entity.pos_y;
        if (this.board[pos_y][pos_x] == 'POINT') {
            return true;
        } else {
            return false;
        }
    }

    resetBoareCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    checkWin() {
        let count = 0;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == 'POINT') {
                    count++;
                }
            }
        }
        if (count == 0) {
            return true;
        } else {
            return false;
        }
    }
}
