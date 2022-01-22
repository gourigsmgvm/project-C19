var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var obst1,obst1Img;
var obst2,obst2Img;
var obst3,obst3Img;
var obst1Group,obst2Group,obst3Group;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  obst1Img = loadImage("obstacle1.png");
  obst2Img = loadImage("obstacle2.png");
  obst3Img = loadImage("obstacle3.png");

  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");


}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist

//mainCyclist.setCollission("rectangle",0,0,40,40);
mainCyclist.setCollider("rectangle",0,0,40,40);
//mainCyclist.setCollission("rectangle",0,0,40,40,50);
//mainCyclist.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

obst1Group = new Group();
obst2Group = new Group();
obst3Group = new Group();

  

}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);


  
  if(gameState===PLAY){

   
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .isTouching(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  spawnPlayers();
  spawnObstacles();
  //creating continuous obstacles

  


  if(pinkCG.isTouching(mainCyclist)){
    gameState = END;
    player1.velocityY = 0;
    player1.addAnimation("opponentPlayer1",oppPink2Img);
   }
   
   if(yellowCG.isTouching(mainCyclist)){
     gameState = END;
     player2.velocityY = 0;
     player2.addAnimation("opponentPlayer2",oppYellow2Img);
   }
   
   if(redCG.isTouching(mainCyclist)){
     gameState = END;
     player3.velocityY = 0;
     player3.addAnimation("opponentPlayer3",oppRed2Img);
   }

   if(obst1Group.isTouching(mainCyclist))
   {
     obst1Group.velocityX=0;
     gameState = END;
    
   }

   if(obst2Group.isTouching(mainCyclist))
   {
     obst2Group.velocityX=0;
     gameState = END;
    
   }
   
   if(obst3Group.isTouching(mainCyclist))
   {
     obst3Group.velocityX=0;
     gameState = END;
    
   }
}
else if(gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    obst1Group.setVelocityXEach(0);
    obst1Group.setLifetimeEach(-1);

    obst2Group.setVelocityXEach(0);
    obst2Group.setLifetimeEach(-1);

    obst3Group.setVelocityXEach(0);
    obst3Group.setLifetimeEach(-1);
	
    
    // if(keyDown("UP_ARROW")) {
    //   reset;
    // }

    // if(key("UP_ARROW")) {
    //   reset();
    // }

    // if(keyDown()) {
    //   reset();
    // }

     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function obstacle1(){
  obst1 = createSprite(1100,Math.round(random(50,250)));
  obst1.scale =0.08;
  obst1.velocityX = -(6+2*distance/200);
  obst1.addImage("cone",obst1Img);
  obst1Group.add(obst1);
   //assigning lifetime to the obstacle
   obst1.setLifetime=300;

}

function obstacle2(){
  obst2 = createSprite(1100,Math.round(random(50,250)));
  obst2.scale =0.08;
  obst2.velocityX = -(6+2*distance/200);
  obst2.addImage("pit",obst2Img);
  obst2Group.add(obst2);
   //assigning lifetime to the obstacle
   obst2.setLifetime=300;
 
}

function obstacle3(){
  obst3 = createSprite(1100,Math.round(random(50,250)));
  obst3.scale =0.08;
  obst3.velocityX = -(6+2*distance/200);
  obst3.addImage("nail",obst3Img);
  obst3Group.add(obst3);
   //assigning lifetime to the obstacle
   obst3.setLifetime=300;

}


function spawnPlayers()
{
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if(select_oppPlayer == 3){
      redCyclists();
    }
  }
}

function spawnObstacles()
{
  var add_obstacle = Math.round(random(1,3));

  if(distance>500)
  {
    if(World.frameCount % 200 == 0)
    {
      if(add_obstacle == 1){
        obstacle1();
      }
      else if(add_obstacle == 2){
        obstacle2();
      }
      else if(add_obstacle == 3){
        obstacle3();
      }
    }
  }
}


//function reset{
//  gameState = END;
//  gameOver.visible = false;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 0;
// }

//function reset{
//  gameState = PLAY;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroy();
//  yellowCG.destroy();
//  redCG.destroy();
  
//  distance = 0;
// }

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();

  obst1Group.destroyEach();
  obst2Group.destroyEach();
  obst3Group.destroyEach();
  
  distance = 0;
 }

//function reset(){
//  gameState = END;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 50;
// }

