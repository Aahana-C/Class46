var bg, bgImage;
var ground, Lily;
var PLAY = 1
var END = 0
var gameState = 1;
var count = -1;
var obstacle;
function setup() {
createCanvas(displayWidth, displayHeight-80);  
ground = createSprite(displayWidth/2,displayHeight-100,displayWidth,60);
ground.shapeColor=rgb(109,74,14);
ground.velocityX = -2
//bg.addImage("background",bgImage);
//bg.scale = 1.0;*/

Lily = createSprite(120,displayHeight-250, 40, 20);
Lily.addImage("background",playerImage1);
Lily.scale = 1.0;

Lily.debug = true;
Lily.setCollider("rectangle",0,50,190,190);

obstaclesGroup = new Group();
}

function preload(){
bgImage = loadImage ("games9.jpg");
playerImage1 = loadImage ("Player2.png");
Lily_collided = loadImage("player1.png");
obstacle1 = loadImage ("Obs1.png");
obstacle2 = loadImage ("obs3.png");
obstacle3 = loadAnimation("Bird11.png","Bird12.png","Bird13.png");

}

function draw() {
background(bgImage);
console.log(ground.x);


if(gameState === 1){
        
        if(ground.x<800){
           ground.x = displayWidth/2;
        }
                
                
        if(keyDown("space")&& Lily.y >= 100) {
                Lily.velocityY = -12;
                        //jumpSound.play();
        }
                    
                    //add gravity
        Lily.velocityY = Lily.velocityY + 0.8
                
        spawnObstacles();

        if(obstaclesGroup.isTouching(Lily)){
                //trex.velocityY = -12;
                //jumpSound.play();
                count = count+1;
                switch(count){
                        case 0:Lily.scale = 0.8;
                        gameState =1;
                        break;
                        case 1: Lily.scale = 0.6;
                        gameState =1;
                        break;
                        case 2:  gameState = 0;
                        break;
                }
                
                

              
            }        

}

else if(gameState === 0){
       // gameOver.visible = true;
       // restart.visible = true;
       
       //change the trex animation
        Lily.changeAnimation("collided", Lily_collided);
      
     /*  if(mousePressedOver(restart)) {
        reset();
      }*/
       
        ground.velocityX = 0;
        Lily.velocityY = 0
        
       
        //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
    //  cloudsGroup.setLifetimeEach(-1);
       
       obstaclesGroup.setVelocityXEach(0);
     //  cloudsGroup.setVelocityXEach(0);          
}




Lily.collide(ground);
drawSprites();  
}


function spawnObstacles(){
    if (frameCount % 100 === 0){
      obstacle = createSprite(displayWidth-50,displayHeight-175,10,40);
      obstacle.velocityX = -6;
      obstacle.debug = true;
      obstacle.setCollider("rectangle",0,50,280,280);
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addAnimation("bird",obstacle3);
                 break;
        
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.3;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }
   
  

