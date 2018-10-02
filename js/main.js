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

//начало выполнения
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
    //apply rotation and position
    $(player).css({ rotate: rotation, top: position });
}


function gameloop() {
    var player = $("#player");

    //обновление у птички speed и position
    velocity += gravity;
    position += velocity;

    //update птички
    updatePlayer(player);

    //позиция птички
    var box = document.getElementById('player').getBoundingClientRect();

    //столкновение птички с землей
    if(box.bottom >= $("#land").offset().top || box.top <= 0)
    {
        playerDead();
        return;
    }
}

//Handle space bar
$(document).keydown(function(e){
    //нажатие на пробел
    if(e.keyCode == 32)
    {
        //если
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

function playerDead()
{
    //stop animating everything!
    $(".animated").css('animation-play-state', 'paused');
    $(".animated").css('-webkit-animation-play-state', 'paused');

    //drop the bird to the floor
    var playerbottom = $("#player").position().top + $("#player").width(); //we use width because he'll be rotated 90 deg
    var floor = $("#flyarea").height();
    var movey = Math.max(0, floor - playerbottom);
    $("#player").transition({ y: movey + 'px', rotate: 90}, 1000, 'easeInOutCubic');

    //it's time to change states. as of now we're considered ScoreScreen to disable left click/flying
    currentstate = states.ScoreScreen;

    //destroy our gameloops
    clearInterval(loopGameloop);
    clearInterval(loopPipeloop);

    loopGameloop = null;

}