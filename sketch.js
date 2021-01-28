var pacman,ghost1,ghost2,ghost3,ghost4
var ghost1image,ghost2image,ghost3image,ghost4image
var score=0
var gamestate="play"
var lifeline=1
function preload(){
  pacmanimage=loadImage("pacman.png")
  backgroundimg=loadImage("Bg.png")
  ghost1img=loadImage("ghost1.png")
  ghost2img=loadImage("ghost2.png")
  ghost3img=loadImage("ghost3.png")
  ghost4img=loadImage("ghost4.png")
  eat=loadSound("eat2sound.mp3")
  cherryimage=loadImage("cherry.png")
  die=loadSound("diesound.mp3")
  restartimage=loadImage("restart.jpg")
  trophyImage=loadImage("trophy.png")
  gameoverimage=loadImage("gameover.png")
}

function setup() {
  createCanvas(1000,600)
  pacman=createSprite(100,550,50,50)
  pacman.addImage(pacmanimage)
  pacman.scale=0.08
 
  ghost1=createSprite(100,100,10,10)
  ghost1.addImage(ghost1img)
  ghost1.scale=0.1

  trophy=createSprite(100,100,10,10)
  trophy.addImage(trophyImage)
  trophy.scale=0.130
  restart=createSprite(950,550,10,10)
  restart.addImage(restartimage)
  restart.scale=0.050

  ghost2=createSprite(150,100,10,10)
  ghost2.addImage(ghost2img)
  ghost2.scale=0.1

  ghost3=createSprite(200,100,10,10)
  ghost3.addImage(ghost3img)
  ghost3.scale=0.05

  ghost4=createSprite(250,100,10,10)
  ghost4.addImage(ghost4img)
  ghost4.scale=0.08

  cherryG=new Group()

  ghost1.velocityY=4
  ghost1.velocityX=1
  ghost2.velocityX=4
  ghost2.velocityY=3
  ghost3.velocityX=6
  ghost3.velocityY=4
  ghost4.velocityX=8
  ghost4.velocityY=3

}
function draw(){
  background(backgroundimg)
  edges= createEdgeSprites()
if(gamestate==="play"){
 
  if(pacman.isTouching(trophy)){
    textSize(50)
    fill("blue")
   text("You won",500,400)
   ghost1.destroyEach();
   ghost2.destroyEach();
   ghost3.destroyEach();
   ghost4.destroyEach();
   cherryG.destroyEach()


  }
  pacman.bounceOff(edges)
  ghost1.bounceOff(edges)
  ghost2.bounceOff(edges)
  ghost3.bounceOff(edges)
  ghost4.bounceOff(edges)

  pacman.setVelocity(0,0)
  
  if(keyDown("UP_ARROW")){
    pacman.velocityY=-5
    eat.play()
  }
  if(keyDown("DOWN_ARROW")){
    pacman.velocityY=5
    eat.play()
  }
  if(keyDown("RIGHT_ARROW")){
    pacman.velocityX=6
    eat.play()
  }
  if(keyDown("LEFT_ARROW")){
    pacman.velocityX=-5
    eat.play()
  }

  if(frameCount%30===0)
{
  cherry=createSprite(Math.round(random(5,1000)),Math.round(random(10,600)),1,1)
  cherry.velocityX=3
  cherry.addImage(cherryimage)
  cherry.lifetime=100
  cherry.scale=0.007
  cherryG.add(cherry)
}

if(cherryG.isTouching(pacman)){
  cherryG.destroyEach()
  score=score+50
}



if(pacman.isTouching(ghost1)||
pacman.isTouching(ghost2)||
pacman.isTouching(ghost3)||
pacman.isTouching(ghost4)){
die.play()
pacman.destroy()
gamestate="end"
}
}





if(mousePressedOver(restart)){
  reset()
}




  drawSprites()
  fill("red")
  textSize(30)
  stroke("black")
  text("SCORE "+score,500,50)
}

function reset()
{
  
  if(lifeline<=4){
    lifeline=lifeline+1
  pacman=createSprite(100,550,50,50)
  pacman.addImage(pacmanimage)
  pacman.scale=0.08
  
  gamestate="play"
  }
  else{
   // fill("red")
   // stroke("black")
   // strokeWeight(3)
  //  textSize(40)
   //text("Game Over",400,400)
   var gameover=createSprite(600,200,10,30)
   gameover.scale=0.9
   gameover.addImage(gameoverimage)
   
  }








}
