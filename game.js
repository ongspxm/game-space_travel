var game = {};
var fps = 20;

var player_r = 20;

function $(id){
    return document.getElementById(id);
}

function setup(){
    game.player = $('hero');
    game.player.x = 0;
    game.player.y = 0;
    game.player.r = player_r / 2;
    game.player.style.width = player_r;
    game.player.style.height = player_r;

    setInterval(loop, 1000/fps);
}

function draw(){
    game.player.style.left = game.player.x - player_r / 2;
    game.player.style.top = game.player.y - player_r / 2;
}

function loop(){
    console.log(game.player.x);
    draw();
}

