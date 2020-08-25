var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_cloud;
var obstacles1,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6;
var ObstaclesGroup;
var CloudsGroup;
var score=0;
var PLAY=0,END=1;
var gameState=PLAY;
var GAMEOVER,gameOver;
var Restart,restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloud_cloud=loadImage("cloud.png");
  
  obstacles1=loadImage("obstacle1.png");
  obstacles2=loadImage("obstacle2.png");
  obstacles3=loadImage("obstacle3.png");
  obstacles4=loadImage("obstacle4.png");
  obstacles5=loadImage("obstacle5.png");
  obstacles6=loadImage("obstacle6.png");
  
  gameOver=loadImage("gameOver.png");
  
  restart=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  ObstaclesGroup=new Group();
  CloudsGroup=new Group();
  
  GAMEOVER=createSprite(300,100,10,10);
  GAMEOVER.addImage(gameOver);
  GAMEOVER.scale=0.5;
  GAMEOVER.visible=false;
  
  Restart=createSprite(300,150,10,10);
  Restart.addImage(restart);
  Restart.scale=0.5;
  Restart.visible=false;
}

function draw() {
  background(100);
  spawnClouds();
  spawnObstacles();
  text("score"+score,500,100);
  if(gameState===PLAY){
     score=score+Math.round(getFrameRate()/60);
  if(keyDown("space")&&trex.y>100) {
    trex.velocityY = -10;
  
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(ObstaclesGroup.isTouching(trex)){
      gameState=END;
      
       
     }
  }
else if(gameState===END){
      trex.velocityX=0;
  ground.velocityX=0;
  CloudsGroup.setVelocityXEach(0);
  ObstaclesGroup.setVelocityXEach(0);
  ObstaclesGroup.setLifetimeEach(-1);
  CloudsGroup.setLifetimeEach(-1);
  trex.changeAnimation("running",trex_collided);
  trex.addAnimation("running",trex_collided);
  //ObstaclesGroup.destroyEach();
  //CloudsGroup.destroyEach();
  GAMEOVER.visible=true;
  Restart.visible=true;
  if(mousePressedOver(Restart)){
    reset();
     }
        }
  trex.collide(invisibleGround);
 
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60===0){
  var cloud=createSprite(400,100,10,10);
  cloud.velocityX=-3;
    cloud.lifetime=134;
    cloud.addImage("cloud",cloud_cloud);
    cloud.scale=0.5;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloud.y=random(50,100);
    CloudsGroup.add(cloud);
     }
}

function spawnObstacles(){
  if(frameCount%60===0){
     var obstacles=createSprite(400,175,10,10);
   obstacles.scale=0.6;
    obstacles.velocityX=-4;
    obstacles.lifetime=134;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacles.addImage("obstacle1",obstacles1);
        break;
        case 2:obstacles.addImage("obstacle2",obstacles2);
        break;
        case 3:obstacles.addImage("obstacle3",obstacles3);
        break;
        case 4:obstacles.addImage("obstacle4",obstacles4);
        break;
        case 5:obstacles.addImage("obstacle5",obstacles5);
        break;
        case 6:obstacles.addImage("obstacle6",obstacles6);
        break;
        default:break;
  }   
    ObstaclesGroup.add(obstacles);    
  } 
}
function reset(){
  gameState=PLAY
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  Restart.visible=false;
  GAMEOVER.visible=false;
  trex.changeAnimation("running",trex_running);
  trex.addAnimation("running",trex_running);
  score=0;
}

