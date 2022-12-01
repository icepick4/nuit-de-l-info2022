export class Board {
    constructor(walls, emptyCase) {
        this.walls = walls;
        this.emptyCase = emptyCase;
        this.board = [];
        this.initBoard();
    }

    initBoard() {
        //parse the datas from the boardData
        for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 31; j++) {
                if (i == 0 || i == 20 || j == 0 || j == 30) {
                    this.board[i][j] = 'WALL';
                } else {
                    this.board[i][j] = 'EMPTY';
                }
            }
        }
    }

    initLevel() {
        //init the level
    }

    clearBoard() {
        //clear the board
        this.board = [];
    }
}
