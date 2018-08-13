/**
* Class for managing the snake and it's attributes.
**/
class Snake {
    // constructor for initializing the snake attributes
    constructor(tileSize) {
        this.snakeTiles = []; // snake body

        this.direction; // snake's direction
        this.score = 0;
        this.tileSize = tileSize; // tilesize
        this.newHead;
        this.board; // gameboard object

        this.initializeSnakePosition();
    }

    /**
    * Initializes the snake body and the gameboard.
    **/
    initializeSnakePosition() {
        this.snakeTiles[0] = {
            x : 9 * tileSize,
            y : 10 * tileSize
        };

        this.board = new Board(this.tileSize);
        this.board.displayScore(this.score, this.tileSize);
        this.board.displayInstructions();
    }

    /**
    * Updates the snake position by a tile upon movement.
    **/
    updateSnake() {
        let snakeX = this.snakeTiles[0].x;
        let snakeY = this.snakeTiles[0].y;

        if( this.direction == "LEFT" ) {
            snakeX -= this.tileSize;
        } else if( this.direction == "UP" ) {
            snakeY -= this.tileSize;
        } else if( this.direction == "RIGHT" ) {
            snakeX += this.tileSize;
        } else if( this.direction == "DOWN" ) {
            snakeY += this.tileSize;
        }

        this.newHead = {
            x : snakeX,
            y : snakeY
        };
    }

    /**
    * Updates the snake direction on key press.
    **/
    updateDirection(key) {
        if( key == 37 && this.direction != "RIGHT" ){
            this.direction = "LEFT";
        }else if( key == 38 && this.direction != "DOWN" ){
            this.direction = "UP";
        }else if( key == 39 && this.direction != "LEFT" ){
            this.direction = "RIGHT";
        }else if( key == 40 && this.direction != "UP" ){
            this.direction = "DOWN";
        }
    }

    /**
    * Displays the snake body on the canvas.
    **/
    displaySnake() {
        for( let i = 0; i < this.snakeTiles.length ; i++){
            ctx.fillStyle = "black";
            ctx.fillRect(this.snakeTiles[i].x, this.snakeTiles[i].y, this.tileSize, this.tileSize);

            ctx.strokeStyle = "white";
            ctx.strokeRect(this.snakeTiles[i].x, this.snakeTiles[i].y, this.tileSize, this.tileSize);
        }
    }

    /**
    * Remove the snake tail when snake movement does not result in food consumption.
    **/
    removeTail() {
        let snakePop = this.snakeTiles.pop();

        ctx.fillStyle = "white";
        ctx.fillRect(snakePop.x,snakePop.y,tileSize,tileSize);
    }

    /**
    * Add a new head for the snake on movement.
    **/
    addHead() {
        let newHead = this.newHead;
        this.snakeTiles.unshift(newHead);

        ctx.fillStyle = "#A0A0A0";
        ctx.fillRect(newHead.x,newHead.y,tileSize,tileSize);

        ctx.strokeStyle = "white";
        ctx.strokeRect(newHead.x,newHead.y,tileSize,tileSize);

        this.board.displayBoard(this.tileSize);
    }

    /**
    * Checks if snake consumed food and returns true/false.
    **/
    eatFood(food) {
        let didEatFood = false;

        if( this.newHead.x == food.x && this.newHead.y == food.y ) {
            this.score++;
            this.board.displayScore(this.score, this.tileSize);
            didEatFood = true;
        }

        return didEatFood;
    }

    /**
    * Checks if snake collided with one of the boundaries or the snake body and returns true/false.
    **/
    death() {
        let didSnakeDie = false;

        if( this.newHead.x < this.board.leftBoundary || this.newHead.x > this.board.rightBoundary || this.newHead.y < this.board.upperBoundary || this.newHead.y > this.board.lowerBoundary || this.collision() ) {
            didSnakeDie = true;
        }

        return didSnakeDie;
    }

    /**
    * Determines if snake collided with itself and returns true/false.
    **/
    collision() {
        let didSnakeCollide = false;

        for(let i = 0; i < this.snakeTiles.length; i++){
            if( this.newHead.x == this.snakeTiles[i].x && this.newHead.y == this.snakeTiles[i].y ){
                didSnakeCollide = true;
            }
        }
        return didSnakeCollide;
    }

    /**
    * Handles instructions when snake dies
    **/
    gameOver() {
        this.board.displayRestartPrompt();
        this.board.displayBoard(this.tileSize);
    }
}
