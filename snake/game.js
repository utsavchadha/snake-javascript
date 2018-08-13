/**
* Snake game - by Utsav Chadha
* Programmed in plain javascript
**/

// Initialize canvas elements
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Square pixel size of each tile on the board
const tileSize = 16;

const foodImg = new Image(); // Food image
foodImg.src = "img/food16.png";

let snake = new Snake(tileSize); // Initialize snake body
let food = generateFood(); // Initialize food
let isDirectionChanged = false; // Flag to avoid multiple direction changes in one frame

/**
* Draw function that refreshes the board every interval.
**/
function draw(){
    ctx.drawImage(foodImg, food.x, food.y); // display food
    snake.displaySnake(); // display snake body
    snake.updateSnake(); // update snake body

    // check if one-tile snake movement resulted in food consumption
    if( snake.eatFood(food) ){
        food = generateFood();
    }else{
        snake.removeTail();
    }

    // check if one-tile snake movement resulted in death
    if( snake.death() ){
        clearInterval(game);
        snake.gameOver();
    } else {
        snake.addHead();
    }

    isDirectionChanged = false;
}

let game = setInterval(draw, 100); // Sets a frame rate

document.addEventListener("keydown", direction); // event listener for key presses

/**
* Function to capture key presses. The method responds to four keys
* namely - UP, DOWN, RIGHT AND LEFT. It ignores any other key press.
**/
function direction(event){
    let key = event.keyCode;

    // check if escape key was pressed
    if( event.keyCode == 27 ) {
        window.location.reload();
    } else {
        // else check for direction change
        if( !isDirectionChanged ) {
            snake.updateDirection(key);
            isDirectionChanged = true;
        }
    }
}

/**
* Function to generate food in a new location.
**/
function generateFood() {
    let food = {
        x : Math.floor(Math.random()*34+1) * tileSize,
        y : Math.floor(Math.random()*34+3) * tileSize
    };

    // To ensure that the new food location doesn't overlap with the snake's body
    while(snake.snakeTiles.includes(food)) {
        food = {
            x : Math.floor(Math.random()*34+1) * tileSize,
            y : Math.floor(Math.random()*30+3) * tileSize
        };
    }

    return food;
}
