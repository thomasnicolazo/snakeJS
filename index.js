// Global Variable canvas
const board = document.getElementById("myCanvas");
board.height = 1000;
board.width = 1000;
const ctx = board.getContext('2d');
// Global variable board
const widthBoard = board.width;
const heightBoard = board.height;
const tileSize = 20;
const tileCount = widthBoard/tileSize; // 50
let isAppleFound = 1;
let isGameOver = 0;
let isInit = 0;
let headX = 24;
let headY = 24;
let appleX = 0;
let appleY = 0;
let score = 0;
let snake = [] ;
let snakeLength = 14;
//
class SnakePart 
{
    constructor(x,y)
    {
        this.x = x ;
        this.y = y;
    }
};
// Event variables for the keydown event
let snakeVelocityX = 0;
let snakeVelocityY = 0;
// event 
let elem = document.body.addEventListener('keydown',move);

function clearScreen()
{

    ctx.fillStyle='black';
    ctx.fillRect(0,0,board.clientWidth,board.clientHeight)// black color start from 0px left, right to canvas width and canvas height
}

function drawSnake()
{
    for(let i =0; i< snake.length;i++)
    {
        ctx.fillStyle="green";
        ctx.fillRect(snake[i].x * tileSize,snake[i].y* tileSize, tileSize,tileSize);
    }
    ctx.fillStyle="orange";
    ctx.fillRect(headX* tileSize,headY* tileSize, tileSize,tileSize);
}

function move(KeyboardEvent)
{
    switch(KeyboardEvent.code)
    {
        // arrow down
        case "ArrowDown":
            if (snakeVelocityY != -1){
                snakeVelocityX = 0;
                snakeVelocityY = 1;
            }
            break;
        // arrow left
        case "ArrowLeft":
            if(snakeVelocityX != 1)
            {
                snakeVelocityX = -1;
                snakeVelocityY = 0;
            }
            break;
        // arrow right
        case "ArrowRight":
            if(snakeVelocityX !=-1)
            {
                snakeVelocityX = 1;
                snakeVelocityY = 0;
            }
            break;
        // arrow up
        case "ArrowUp":
            if(snakeVelocityY != 1)
            {
                snakeVelocityX = 0;
                snakeVelocityY = -1;
            } 
            break;
    }
}
function changeSnakePosition()
{
    if(snakeVelocityX !=0 || snakeVelocityY !=0)
    {
        for(let i=snake.length-1; i>0 ;i--)
            {
                snake[i].x = snake[i-1].x;
                snake[i].y = snake[i-1].y;
            }
    }
    headX += snakeVelocityX ;
    headY += snakeVelocityY ;
    snake[0].x = headX;
    snake[0].y = headY;
}
function checkCollision()
{
    if(appleX==headX && appleY==headY)
    {
        score += 1;
        isAppleFound = 1;
        snakeLength++;
        let newSnakePartX = snake[snake.length -1].x;
        let newSnakePartY = snake[snake.length -1].y;
        snake.push(new SnakePart((newSnakePartX*snakeVelocityX * -1),(newSnakePartY*snakeVelocityY*-1)));
    }
    if(headX > tileCount || headY > tileCount || headX<0 || headY<0)
    {
        isGameOver = 1;
        snakeVelocityX = 0;
        snakeVelocityY = 0;
        console.log("GAME OVER\n")
    }
    for(let i=1; i< snake.length;i++)
    {
        if(snake[i].x==headX && snake[i].y==headY)
            {
                isGameOver = 1;
                snakeVelocityX = 0;
                snakeVelocityY = 0;
                console.log("GAME OVER\n")
                break;
            } 
    }
}

function drawApple()
{
    if(isAppleFound == 1)
    {
        do
        {
            appleX = Math.round(Math.random() * tileCount);
            appleY = Math.round(Math.random() * tileCount);
        }while(appleX == headX && appleY == headY);
        isAppleFound=0;
    }
    
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileSize, appleY* tileSize,tileSize,tileSize);
}

function drawScore(){
    ctx.fillStyle="white";// set our text color to white
    ctx.font=String(tileSize)+"px verdena";//set font size to 10px of font family verdena
    ctx.fillText("Score: " + score, ctx.canvas.clientWidth-(tileSize*5),tileSize);// position our score at right hand corner    
}

function initSnake()
{ 
    for(let i=0; i<snakeLength;i++)
    {
    snake.push(new SnakePart(headX+i,headY));
    }
}

function drawGameOver()
{
    if(isGameOver == true)
    {
        ctx.fillStyle="white";
        ctx.font=String(tileSize*tileCount/9)+"px verdana";
        ctx.fillText("Game Over! ", ctx.canvas.clientWidth/4, ctx.canvas.clientHeight/2);//position our text in center
    }
}
function drawBoard()
{
    let speed = 15;
    if (isInit == 0)
    {
        initSnake();
        isInit=1;
    }
    clearScreen();
    drawApple();
    drawSnake();
    drawScore()
    checkCollision()
    changeSnakePosition();
    drawGameOver();
    setTimeout(drawBoard,1000/speed);

}
drawBoard();