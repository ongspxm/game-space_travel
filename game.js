var game = {};
var fps = 20;

// radius, angular velocity
var player_r = 10;
var player_v = Math.PI/180*90;

// radius, gravity, atmosphere
var planet_r = 50;
var planet_g = 1;
var planet_a = 4;

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

function get_dist(a, b){
    return Math.pow(Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2), 0.5)
}

function get_bearing(target, base){
    // y-axis reversed
    var dx = target.x - base.x;
    var dy = -(target.y - base.y);

    var rad = Math.atan(dx/dy);
    
    if(dy>0){
        if(dx<0){
            rad += Math.PI*2;
        }
    }else{
        rad += Math.PI;
    }

    return rad;
}

/* game functions */
function reset_hero(){
    var player = game.player; 
    
    player.x = 166;
    player.y = 249;
    init_circle(player, player_r);

    player.dx = -10;
    player.dy = 0;
    player.v = player_v;
    
    player.in_orbit = false;
}

function gen_planet(){
    var planet = document.createElement('div');
    planet.className = 'planet';
    planet.x = 200;
    planet.y = 300;
    
    // gravity & atmosphere
    planet.g = planet_g;
    planet.a = planet_a;
    
    // orbit values
    planet.bearing = 0;
    planet.direction = -1;

    init_circle(planet, planet_r);
    game.canvas.appendChild(planet);
    
    return planet;
}

function add_gravity(planet){
    var player = game.player; 
    
    var dx = planet.x - player.x;
    var dy = planet.y - player.y;
    
    // calculate difference in the ratio
    var dr = get_dist(player, planet) / planet.g;
    player.dx += dx/dr;
    player.dy += dy/dr;
}

function check_engaged(planet){
    var player = game.player;

    if(!player.in_orbit && get_dist(player, planet) <= planet.r+planet.a+player.r){
        player.in_orbit = true;
        
        planet.g = 0;
        player.dx = 0;
        player.dy = 0;
    }
}

function update_bearing(planet){
    var bearing = get_bearing(game.player, planet);
    
    if(bearing < planet.bearing){
        planet.direction = -1;
    }else{
        planet.direction = 1;
    }

    planet.bearing = bearing;
}

function orbit(planet){
    var player = game.player;
    
    // y axis reverse
    var bearing = get_bearing(player, planet) + planet.direction * player.v/fps;
    var dist = player.r + planet.r + planet.a; 
    player.x = planet.x + Math.sin(bearing)*dist;
    player.y = planet.y - Math.cos(bearing)*dist;
}

/* base functions */
function setup(){
    game.canvas = $('game');

    game.player = $('hero');
    reset_hero();
    
    game.base = gen_planet();

    game.loop = setInterval(loop, 1000/fps);
}


function move(ele){
    if(ele.dx){ ele.x += ele.dx; }
    if(ele.dy){ ele.y += ele.dy; }
}

function draw(ele){
    ele.style.left = ele.x - ele.r;
    ele.style.top = ele.y - ele.r;
}

function draw_screen(){
    draw(game.player);
    draw(game.base);
}

function loop(){ 
    move(game.player); 
    check_engaged(game.base); 
    
    if(!game.player.in_orbit){
        add_gravity(game.base);
        update_bearing(game.base);
    }else{
        orbit(game.base);
    }
    
    draw_screen(); 
}

