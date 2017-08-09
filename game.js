var game = {};
var fps = 24;

// game width, height, border, padding
var GAME_W = 300;
var GAME_H = 500;
var GAME_B = 20;
var GAME_P = GAME_B + 10;

// radius, angular velocity, escape velocity
var PLAYER_R = 10;
var PLAYER_A = Math.PI/180*90;
var PLAYER_V = 10;

// radius, gravity, atmosphere padding, gameplay buffer
var PLANET_R = 50;
var PLANET_G = 2;
var PLANET_A = 4;
var PLANET_B = 5;

// rebase velocity, rebase padding
var REBASE_V = 40;
var REBASE_P = 70;

// coin radius, atmosphere padding, max num of coins
var COIN_R = 5;
var COIN_A = 5;
var COIN_MAX = 10;
var COIN_MIN = 3;

// path padding (from planet), spacing, max num of coins
var PATH_P = COIN_R*15;
var PATH_S = COIN_R*4;
var PATH_M = 5;

// sun radius, gravity, generate on 5th jump, threshold
var SUN_R = PLANET_R*3;
var SUN_G = PLANET_G*0.8;
var SUN_J = 5;
var SUN_T = 0.2;

// asteriod, generated on 10th jump, threshold, planet dist
var STONE_R = PLANET_R*0.5;
var STONE_J = 2;
var STONE_T = 1;
var STONE_D = PLANET_R*2;

/* misc functions */
function $(id){
    return document.getElementById(id);
}

function init_circle(radius){
    var ele = document.createElement('div');
    ele.r = radius;
    ele.style.width = radius*2;
    ele.style.height = radius*2;

    return ele;
}

