let canvasHeight = 920;
let canvasWidth = 1010;

let backgroundCanvas = document.getElementById('background');
let backgroundCanvasCtx = backgroundCanvas.getContext('2d');
    backgroundCanvas.width  = canvasWidth;
    backgroundCanvas.height = canvasHeight;

let pointsCanvas = document.getElementById('points');
let pointsCanvasCtx = pointsCanvas.getContext('2d');
    pointsCanvas.width  = canvasWidth;
    pointsCanvas.height = canvasHeight;


let playerCanvas = document.getElementById('player');
let playerCanvasCtx = playerCanvas.getContext('2d');
    playerCanvas.width  = canvasWidth;
    playerCanvas.height = canvasHeight;


let frameRate =26;

let pathArea = [];
let pathMass = [];
let numberMass = [];

let imageStatusMap = new Map();
let creaturesMap   = new Map();

let playerSprite   = new Image();
let blueSprite     = new Image();
let redSprite      = new Image();
let pinkSprite     = new Image();
let yellowSprite   = new Image();
let life = 2;

let area = [];
function resetArea() {
    area = [
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
}

function resetPathArea() {
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
}


class sprite {
    constructor(image, sx,sy, sprWidth, sprHeight,px,py,sizeX,sizeY) {
        this.sx = sx;
        this.sy = sy;
        this.px = px;
        this.py = py;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.image = image;
        this.sprWidth = sprWidth;
        this.sprHeight = sprHeight;
    }
}


class Creatures {
    constructor(x,y,areaI,areaJ,spriteFrameCount,stepCountAtFrame, speed){
        this.step = 0;
        this.posX = x;
        this.posY = y;
        this.i = areaI;
        this.j = areaJ;
        this.pathX = 0;
        this.pathY = 0;
        this.startX = x;
        this.startY = y;
        this.curSprite =0;
        this.speed = speed;
        this.keysDown = '';
        this.itIsDead = false;
        this.secondKeyDown = false;
        this.animDirection = 'forward';
        this.spriteFrameCount = spriteFrameCount;
        this.stepCountAtFrame = stepCountAtFrame;
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

    resetSecondKey () { this.secondKeyDown = false }

    changeSprite(){
        switch (true) {
            case this.curSprite === this.spriteFrameCount: this.curSprite--; this.animDirection='backward'; break;
            case this.curSprite === 0: this.curSprite++; this.animDirection='forward';break;
            case this.animDirection === 'forward':  this.curSprite++; break;
            case this.animDirection === 'backward': this.curSprite--; break;
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
            case 'up':    if(area[this.i-1][this.j] !==1 && this.pathX === 0){
                            this.posY-=this.speed;
                            this.pathY -= this.speed;
                          }
                          if(this.pathY === -44 ){
                            this.i-=1;
                            this.pathY =0;
                          }
                          break;

            case 'right': if(area[this.i][this.j+1] !==1 && this.pathY === 0){
                              this.posX+=this.speed;
                              this.pathX += this.speed;
                          }
                          if(this.pathX === 44 ){
                              this.j+=1;
                              this.pathX =0;
                              if(this.j>22) {this.j=0; this.posX =-33; this.pathX =-33}
                          }break;

            case 'down':  if(area[this.i+1][this.j] !==1 && this.pathX === 0){
                            this.posY+=this.speed; this.pathY += this.speed;
                          }
                          if(this.pathY === 44) {this.i+=1;  this.pathY =0}
                          break;

            case 'left':  if(area[this.i][this.j-1] !==1 && this.pathY === 0){
                            this.posX-=this.speed; this.pathX -= this.speed;
                          }
                          if(this.pathX === -44){
                            this.j-=1;  this.pathX =0;
                            if(this.j<0) {this.j=22; this.posX = 44*22+33; this.pathX =33}
                          } break;
        }
    }

    dead() { this.itIsDead = true; }

}


class Ghost extends Creatures{
    constructor (spriteMap,x,y,areaI,areaJ,spriteFrameCount,stepCountAtFrame,speed,type){
        super(x,y ,areaI ,areaJ,spriteFrameCount,stepCountAtFrame,speed );
        this.rightAnim  = [spriteMap[0][0],spriteMap[0][1]];
        this.leftAnim   = [spriteMap[1][0],spriteMap[1][1]];
        this.downAnim   = [spriteMap[3][0],spriteMap[3][1]];
        this.upAnim     = [spriteMap[2][0],spriteMap[2][1]];
        this.runAnim    = [spriteMap[4][0],spriteMap[4][1]];
        this.deadAnim   = [spriteMap[5][0],spriteMap[5][1]];
        this.type = type;
        this.needRun = false;
    }

    animation() {
        this.step++;
        switch (true) {
            case  this.step > this.stepCountAtFrame : this. step = 0; this.changeSprite();
        }

        if( this.needRun) {
            return this.itIsDead ? this.deadAnim[this.curSprite] : this.runAnim[this.curSprite];
        } else {
            switch (this.keysDown) {
                case 'right': return  this.rightAnim[this.curSprite];
                case 'left' : return  this.leftAnim [this.curSprite];
                case 'up'   : return  this.upAnim   [this.curSprite];
                case 'down' : return  this.downAnim [this.curSprite];
                default:      return  this.rightAnim[this.curSprite];
            }
        }

    }

    move(){
        if (!this.needRun) {
            this.switchType();
        } else {
            if(this.itIsDead){
               this.findPath(10, 10);
               if(this.i === 10 && this.j ===10){ this.needRun =false, this.itIsDead = false}
            } else {
                switch (this.type) {
                    case 'angry' : this.findPath(creaturesMap.get('pacman').i, creaturesMap.get('pacman').j); break;
                    case 'dumb'  :
                        if (this.getRandom(0,9) <=2 && this.pathX === 0  && this.pathY ===  0 ) {
                            this.findPath(creaturesMap.get('pacman').i, creaturesMap.get('pacman').j)
                        } else {
                            this.tryMove(this.getRandom(0,3));
                        } break;
                    case 'fiftyFifty' :
                        if (this.getRandom(0,9) <=5 && this.pathX === 0  && this.pathY ===  0 ) {
                            this.findPath(creaturesMap.get('pacman').i, creaturesMap.get('pacman').j)
                        } else {
                            this.tryMove(this.getRandom(0,3));
                        } break;
                    case 'ifSees' : this.tryMove(this.getRandom(0,3)); break;
                }
            }

        }
        super.move();
    }


    switchType() {
        switch (this.type) {
            case 'angry' : this.findPath(creaturesMap.get('pacman').i, creaturesMap.get('pacman').j);
                           break;
            case 'dumb'  : if (this.getRandom(0,9) <=2 && this.pathX === 0  && this.pathY ===  0 ) { this.findPath(creaturesMap.get('pacman').i, creaturesMap.get('pacman').j)}
                           else { this.tryMove(this.getRandom(0,3)); }
                           break;
            case 'fiftyFifty' : if (this.getRandom(0,9) <=5 && this.pathX === 0  && this.pathY ===  0 ) { this.findPath(creaturesMap.get('pacman').i, creaturesMap.get('pacman').j)}
                                else { this.tryMove(this.getRandom(0,3)); }
                                break;
            case 'ifSees' : this.tryMove(this.getRandom(0,3)); break;
        }
    }
    findPath(endI,endJ) {
        resetPathArea();

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
            case this.i > pathMass[pathMass.length-3][0] && area[this.i-1][this.j]!== 1:  this.setButton('up');   break;
            case this.i < pathMass[pathMass.length-3][0] && area[this.i+1][this.j]!== 1:  this.setButton('down'); break;
            case this.j > pathMass[pathMass.length-3][1] && area[this.i][this.j-1]!== 1:  this.setButton('left'); break;
            case this.j < pathMass[pathMass.length-3][1] && area[this.i][this.j+1]!== 1:  this.setButton('right');break;
        }
    }

    tryMove(random) {
        let canTry =false;
        switch (true){
            case this.pathX === 0  && this.pathY ===  0 : canTry = true;  break;
        }

        if(canTry) {
            switch (true) {
                case random === 0 && area[this.i-1][this.j]!== 1:  this.setButton('up');   break;
                case random === 1 && area[this.i+1][this.j]!== 1:  this.setButton('down'); break;
                case random === 2 && area[this.i][this.j-1]!== 1:  this.setButton('left'); break;
                case random === 3 && area[this.i][this.j+1]!== 1:  this.setButton('right');break;
                default : this.tryMove(this.getRandom(0,3));
            }
        }
    }

    runAway () { this.needRun = true;}

    getRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}



class Pacman extends Creatures{
    constructor (spriteMap,x,y,areaI,areaJ,spriteFrameCount,stepCountAtFrame,speed){
        super(x,y ,areaI ,areaJ,spriteFrameCount,stepCountAtFrame,speed );
        this.rightAnim = [spriteMap[0][0],spriteMap[1][1],spriteMap[1][2]];
        this.leftAnim  = [spriteMap[0][0],spriteMap[2][1],spriteMap[2][2]];
        this.downAnim  = [spriteMap[0][0],spriteMap[3][1],spriteMap[3][2]];
        this.upAnim    = [spriteMap[0][0],spriteMap[4][1],spriteMap[4][2]];
        this.score = 0;
    }

    animation() {
        this.step++;
        switch (true) {
            case  this.step > this.stepCountAtFrame : this. step = 0; this.changeSprite();
        }
        switch (this.keysDown) {
            case 'up':    return this.upAnim[this.curSprite];
            case 'left':  return this.leftAnim[this.curSprite];
            case 'down':  return this.downAnim[this.curSprite];
            case 'right': return this.rightAnim[this.curSprite];
            default:      return this.rightAnim[this.curSprite];
        }
    }

    move(){
        this.tryEat();
        super.move();
    }

    tryEat() {
        for (let i =0; i< area.length; i++) {
            for(let j = 0; j< area[i].length;j++) {
                if(area[i][j]===2 && this.i === i && this.j === j  ) {
                    area[i][j] =0;
                    this.score++;
                    console.log(this.score);
                    if(this.score === 202) alert('you win')
                }
                if(area[i][j]===3 && this.i === i && this.j === j  ) {
                    area[i][j] =0;
                    creaturesMap.forEach((creature, key, map) => {
                        if(key !== 'pacman') creature.runAway();
                    });
                }
            }
        }

    }
}


function imageLoader (name) {
    let canStart = true;
    imageStatusMap.set(name, true);
    imageStatusMap.forEach((val, key, map) => {
        if(val === false ) canStart = false;
    });
    if(canStart) start();
}

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
        creaturesCrush ();
        creature.move();
        creaturesCrush ();

        let animate = creature.animation();
        playerCanvasCtx.drawImage(
            animate.image,animate.sx,animate.sy,
            animate.sprWidth,animate.sprHeight,
            creature.posX,creature.posY,
            animate.sizeX,animate.sizeY
        );
    });
}

