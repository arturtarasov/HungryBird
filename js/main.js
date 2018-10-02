var gravity = 0.25;
var velocity = 0;
var position = 180;
var rotation = 0;
var jump = -4.6;

var loopGameloop;

var currentstate;

var states = Object.freeze({
    SplashScreen: 0,
    GameScreen: 1,
    ScoreScreen: 2
});

$(document).ready(function() {

    showSplash();
});

function showSplash()
{
    currentstate = states.SplashScreen;

    velocity = 0;
    position = 180;
    rotation = 0;

    $("#player").css({ y: 0, x: 0});
    updatePlayer($("#player"));
}
function startGame()
{
    currentstate = states.GameScreen;

    //start up our loops
    var updaterate = 1000.0 / 60.0 ; //60 times a second
    loopGameloop = setInterval(gameloop, updaterate);

    //jump from the start!
    playerJump();
}

function updatePlayer(player)
{
    //rotation
    rotation = Math.min((velocity / 10) * 90, 90);
    console.log(rotation);
    //apply rotation and position
    $(player).css({ rotate: rotation, top: position });
}


function gameloop() {
    var player = $("#player");

    //update the player speed/position
    velocity += gravity;
    position += velocity;

    //update the player
    updatePlayer(player);
}

//Handle space bar
$(document).keydown(function(e){
    //space bar!
    if(e.keyCode == 32)
    {
        //in ScoreScreen, hitting space should click the "replay" button. else it's just a regular spacebar hit
        if(currentstate == states.ScoreScreen)
            $("#replay").click();
        else
            screenClick();
    }
});

function playerJump()
{
    velocity = jump;
}

function screenClick()
{
    if(currentstate == states.GameScreen)
    {
        playerJump();
    }
    else if(currentstate == states.SplashScreen)
    {
        startGame();
    }
}