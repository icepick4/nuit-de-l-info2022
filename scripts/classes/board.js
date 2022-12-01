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
        console.log(this.board);
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
                    this.board[i][j] = 'EMPTY';
                }
                if (i == 8 && j == 15) {
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
        console.log(entity.type);
        console.log(pos_x, pos_y);
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
                } else if (this.board[i][j] == 'GHOST') {
                    context.drawImage(
                        ghostImage,
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
                }
            }
        }
    }

    resetBoareCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}
