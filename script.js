const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let score = 0;

const scoreText = document.getElementById("scoreValue");

const player = {

    x: WIDTH/2 - 25,
    y: HEIGHT-60,

    width:50,
    height:25,

    speed:6

};

let bullets = [];

let aliens = [];

let keys = {};

document.addEventListener("keydown", e=>{
    keys[e.key]=true;
});

document.addEventListener("keyup", e=>{
    keys[e.key]=false;
});

document.addEventListener("keydown", e=>{

    if(e.code==="Space"){

        bullets.push({

            x:player.x+player.width/2-2,

            y:player.y,

            width:4,

            height:12,

            speed:8

        });

    }

});

function createAliens(){

    aliens=[];

    for(let row=0;row<5;row++){

        for(let col=0;col<10;col++){

            aliens.push({

                x:60+col*60,

                y:50+row*50,

                width:40,

                height:30,

                alive:true

            });

        }

    }

}

createAliens();

let alienDirection=1;

function update(){

    if(keys["ArrowLeft"]){

        player.x-=player.speed;

    }

    if(keys["ArrowRight"]){

        player.x+=player.speed;

    }

    if(player.x<0) player.x=0;

    if(player.x>WIDTH-player.width)

        player.x=WIDTH-player.width;

    bullets.forEach(b=>{

        b.y-=b.speed;

    });

    bullets=bullets.filter(b=>b.y>-20);

    let moveDown=false;

    aliens.forEach(a=>{

        if(!a.alive) return;

        a.x+=alienDirection;

        if(a.x<0||a.x+a.width>WIDTH)

            moveDown=true;

    });

    if(moveDown){

        alienDirection*=-1;

        aliens.forEach(a=>{

            a.y+=20;

        });

    }

    bullets.forEach(b=>{

        aliens.forEach(a=>{

            if(!a.alive) return;

            if(

                b.x<a.x+a.width &&

                b.x+b.width>a.x &&

                b.y<a.y+a.height &&

                b.y+b.height>a.y

            ){

                a.alive=false;

                b.y=-100;

                score+=10;

                scoreText.textContent=score;

            }

        });

    });

}
