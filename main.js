let canvasHeight = 920;
let canvasWidth = 1010;

let backgroundCanvas = document.getElementById('background');
backgroundCanvas.width = canvasWidth;
backgroundCanvas.height = canvasHeight;
let backgroundCanvasCtx = backgroundCanvas.getContext('2d');

let playerCanvas = document.getElementById('player');
let playerCanvasCtx = playerCanvas.getContext('2d');

playerCanvas.width = canvasWidth;
playerCanvas.height = canvasHeight;



let area = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];



class sprite {
    constructor(image, sx,sy, sprWidth, sprHeight,px,py,sizeX,sizeY) {
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.sprWidth = sprWidth;
        this.sprHeight = sprHeight;
        this.px = px;
        this.py = py;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}


class Creatures {
    constructor(spriteMap,x,y,areaI,areaJ){
        this.animIteration = 0;
        this.animDirection = 'forward';
        this.rightAnim = [spriteMap[0][0],spriteMap[1][1],spriteMap[1][2]];
        this.leftAnim  = [spriteMap[0][0],spriteMap[2][1],spriteMap[2][2]];
        this.downAnim  = [spriteMap[0][0],spriteMap[3][1],spriteMap[3][2]];
        this.upAnim    = [spriteMap[0][0],spriteMap[4][1],spriteMap[4][2]];
        this.keysDown = '';
        this.secondKeyDown = false;
        this.posX = x;
        this.posY = y;
        this.i = areaI;
        this.j = areaJ;
        this.pathX = 0;
        this.pathY = 0;
        this.startX = x;
        this.startY = y;

    }

    animation() {
        switch (this.keysDown) {
            case 'right': return this.rightAnim;
            case 'left':  return this.leftAnim;
            case 'up':    return this.upAnim;
            case 'down':  return this.downAnim;
            default: return this.rightAnim;
        }
    }

    setButton(key) {
        if(key !== this.keysDown) {
            switch (true) {
                case key === 'up'   && area[this.i-1][this.j] !==1 && this.pathX === 0 : this.keysDown ='up';    this.resetSecondKey(); break;
                case key === 'down' && area[this.i+1][this.j] !==1 && this.pathX === 0: this.keysDown ='down';  this.resetSecondKey(); break;
                case key === 'left' && area[this.i][this.j-1] !==1 && this.pathY === 0: this.keysDown ='left';  this.resetSecondKey(); break;
                case key === 'right'&& area[this.i][this.j+1] !==1 && this.pathY === 0: this.keysDown ='right'; this.resetSecondKey(); break;
                default:   this.secondKeyDown = key; setTimeout(this.resetSecondKey,50);
            }
        }


    }
    resetSecondKey () {
        this.secondKeyDown = false
    }
    move () {

        if(this.secondKeyDown) {
            switch (this.secondKeyDown) {
                case 'up':    if(area[this.i-1][this.j] !==1 && this.pathX === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()}break;
                case 'right': if(area[this.i][this.j+1] !==1 && this.pathY === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()} break;
                case 'down':  if(area[this.i+1][this.j] !==1 && this.pathX === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()} break;
                case 'left':  if(area[this.i][this.j-1] !==1 && this.pathY === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()}break;
            }
        }
        switch (this.keysDown) {
            case 'up':    if(area[this.i-1][this.j] !==1 && this.pathX === 0)  {this.posY-=11; this.pathY -= 11;} if(this.pathY === -44) {this.i-=1; this.pathY = 0} break;
            case 'right': if(area[this.i][this.j+1] !==1 && this.pathY === 0)  {this.posX+=11; this.pathX += 11;} if(this.pathX === 44) {this.j+=1; this.pathX =0} break;
            case 'down':  if(area[this.i+1][this.j] !==1 && this.pathX === 0)  {this.posY+=11; this.pathY += 11;} if(this.pathY === 44) {this.i+=1; this.pathY =0} break;
            case 'left':  if(area[this.i][this.j-1] !==1 && this.pathY === 0)  {this.posX-=11; this.pathX -= 11;} if(this.pathX === -44) {this.j-=1;this.pathX=0} break;
        }


    }
}









let imageStatusMap = new Map();
let creaturesMap   = new Map();
let playerSprite   = new Image();



function imageLoader (name) {
    let canStart = true;
    imageStatusMap.set(name, true);
    imageStatusMap.forEach((val, key, map) => {
        if(val === false ) start = false;
    });
    if(canStart) start();
}

function spriteParser(image) {
    let spriteArray = [[],[],[],[],[]];

    for (let i =0; i<5; i++) {
        for (let j = 0; j <3; j++){
            if(j === 0) {
                spriteArray[i].push( new sprite(image,0,0,158,158,45,45,45,45));
            } else {
                spriteArray[i].push( new sprite(image,j*158,i*158,158,158,45,45,45,45));
            }
        }
    }
    return spriteArray;
}



function drawCreatures() {

    playerCanvasCtx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    creaturesMap.forEach((creature, key, map) => {
        let j = creature.animIteration;
        creature.move();

        if (creature.animIteration > 2) {
            creature.animDirection = 'backward';
            creature.animIteration = 1;
            j= 1;
        } else if( creature.animIteration < 0 ) {
            creature.animDirection = 'forward';
            creature.animIteration = 1;
            j = 1;
        }

        let animate = creature.animation();
        playerCanvasCtx.drawImage(
            animate[j].image,animate[j].sx,animate[j].sy,
            animate[j].sprWidth,animate[j].sprHeight,
            creature.posX,creature.posY,
            animate[j].sizeX,animate[j].sizeY
        );

        if(creature.animDirection ==='forward') {
            creature.animIteration++;
        } else {
            creature.animIteration--;
        }
    });

}


function drawMap() {
    for (let i =0; i< area.length; i++) {
        for(let j = 0; j< area[i].length;j++) {
            if(area[i][j]===1) {
                backgroundCanvasCtx.fillStyle = "black";
            } else {
                backgroundCanvasCtx.fillStyle = "green";
            }
            backgroundCanvasCtx.fillRect(j*44, i*44, 44, 44);
        }
    }
}

function start() {
    drawMap();
   setInterval(function () {
       drawCreatures();
   },80);
}



document.addEventListener("keydown", function(event){
    switch (event.keyCode) {
        case 87: creaturesMap.get('pacman').setButton ('up');    break;
        case 65: creaturesMap.get('pacman').setButton ('left');  break;
        case 83: creaturesMap.get('pacman').setButton ('down');  break;
        case 68: creaturesMap.get('pacman').setButton ('right'); break;
    }
});


window.onload  = function () {
    imageStatusMap.set('pacman',false);
    playerSprite.src = "images/pacman.png";
    playerSprite.onload = function () { imageLoader('pacman') };

    creaturesMap.set('pacman', new Creatures(spriteParser(playerSprite),44,44,1,1));
};