function creaturesCrush () {
    creaturesMap.forEach((creature, key, map) => {
        let xCrush = false;
        let yCrush = false;
        if(key !=='pacman'){

            if (creaturesMap.get('pacman').posX+44 >= creature.posX+8 &&  creaturesMap.get('pacman').posX <= creature.posX+30 ) {xCrush =true }
            if (creaturesMap.get('pacman').posY+44 >= creature.posY+8&&  creaturesMap.get('pacman').posY <= creature.posY+30 ) {yCrush =true }

            if(yCrush && xCrush) {
                if (creature.needRun) {
                    creature.dead();
                } else {
                    creaturesMap.get('pacman').dead();
                }
            }
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
    creaturesMap.set('pacman',    new Pacman(spriteParser(playerSprite,5,3), 44,    44*19, 19,1,2,2, 5.5));

    creaturesMap.set('redGhost',    new Ghost(spriteParser(redSprite,9,2),   44,    44,    1, 1, 1,6, 4,'angry'));
    creaturesMap.set('blueGhost',   new Ghost(spriteParser(blueSprite,9,2),  44*11, 44*9,  9, 11,1,6, 4,'dumb'));
    creaturesMap.set('pinkGhost',   new Ghost(spriteParser(pinkSprite,9,2),  44*10, 44*10, 10,10,1,6, 4,'fiftyFifty'));
    creaturesMap.set('yellowGhost', new Ghost(spriteParser(yellowSprite,9,2),44*12, 44*10, 10,12,1,6, 4,'fiftyFifty'));

    drawMap();
    drawPoints();
    loop();
}

function loop() {
    drawCreatures();
    drawPoints();
    if(!creaturesMap.get('pacman').itIsDead){
        setTimeout( loop,frameRate);
    } else {
        setTimeout( start,150);
    }
}

function reset (){
    resetArea();
    life = 2;
}


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
    imageStatusMap.set('blueGhost',false);
    imageStatusMap.set('pinkGhost',false);
    imageStatusMap.set('yellowGhost',false);

    redSprite.src       = "images/red.png";
    blueSprite.src      = "images/blue.png";
    pinkSprite.src      = "images/pink.png";
    yellowSprite.src    = "images/yellow.png";
    playerSprite.src    = "images/pacman.png";
    playerSprite.onload = function () { imageLoader('pacman') };
    redSprite.onload    = function () { imageLoader('redGhost') };
    blueSprite.onload   = function () { imageLoader('blueGhost') };
    pinkSprite.onload   = function () { imageLoader('pinkGhost') };
    yellowSprite.onload = function () { imageLoader('yellowGhost') };

    resetArea();
};


