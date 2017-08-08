var game = {};
var fps = 20;

var player_r = 10;
var planet_r = 50;
var planet_g = 1;

/* misc functions */
function $(id){
    return document.getElementById(id);
}

function init_circle(ele, radius){
    ele.r = radius;
    ele.style.width = radius*2;
    ele.style.height = radius*2;

    return ele;
}

function dist(a, b){
    return Math.pow(Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2), 0.5)
}

/* game functions */
function reset_hero(){
    var player = game.player; 
    
    player.x = 0;
    player.y = 0;
    init_circle(player, player_r);

    player.dx = 0;
    player.dy = 0;
}

function gen_planet(){
    var planet = document.createElement('div');
    planet.className = 'planet';
    planet.x = 400;
    planet.y = 300;
    planet.g = planet_g;

    init_circle(planet, planet_r);
    game.canvas.appendChild(planet);
    
    return planet;
}

function gravity(planet){
    var player = game.player; 
    
    var dx = planet.x - player.x;
    var dy = planet.y - player.y;
    
    // calculate difference in the ratio
    var dr = dist(player, planet) / planet.g;
    player.dx += dx/dr;
    player.dy += dy/dr;
}

/* base functions */
function setup(){
    game.canvas = $('game');

    game.player = $('hero');
    reset_hero();
    
    game.base = gen_planet();

    setInterval(loop, 1000/fps);
}

function draw(ele){
    if(ele.dx){ ele.x += ele.dx; }
    if(ele.dy){ ele.y += ele.dy; }

    ele.style.left = ele.x - ele.r;
    ele.style.top = ele.y - ele.r;
}

function draw_screen(){
    draw(game.player);
    draw(game.base);
}

function loop(){
    gravity(game.base); 
    draw_screen(); 
}