function remove_ele(ele){
    if(!ele){ return; }

    game.canvas.removeChild(ele);
    if(ele.coins){ ele.coins.forEach(remove_ele); }
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
function gen_player(){ 
    var player = init_circle(PLAYER_R);
    player.className = 'hero';
    player.x = 0;
    player.y = 0;

    player.dx = 0;
    player.dy = 0;
    player.a = PLAYER_A;
    player.v = PLAYER_V;

    player.in_orbit = false;

    game.canvas.appendChild(player);
    return player;
}

function gen_planet(no_coins){
    var planet = init_circle(PLANET_R); 
    planet.className = 'planet';
    planet.x = Math.random()*(GAME_W - 2*PLANET_R) + PLANET_R;
    planet.y = REBASE_P;

    // gravity & atmosphere
    planet.g = PLANET_G;
    planet.a = PLANET_A;
    planet.b = PLANET_B;

    // orbit values
    planet.bearing = 0;
    planet.direction = -1;
    
    redraw(planet);
    game.canvas.appendChild(planet);
    if(no_coins){ return planet; }
    
    // planet coins 
    var num = Math.round(Math.random() * (COIN_MAX-COIN_MIN)) + COIN_MIN;
    var da = 2*Math.PI / num;  
    var dist = PLANET_R + COIN_A + COIN_R;
    
    planet.coins = [];
    for(var i=0; i<num; i++){
        var coin = init_circle(COIN_R);
        coin.className = 'coin';

        coin.x = planet.x + dist*Math.sin(da*i);
        coin.y = planet.y - dist*Math.cos(da*i);
        coin.bearing = da*i;
        
        redraw(coin);
        planet.coins.push(coin);
        game.canvas.appendChild(coin);
    }
    
    // sun
    var have_sun = false;
    if(game.jumps>SUN_J && Math.random()<SUN_T){ have_sun = true; }

    if(have_sun){
        var sun = init_circle(SUN_R);
        sun.className = 'sun';
        
        sun.x = -0.5*SUN_R + (planet.x<(GAME_W/2))*(GAME_W+SUN_R);
        sun.y = GAME_H / 4;
        sun.g = SUN_G;

        redraw(sun);
        game.sun = sun;
        game.canvas.appendChild(sun);
    }
   
    // stone 
    var have_stone = false;
    if(!have_sun && game.jumps>STONE_J && Math.random()<STONE_T){
        have_stone = true; 
    }

    if(have_stone){
        var stone = init_circle(STONE_R);
        stone.className = 'stone';

        var bearing = get_bearing(game.base, planet);
        var dist = PLANET_R + STONE_R + STONE_D;
        
        stone.x = planet.x + Math.sin(bearing) * dist - STONE_R;
        stone.x += 2*(Math.random()<0.5)*STONE_R;
        stone.y = planet.y - Math.cos(bearing) * dist;

        redraw(stone);
        game.stone = stone;
        game.canvas.appendChild(stone);
    }

    // pathway coins
    if(!have_sun && !have_stone){
        var num = Math.round(Math.random()*PATH_M);
        var bearing = get_bearing(game.base, planet);
        
        game.path = [];
        for(var i=0; i<num; i++){
            var coin = init_circle(COIN_R);
            coin.className = 'coin';
            
            var dist = PLANET_R + PATH_P + PATH_S*i;
            coin.x = planet.x + Math.sin(bearing) * dist;
            coin.y = planet.y - Math.cos(bearing) * dist;

            redraw(coin);
            game.path.push(coin);
            game.canvas.appendChild(coin);
        }
    }

    return planet;
}

function add_gravity(planet){
    if(!planet){ return; }

    var player = game.player;

    var dx = planet.x - player.x;
    var dy = planet.y - player.y;

    // calculate difference in the ratio
    var dr = get_dist(player, planet) / planet.g;
    player.dx += dx/dr;
    player.dy += dy/dr;
}

function rebase(){
    var y = game.base.y;
    var h = GAME_H - REBASE_P;

    if(y<h){ y -= REBASE_V; }

    // done rebasing
    if(y>=h){
        y = h;
        game.target = gen_planet();
        game.rebase = false;
    }

    var d = y - game.base.y;
    game.base.y -= d;
    game.player.y -= d;

    if(game.base.coins){
        game.base.coins.forEach(function(coin){
            coin.y -= d;
            redraw(coin);
        });
    }

    redraw(game.base);
}

function remove_extra(){
    remove_ele(game.base);
    
    game.path.forEach(remove_ele);
    game.path = [];

    remove_ele(game.sun);
    game.sun = 0;

    remove_ele(game.stone);
    game.stone = 0;
}

function check_engaged(planet){
    var player = game.player;

    if(!player.in_orbit && get_dist(player, planet) <= planet.r+planet.a+player.r+planet.b){
        player.in_orbit = true;
        player.dx = 0;
        player.dy = 0;

        remove_extra();
        
        game.base = planet;
        game.rebase = true;
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
    var bearing = get_bearing(player, planet) + planet.direction * player.a/fps;
    var dist = player.r + planet.r + planet.a;
    player.x = planet.x + Math.sin(bearing)*dist;
    player.y = planet.y - Math.cos(bearing)*dist;
    player.bearing = bearing;
}

function jump(planet){
    var player = game.player;
    var bearing = get_bearing(player, planet);

    player.dx = Math.sin(bearing) * player.v;
    player.dy = -Math.cos(bearing) * player.v;
    player.in_orbit = false;
    player.bearing = -1;
    
    // difficulty
    if(game.jumps%5==0){ player.a += PLAYER_A*0.25; }
    
    // fast jump bonus
    if(game.base.coins){
        update_score(game.base.coins.length * 3);
    }
    
    game.jumps += 1;
}

function check_is_alive(){
    var player = game.player;
    if(player.x<-1*GAME_P || player.x>GAME_W+GAME_P){
        return false;
    }

    if(player.y<-1*GAME_P || player.y>GAME_H+GAME_P){
        return false;
    }

    return true;
}

function check_stone_collision(){
    if(get_dist(game.player, game.stone) <= game.player.r + game.stone.r){
        return true;
    }

    return false;
}

function check_planet_coins(){
    var player = game.player; 
    if(player.bearing < 0){ return; }

    game.base.coins.forEach(function(coin){
        if(Math.abs(player.bearing - coin.bearing) <= Math.PI/COIN_MAX){
            game.base.coins.splice(game.base.coins.indexOf(coin),1);
            game.canvas.removeChild(coin);
            update_score();
        }
    });
}

function check_path_coins(){
    var player = game.player;
    game.path.forEach(function(coin){
        if(get_dist(coin, player) <= coin.r+player.r){
            game.path.splice(game.path.indexOf(coin),1);
            game.canvas.removeChild(coin);
            update_score();
        }
    });
}

/* base functions */
function setup(){
    // game canvas
    game.canvas = $('game');
    game.canvas.style.width = GAME_W;
    game.canvas.style.height = GAME_H;
    game.canvas.style.borderWidth = GAME_B;
    
    // game player
    game.player = gen_player();
    game.target = gen_planet(no_coins=true);
    
    // game.score
    game.score = 0;
    game.score_text = $('score');
    game.jumps = 0;
    
    // game mechanics items
    game.path = [];

    game.loop = setInterval(loop, 1000/fps);
    document.body.onkeypress = keypress;
}

function clear_all(){
    delete game.canvas;
    delete game.player;
    
    delete game.target;
    delete game.base;
    
    delete game.path;
    delete game.sun;
    delete game.stone;
    
    $('game').innerHTML = '<div id="score"></div>';
}

function keypress(evt){
    // space
    if(evt.key==' '){
        if(!game.loop){
            clear_all();
            setup();
        }

        if(game.player.in_orbit && !game.rebase){
            return jump(game.base);
        }
    }
}

function update_score(score){
    if(!score){ score = 1; }
    game.score += score;
    game.score_text.innerText = game.score;
}

function move(ele){
    if(ele.dx){ ele.x += ele.dx; }
    if(ele.dy){ ele.y += ele.dy; }
}

function redraw(ele){
    ele.style.left = ele.x - ele.r;
    ele.style.top = ele.y - ele.r;
}

function game_over(){
    clearTimeout(game.loop);
    delete game.loop;

    alert('Score: '+game.score);
}

function loop(){
    if(!game.player.in_orbit){
        add_gravity(game.target);
        update_bearing(game.target);
        check_engaged(game.target);

        // extra
        if(game.sun){ add_gravity(game.sun); }
        if(game.path){ check_path_coins(); }
        if(game.stone && check_stone_collision()){
            return game_over();
        }
    }else{
        orbit(game.base);
        if(game.base.coins){ check_planet_coins(); }

        if(game.rebase){ rebase(); }
    }

    move(game.player); 
    redraw(game.player);
    if(!check_is_alive()){ 
        return game_over(); 
    }
}

