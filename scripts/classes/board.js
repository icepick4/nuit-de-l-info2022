import {
    canvas,
    caseWidth,
    context,
    ghostImages,
    pacGumImage,
    pacmanCapoteImage,
    pacmanImage,
    wallImage
} from '../constants.js';

export class Board {
    constructor(walls, emptyCase, pacman) {
        this.walls = walls;
        this.emptyCase = emptyCase;
        this.board = new Array(21);
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(31);
        }
        this.initBoard();
        this.ghosts = [];
        this.pacman = pacman;
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
                    //point for pacman
                    this.board[i][j] = 'EMPTY';
                }
                if (i == 8 && j == 15) {
                    this.board[i][j] = 'EMPTY';
                }
                if (i > 8 && i < 12 && j > 13 && j < 17) {
                    this.board[i][j] = 'EMPTY';
                }
                //temporary walls
                if (i < 3 || i > 17 || j < 3 || j > 27) {
                    this.board[i][j] = 'WALL';
                }
                if (i == 5 && j == 5) {
                    this.board[i][j] = 'POINT';
                }
            }
        }
    }

    initQuestionBoard() {
        //init the board with questions
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (i == 0 || i == 20 || j == 0 || j == 30) {
                    this.board[i][j] = 'WALL';
                } else {
                    this.board[i][j] = 'EMPTY';
                }
            }
        }
        this.ghosts = [];
    }

    initLevel() {
        //init the level with walls
        for (let i = 0; i < this.walls.length; i++) {
            let currentWall = this.walls[i];
            console.log(currentWall);
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
                    if (this.pacman.isPoweredUp()) {
                        context.drawImage(
                            pacmanCapoteImage,
                            j * caseWidth,
                            i * caseWidth,
                            caseWidth,
                            caseWidth
                        );
                    } else {
                        context.drawImage(
                            pacmanImage,
                            j * caseWidth,
                            i * caseWidth,
                            caseWidth,
                            caseWidth
                        );
                    }
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
                ghostImages[currentGhost.id],
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
        try {
            if (this.board[pos_y][pos_x] == 'WALL') {
                return false;
            } else {
                return true;
            }
        } catch {
            return false;
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

    isGhost(entity) {
        //check if the entity is on a ghost
        let pos_x = entity.pos_x;
        let pos_y = entity.pos_y;
        for (let i = 0; i < this.ghosts.length; i++) {
            let currentGhost = this.ghosts[i];
            if (
                currentGhost.pos_x == pos_x &&
                currentGhost.pos_y == pos_y &&
                currentGhost.isAlive()
            ) {
                return true;
            }
        }
    }

    getGhost(entity) {
        //get the ghost on the entity position
        let pos_x = entity.pos_x;
        let pos_y = entity.pos_y;
        for (let i = 0; i < this.ghosts.length; i++) {
            let currentGhost = this.ghosts[i];
            if (
                currentGhost.pos_x == pos_x &&
                currentGhost.pos_y == pos_y &&
                currentGhost.isAlive()
            ) {
                return currentGhost.id;
            }
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

    isPacman(entity) {
        //check if the entity is on pacman
        let pos_x = entity.pos_x;
        let pos_y = entity.pos_y;
        if (this.pacman.pos_x == pos_x && this.pacman.pos_y == pos_y) {
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
