/*To actually be able to render graphics on the <canvas> element, 
first we have to grab a reference to it in JavaScript.
Add the following below your opening <script> tag.*/

//var, let and const declares vaiables
//var canvas = document.getElementById("canvas");//pleasen refer to the DOM
//var ctx = canvas.getContext("2d"); //the actual tool we can use to paint on the Canvas.

/*above we're storing a reference to the <canvas> element to the canvas variable. 
 Then we're creating the ctx variable to store the 2D rendering context
  — the actual tool we can use to paint on the Canvas.

  //print a square on the canvas

ctx.beginPath();//start drawing
ctx.rect(20, 40, 50, 50);// 20 = x, 40 = y cordinates, 50 = with, 50 = height
ctx.fillStyle ="#FF0000"; //store the color to fill the canvas with the color red
ctx.fill();
ctx.closePath();//stop drawing


//draw a rectangle
ctx.beginPath();
ctx.arc(240,160,20,0,Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

Instead of using fill() and filling the shapes with colors,
 we can use stroke() to only colour the outer stroke.
ctx.beginPath();
ctx.rect(160,10,100,40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();*/

var canvas = document.getElementById("canvas");//please refer to the DOM
var ctx = canvas.getContext("2d");


//ball position
var x = canvas.width/2;
var y = canvas.height - 30;
//change in position
var dx = -2;
var dy = -2;
//ball properties
var ballRadius = 10;

//interactivity
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2; //starting position of the paddle

//pressed buttons
var rightPressed = false;//false, why?, the buttons are not pressed
var leftPressed = false;

//event listeners for key pressers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e)
{
    if (e.key == "Right" || e.key == "ArrowRight")
    {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft")
    {
        leftPressed = true;
    }
}

function keyUpHandler(e) 
{
    if (e.key == "Right" || e.key == "ArrowRight")
    {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") 
    {
        leftPressed = false;
    }
}


function drawball() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawball();
    drawPaddle();
   
    if (rightPressed){
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width)
        {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed)
    {
        paddleX -= 7;
        if (paddleX < 0)
        {
            paddleX = 0;
        }
    }
    if ( y + dy < ballRadius || y + dy > canvas.height - ballRadius)
    {
        dy = -dy;
    }
    else if ( x + dx < ballRadius  || x + dx > canvas.width - ballRadius )
    {
        dx = -dx;
    }

    x += dx;
    y += dy;  
}
setInterval(draw, 8);

/*
When the keydown event is fired on any of the keys on your keyboard 
(when they are pressed), the keyDownHandler() function will be executed.
The same pattern is true for the second listener: keyup events will fire
the keyUpHandler() function*/

//loop draw/display, refreshrate per 8 milliseconds



