let canvasHeight = 920;
let canvasWidth = 1010;

let backgroundCanvas = document.getElementById('background');
let backgroundCanvasCtx = backgroundCanvas.getContext('2d');
    backgroundCanvas.width = canvasWidth;
    backgroundCanvas.height = canvasHeight;

let pointsCanvas = document.getElementById('points');
let pointsCanvasCtx = pointsCanvas.getContext('2d');
    pointsCanvas.width = canvasWidth;
    pointsCanvas.height = canvasHeight;



let playerCanvas = document.getElementById('player');
let playerCanvasCtx = playerCanvas.getContext('2d');
    playerCanvas.width = canvasWidth;
    playerCanvas.height = canvasHeight;


let pathArea = [];
let numberMass = [];
let pathMass = [];
let frameRate =26;

let area = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1],
    [1,2,1,1,2,1,1,2,2,2,2,2,2,2,2,2,1,1,2,1,1,2,1],
    [1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1],
    [1,3,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,3,1],
    [1,1,1,1,1,1,2,1,2,1,1,0,1,1,2,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,2,1,0,0,0,1,2,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,0,2,2,2,1,0,0,0,1,2,2,2,0,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,2,1,0,0,0,1,2,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,1],
    [1,3,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,3,1],
    [1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,2,1],
    [1,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1],
    [1,1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1,1],
    [1,2,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
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
    constructor(x,y,areaI,areaJ,spriteFrameCount,stepCountAtFrame, speed){
        this.animIteration = 0;
        this.animDirection = 'forward';
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
        this.curSprite =0;
        this.step =0;
        this.spriteFrameCount = spriteFrameCount;
        this.stepCountAtFrame = stepCountAtFrame;
        this.speed = speed;

    }


    setButton(key) {
        if(key !== this.keysDown) {
            switch (true) {
                case key === 'up'   && area[this.i-1][this.j] !==1 && this.pathX === 0: this.keysDown ='up';    this.resetSecondKey(); break;
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
    changeSprite(){
        switch (true) {
            case this.curSprite === this.spriteFrameCount: this.curSprite--; this.animDirection='backward'; break;
            case this.curSprite === 0: this.curSprite++; this.animDirection='forward';break;
            case this.animDirection ==='forward': this.curSprite++; break;
            case this.animDirection ==='backward': this.curSprite--; break;
        }
    }
    move () {
        if(this.secondKeyDown) {
            switch (this.secondKeyDown) {
                case 'up':    if(area[this.i-1][this.j] !==1 && this.pathX === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()} break;
                case 'right': if(area[this.i][this.j+1] !==1 && this.pathY === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()} break;
                case 'down':  if(area[this.i+1][this.j] !==1 && this.pathX === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()} break;
                case 'left':  if(area[this.i][this.j-1] !==1 && this.pathY === 0) {this.keysDown = JSON.parse(JSON.stringify(this.secondKeyDown)); this.resetSecondKey()} break;
            }
        }
        switch (this.keysDown) {
            case 'up':    if(area[this.i-1][this.j] !==1 && this.pathX === 0)  {this.posY-=this.speed; this.pathY -= this.speed;} if(this.pathY === -44 ) {this.i-=1; this.pathY =0} break;
            case 'right': if(area[this.i][this.j+1] !==1 && this.pathY === 0)  {this.posX+=this.speed; this.pathX += this.speed;} if(this.pathX === 44 )  {this.j+=1; this.pathX =0} break;
            case 'down':  if(area[this.i+1][this.j] !==1 && this.pathX === 0)  {this.posY+=this.speed; this.pathY += this.speed;} if(this.pathY === 44)  {this.i+=1; this.pathY =0} break;
            case 'left':  if(area[this.i][this.j-1] !==1 && this.pathY === 0)  {this.posX-=this.speed; this.pathX -= this.speed;} if(this.pathX === -44) {this.j-=1; this.pathX =0} break;
        }
    }


}


class Ghost extends Creatures{
    constructor (spriteMap,x,y,areaI,areaJ,spriteFrameCount,stepCountAtFrame,speed){
        super(x,y ,areaI ,areaJ,spriteFrameCount,stepCountAtFrame,speed );
        this.rightAnim = [spriteMap[0][0],spriteMap[0][1]];
        this.leftAnim  = [spriteMap[1][0],spriteMap[1][1]];
        this.downAnim  = [spriteMap[3][0],spriteMap[3][1]];
        this.upAnim    = [spriteMap[2][0],spriteMap[2][1]];
    }

    animation() {
        this.step++;
        switch (true) {
            case  this.step > this.stepCountAtFrame : this. step = 0; this.changeSprite();
        }

        switch (this.keysDown) {
            case 'right': return this.rightAnim[this.curSprite];
            case 'left':  return this.leftAnim[this.curSprite];
            case 'up':    return this.upAnim[this.curSprite];
            case 'down':  return this.downAnim[this.curSprite];
            default:      return this.rightAnim[this.curSprite];
        }

    }

    findPath(endI,endJ) {
        pathArea = [
            ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w'],
            ['w','o','o','o','o','o','o','o','o','o','o','w','o','o','o','o','o','o','o','o','o','o','w'],
            ['w','o','w','w','o','w','w','w','w','w','o','w','o','w','w','w','w','w','o','w','w','o','w'],
            ['w','o','w','w','o','w','w','o','o','o','o','o','o','o','o','o','w','w','o','w','w','o','w'],
            ['w','o','w','w','o','w','w','o','w','w','w','w','w','w','w','o','w','w','o','w','w','o','w'],
            ['w','o','o','o','o','o','o','o','o','o','o','w','o','o','o','o','o','o','o','o','o','o','w'],
            ['w','o','w','w','o','w','w','w','w','w','o','w','o','w','w','w','w','w','o','w','w','o','w'],
            ['w','o','o','o','o','o','o','w','o','o','o','o','o','o','o','w','o','o','o','o','o','o','w'],
            ['w','w','w','w','w','w','o','w','o','w','w','o','w','w','o','w','o','w','w','w','w','w','w'],
            ['w','w','w','w','w','w','o','w','o','w','o','o','o','w','o','w','o','w','w','w','w','w','w'],
            ['o','o','o','o','o','o','o','o','o','w','o','o','o','w','o','o','o','o','o','o','o','o','o'],
            ['w','w','w','w','w','w','o','w','o','w','o','o','o','w','o','w','o','w','w','w','w','w','w'],
            ['w','w','w','w','w','w','o','w','o','w','w','w','w','w','o','w','o','w','w','w','w','w','w'],
            ['w','o','o','o','o','o','o','o','o','o','o','w','o','o','o','o','o','o','o','o','o','o','w'],
            ['w','o','w','w','o','w','w','w','w','w','o','w','o','w','w','w','w','w','o','w','w','o','w'],
            ['w','o','o','w','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','w','o','o','w'],
            ['w','w','o','w','w','o','w','o','w','w','w','w','w','w','w','o','w','o','w','w','o','w','w'],
            ['w','o','o','o','o','o','w','o','o','o','o','w','o','o','o','o','w','o','o','o','o','o','w'],
            ['w','o','w','w','w','w','w','w','w','w','o','w','o','w','w','w','w','w','w','w','w','o','w'],
            ['w','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','w'],
            ['w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w'],
        ];
        let startI = this.i;
        let startJ = this.j;

        pathArea[startI][startJ]=0;
        numberMass.push([startI,startJ]);

        while (numberMass.length) {
            checkPath(numberMass[0][0]-1,numberMass[0][1], pathArea[numberMass[0][0]][numberMass[0][1]]);
            checkPath(numberMass[0][0]+1,numberMass[0][1], pathArea[numberMass[0][0]][numberMass[0][1]]);
            checkPath(numberMass[0][0],numberMass[0][1]-1, pathArea[numberMass[0][0]][numberMass[0][1]]);
            checkPath(numberMass[0][0],numberMass[0][1]+1, pathArea[numberMass[0][0]][numberMass[0][1]]);
            numberMass.shift();
        }
        let curNumber =  pathArea[endI][endJ];
        pathMass.push([endI,endJ]);
        pathMass.push([endI,endJ]);

        while (curNumber !==0) {
            curNumber =  checkNumber(curNumber,(pathMass[pathMass.length-1][0])-1,pathMass[pathMass.length-1][1]);
            curNumber =  checkNumber(curNumber,(pathMass[pathMass.length-1][0])+1,pathMass[pathMass.length-1][1]);
            curNumber =  checkNumber(curNumber,pathMass[pathMass.length-1][0],(pathMass[pathMass.length-1][1])-1);
            curNumber =  checkNumber(curNumber,pathMass[pathMass.length-1][0],(pathMass[pathMass.length-1][1])+1);
            pathMass.push([pathMass[pathMass.length-1][0],pathMass[pathMass.length-1][1]]);
        }
        switch (true) {
            case this.i > pathMass[pathMass.length-3][0] :  this.setButton('up');break;
            case this.i < pathMass[pathMass.length-3][0] :  this.setButton('down');break;
            case this.j > pathMass[pathMass.length-3][1] :  this.setButton('left');break;
            case this.j < pathMass[pathMass.length-3][1] :  this.setButton('right');break;
        }
    }

}

class Pacman extends Creatures{
    constructor (spriteMap,x,y,areaI,areaJ,spriteFrameCount,stepCountAtFrame,speed){
        super(x,y ,areaI ,areaJ,spriteFrameCount,stepCountAtFrame,speed );
        this.rightAnim = [spriteMap[0][0],spriteMap[1][1],spriteMap[1][2]];
        this.leftAnim  = [spriteMap[0][0],spriteMap[2][1],spriteMap[2][2]];
        this.downAnim  = [spriteMap[0][0],spriteMap[3][1],spriteMap[3][2]];
        this.upAnim    = [spriteMap[0][0],spriteMap[4][1],spriteMap[4][2]];
    }
    animation() {
        this.step++;
        switch (true) {
            case  this.step > this.stepCountAtFrame : this. step = 0; this.changeSprite();
        }

        switch (this.keysDown) {
            case 'right': return this.rightAnim[this.curSprite];
            case 'left':  return this.leftAnim[this.curSprite];
            case 'up':    return this.upAnim[this.curSprite];
            case 'down':  return this.downAnim[this.curSprite];
            default:      return this.rightAnim[this.curSprite];
        }

    }
    move(){
        this.tryEat();
        super.move();
    }
    tryEat() {
        console.log('asd');
        for (let i =0; i< area.length; i++) {
            for(let j = 0; j< area[i].length;j++) {
                if(area[i][j]===2 && this.i === i && this.j === j  ) {
                    area[i][j] =0;
                }
            }
        }
    }
}


let imageStatusMap = new Map();
let creaturesMap   = new Map();
let playerSprite   = new Image();
let redSprite   = new Image();



function imageLoader (name) {
    let canStart = true;
    imageStatusMap.set(name, true);
    imageStatusMap.forEach((val, key, map) => {
        if(val === false ) canStart = false;
    });
    if(canStart) start();
}

//сделать универсальный парсер

function spriteParser(image,line,column) {
    let spriteArray = [[],[],[],[],[],[],[],[],[]];

    for (let i =0; i<line; i++) {

        for (let j = 0; j <column; j++){
                spriteArray[i].push( new sprite(image,j*158,i*158,158,158,45,45,45,45));
        }
    }
    return spriteArray;
}



function drawCreatures() {

    playerCanvasCtx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    creaturesMap.forEach((creature, key, map) => {

    creature.move();



        let animate = creature.animation();
        playerCanvasCtx.drawImage(
            animate.image,animate.sx,animate.sy,
            animate.sprWidth,animate.sprHeight,
            creature.posX,creature.posY,
            animate.sizeX,animate.sizeY
        );

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
function drawPoints() {

    pointsCanvasCtx.clearRect(0, 0, pointsCanvas.width, pointsCanvas.height);
    let radius;
    for (let i =0; i< area.length; i++) {

        for(let j = 0; j< area[i].length;j++) {
            if(area[i][j]===2 || area[i][j]===3 ) {
                switch (area[i][j]){
                    case 2: radius = 5; break;
                    case 3: radius = 10; break;
                }
                pointsCanvasCtx.beginPath();
                pointsCanvasCtx.fillStyle = "yellow";
                pointsCanvasCtx.arc(j*44+22, i*44+22, radius, 0, 360);
                pointsCanvasCtx.stroke();
                pointsCanvasCtx.fill();
            }
        }
    }
}



function start() {
    drawMap();
    drawPoints();
    setInterval(loop,frameRate);
}

function loop() {
    drawCreatures();
    drawPoints();

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
    imageStatusMap.set('redGhost',false);

    playerSprite.src = "images/pacman.png";
    redSprite.src    = "images/red.png";
    playerSprite.onload = function () { imageLoader('pacman') };
    redSprite.onload = function () { imageLoader('redGhost') };

    creaturesMap.set('pacman', new Pacman(spriteParser(playerSprite,5,3),44,44*19,19,1,2,2,5.5));
    creaturesMap.set('redGhost', new Ghost(spriteParser(redSprite,9,2),  44,44,    1,1,1,6, 4));
};





function checkPath(i,j,currentNumber) {
    if(pathArea[i][j] ==='o'){
        pathArea[i][j] = currentNumber+1;
        numberMass.push([i,j]);
    }
}
function checkNumber (number,i,j) {
    if(number !== 'w' && number > pathArea[i][j]) {
        pathMass[pathMass.length-1][0] = i;
        pathMass[pathMass.length-1][1] = j;
        return pathArea[i][j];
    }
    return  number
}


