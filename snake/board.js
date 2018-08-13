/**
*  Class that manages the gameboard and it's attributes.
**/
class Board {
    // Constructor for initializing the board attributes
    constructor(tileSize) {
        this.leftBoundary = tileSize;
        this.rightBoundary = 34 * tileSize;
        this.upperBoundary = 3 * tileSize;
        this.lowerBoundary = 36 * tileSize;

        this.boardBorderLeft = this.leftBoundary - 5;
        this.boardBorderTop = this.upperBoundary - 5;
        this.boardBorderSize = 34*tileSize + 10;

        this.boardColor = "#D5464C";
        this.scoreColor = "#E4494F";
        this.instructionColor = "#7D7D7D";

        this.scoreFont = "20px Avenir";
        this.instructionFont = "16px Avenir";

        this.offset = 20;

        this.displayBoard(tileSize);
    }

    /**
    * Displays the board boundaries.
    **/
    displayBoard(tileSize) {
        ctx.strokeStyle = this.boardColor;
        ctx.lineWidth = 10;
        ctx.strokeRect(this.boardBorderLeft, this.boardBorderTop, this.boardBorderSize, this.boardBorderSize);

        ctx.lineWidth = 4;
    }

    /**
    * Displays and refreshes the score on top of the board.
    **/
    displayScore(score, tileSize) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.rightBoundary, this.upperBoundary);

        ctx.fillStyle = this.scoreColor;
        ctx.font = this.scoreFont;
        ctx.fillText("score : " + score, this.leftBoundary, this.leftBoundary);
    }

    /**
    * Displays instructions to start the game
    **/
    displayInstructions() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.rightBoundary/2, tileSize/2, this.rightBoundary/2, 3*tileSize);

        ctx.fillStyle = this.instructionColor;
        ctx.font = this.instructionFont;
        ctx.fillText("press arrow keys to start the game", this.rightBoundary/2 + this.offset, this.leftBoundary);
    }

    /**
    * Displays instructions to restart the game
    **/
    displayRestartPrompt() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.rightBoundary/2, 0, this.rightBoundary/2, this.upperBoundary);

        ctx.fillStyle = this.instructionColor;
        ctx.font = this.instructionFont;
        ctx.fillText("game over! hit escape to restart game",this.rightBoundary/2, this.leftBoundary);
    }
}
