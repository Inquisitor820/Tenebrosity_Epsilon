const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;


//gameState
TITLES = 0;
METHOD = 4;
PLAY = 1;
END = 2;
OVER = 3;
gameState = 0;

var canvas;

//platforms
var platform1,platform2,platform3,platform4,platform5;
var platform6,platform7,platform8,platform9,platform10;
var platform11,platform12,platform13;
var ladder,ladder2;

//player
var player,plrS;

//spikes
var sp1,sp2,sp3;

//NPC
var g1,g2;
var L1,L2,L3,L4,L5;

//end
var endbox;

//invisiplatforms
var p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24,p25;
var pGroup;



function preload()
{
   titleImg = loadImage("images/TitleScreen_BG_Final.jpg");
   endScreen = loadImage("images/endscreen.png");
   overScreen = loadImage("images/overscreen.png");
   gameImg = loadImage("images/game_bg.png");
   ladderImg = loadImage("images/ladder.png");
   sign = loadImage("images/ITSASIGN.png");
   instructions = loadImage("images/Instructions.png");

   plrLeft = loadImage("images/left.png");
   plrRight = loadImage("images/right.png");


   titlescreenMusic = loadSound("sounds/Shattered-Reality.mp3")
   gameMusic = loadSound("sounds/Ambient_Forest.mp3")
   victory = loadSound("sounds/VICTORY.mp3");
   defeat = loadSound("sounds/DEFEAT.mp3");

   spike = loadImage("images/spikes.png");
   absorb = loadSound("sounds/hitL.mp3");
   hit = loadSound("sounds/damageG.mp3")
   hurt = loadSound("sounds/Itai.mp3");
  
  //Playersounds
  s1=loadSound("sounds/stepS/01.flac")
  s2=loadSound("sounds/stepS/02.flac")
  s3=loadSound("sounds/stepS/03.flac")
  s4=loadSound("sounds/stepS/04.flac")
  s5=loadSound("sounds/stepS/05.flac")
  s6=loadSound("sounds/stepS/06.flac")
  s7=loadSound("sounds/stepS/07.flac")
  s8=loadSound("sounds/stepS/08.flac")
  s9=loadSound("sounds/stepS/09.flac")

  
  //LuminiAnimation
  L_AniLeft = loadAnimation("images/lumini/left/1.png","images/lumini/left/2.png","images/lumini/left/3.png");
  L_AniRight = loadAnimation("images/lumini/right/1.png.png","images/lumini/right/2.png.png","images/lumini/right/3.png.png");

  //GloomaxiAnimation
  G_AniLeft = loadAnimation("images/gloomaxi/left/1.png","images/gloomaxi/left/2.png","images/gloomaxi/left/3.png");
  G_AniRight = loadAnimation("images/gloomaxi/right/1.png.png","images/gloomaxi/right/2.png.png","images/gloomaxi/right/3.png.png");
}

function setup()
{
  engine = Engine.create();
  world = engine.world;
  canvas=createCanvas(700,700);
  titlescreenMusic.play();

 pGroup = createGroup();
 lGroup = createGroup();


//ladder
ladder = createSprite(-3305,-105,10,575)

ladder.addImage(ladderImg)
ladder.scale = 0.3
ladder2 = createSprite(-1430,-90,10,575)
ladder2.addImage(ladderImg)
ladder2.scale = 0.3

//spikes
sp1 = createSprite(-3537,-13,125,10)
sp1.addImage(spike)
sp1.scale = 0.25;

sp2 = createSprite(-2962,-13,125,10)
sp2.addImage(spike)
sp2.scale = 0.25;

sp3 = createSprite(-2450,-8,125,10)
sp3.addImage(spike)
sp3.scale = 0.2;

var asign = createSprite(430,-95,30,200)
asign.addImage(sign)
asign.scale = 0.3

//player
player = createSprite(-4025,-170,50,80);
player.shapeColor = "black"
player.addImage("r",plrRight)
player.addImage("l",plrLeft)
player.scale = 0.3;
player.setCollider("rectangle",0,0,player.width+5,player.height);
player.debug = false;

//end - player touches it and gamestate = end
endBox = createSprite(490,-150,30,200)
endBox.shapeColor = "white"
endBox.visible = false;

//luminis
L1 = createSprite(-3167.5,-217,40,45);
L1.shapeColor = "white";
L1.addAnimation("right",L_AniRight)
L1.addAnimation("left",L_AniLeft)
L1.scale = 0.2;
L1.velocityX = 2.5;

L2 = createSprite(-2627.5,-148.8,40,45)
L2.shapeColor = "white";
L2.addAnimation("right",L_AniRight)
L2.addAnimation("left",L_AniLeft)
L2.scale = 0.2;
L2.velocityX = 2.75;

L3 = createSprite(-2130,-53,40,45)
L3.shapeColor = "white";
L3.addAnimation("left",L_AniLeft)
L3.addAnimation("right",L_AniRight)
L3.scale = 0.2;
L3.velocityX = -2.35;

L4 = createSprite(-1800,-26,40,45)
L4.shapeColor = "white";
L4.addAnimation("right",L_AniRight)
L4.addAnimation("left",L_AniLeft)
L4.scale = 0.2;
L4.velocityX = 1.5;

L5 = createSprite(-882.5,-202,40,45)
L5.shapeColor = "white";
L5.addAnimation("left",L_AniLeft)
L5.addAnimation("right",L_AniRight)
L5.scale = 0.2;
L5.velocityX = -3;

//Gloomaxi
g1 = createSprite(-1257.75,-225,40,60)
g1.shapeColor = "red"
g1.addAnimation("l",G_AniLeft)
g1.addAnimation("r",G_AniRight)
g1.scale = 0.4;
g1.velocityX = -1.75;

g2 = createSprite(-300,-85,40,60)
g2.shapeColor = "red"
g2.addAnimation("l",G_AniLeft)
g2.addAnimation("r",G_AniRight)
g2.scale = 0.4;
g2.velocityX = -1.5;

//invisiplatform
p1 = createSprite(-3850,-30,500,150);
p1.visible = false;
pGroup.add(p1);
p2 = createSprite(-3375,-10,200,10);
p2.visible = false;
pGroup.add(p2);
p3 = createSprite(-3537.5,23,125,10);
p3.visible = false;
pGroup.add(p3);
p4 = createSprite(-3150,-70,250,251);
p4.visible = false;
pGroup.add(p4);
p5 = createSprite(-2962.5,23,125,10);
p5.visible = false;
pGroup.add(p5);
p6 = createSprite(-2700,-25,400,200);
p6.visible = false;
pGroup.add(p6);
p7 = createSprite(-2450,23,100,10);
p7.visible = false;
pGroup.add(p7);
p8 = createSprite(-2175,12.5,450,80);
p8.visible = false;
pGroup.add(p8);
p9 = createSprite(-1675,21,550,40);
p9.visible = false;
pGroup.add(p9);
p10 = createSprite(-1000,-57.5,800,240);
p10.visible = false;
pGroup.add(p10);
p11 = createSprite(0,15,1200,120);
p11.visible = false;
pGroup.add(p11);

//FOR_L1
p12 = createSprite(-3247.5,-220,5,45)
p12.visible = false;
p13 = createSprite(-3037.5,-220,5,45)
p13.visible= false;
//FOR_L2
p14 = createSprite(-2527.5,-148.8,5,45)
p14.visible = false;
p15 = createSprite(-2727.5,-148.8,5,45)
p15.visible = false;
//FOR_L3
p16 = createSprite(-2330,-47.5,5,45)
p16.visible = false;
p17 = createSprite(-2030,-47.5,5,45)
p17.visible = false;
//FOR_L4
p18 = createSprite(-1890,-26,5,45)
p18.visible = false;
p19 = createSprite(-1750,-26,5,45)
p19.visible = false;
//FOR_L5
p20 = createSprite(-950,-202,5,45)
p20.visible = false;
p21 = createSprite(-650,-202,5,45)
p21.visible = false;
//For_G1
p24 = createSprite(-1035,-202,5,45)
p24.shapeColor = "red"
p24.visible = false;
p25 = createSprite(-1350,-202,5,45)
p25.shapeColor = "green"
p25.visible= false;
//For_G2
p22 = createSprite(-535,-65,5,45)
p22.shapeColor = "red"
p22.visible = false;
p23 = createSprite(-80,-65,5,45)
p23.shapeColor = "red"
p23.visible= false;

//platforms
 platform1 = new Ground(250, 625, 500, 150);
 platform2 = new Ground(475,50, 200,50);
 platform3 = new Ground(225,-100,250,250);
 platform4 = new Ground(450,50,400,200);
 platform5 = new Ground(525,50,450,80);
 platform6 = new Ground(500,10,550,40);
 platform7 = new Ground(675,-100,800,240);
 platform8 = new Ground(-2537,110,125,10);
 platform9 = new Ground(575,0,125,10);
 platform10 = new Ground(512,0,100,10);
 platform11 = new Ground(2450,-20,1200,120);
 
}

function draw()
{ 
console.log(gameState)
console.log(player.x, player.y)


//TitleScreen
  if(gameState === TITLES)
  {
    background(titleImg);
      if(keyDown("a"))
      {
        gameState = METHOD;
      }
  }

if(gameState === METHOD)
{
  canvas.resize(1000,700);   
  background(instructions)
  

        if(keyDown("e"))
      {
        gameState = PLAY;
        gameMusic.play();
      }
}
 

//*********************\\
//GAME
if(gameState === PLAY)
{

Engine.update(engine)
canvas.resize(4614,700)
 background(gameImg);
titlescreenMusic.stop(); 

//platform_displays
platform1.display();
platform2.display();
platform3.display();
platform4.display();
platform5.display();
platform6.display();
platform7.display();
platform8.display();
platform9.display();
platform10.display();
platform11.display();

textSize(35);
fill("white");
stroke("white");
strokeWeight(1)
textFont("courier")
text('Objective:',-4050,-625);
fill("white");
textSize(25)
text("Absorb the Light from the local Luminis..",-4050,-580);
text("..& proceed to the end point while avoiding the 2 Gloomaxi Knights.",-4050,-550)

 
//player

plrS = createSprite(player.x,player.y,100,1)
plrS.shapeColor = "white";
plrS.visible = false;

Dmg()

player.visible = true;
 if (keyDown("a") || keyDown("left_arrow"))
    {
        player.x=player.x-5
        player.changeImage("l",plrLeft)
        stepSound()
    }
    
    if (keyDown("d") || keyDown("right_arrow"))
    {
        player.x=player.x+5
        player.changeImage("r",plrRight)
        stepSound()
    }  

    if(keyDown("w") || keyDown("up_arrow"))
    {
        player.y= player.y-5
    }
    
    if(keyDown("S") || keyDown("down_arrow"))
    {
        player.y = player.y+5
    }

LuminiGone()

//player_gravityandjump
 if(keyDown("space")&& player.y >= -250) 
 {
   player.velocityY = -12;
 }  
 player.velocityY = player.velocityY + 1.5 


//collisions
player.collide(pGroup);
player.collide(endBox);

//L
if(L1.collide(p13))
  {
    L1.changeAnimation("left",L_AniLeft)
    L1.velocityX=-2.5    
  }
  else if(L1.collide(p12))
  {
    L1.changeAnimation("right",L_AniRight)
    L1.velocityX=2.5    
  }

if(L2.collide(p14))
  {
    L2.changeAnimation("left",L_AniLeft)
    L2.velocityX=-2.75    
  }
  else if(L2.collide(p15))
  {
    L2.changeAnimation("right",L_AniRight)
    L2.velocityX=2.75    
  }

if(L3.collide(p16))
  {
    L3.changeAnimation("right",L_AniRight)
    L3.velocityX=2.35    
  }
  else if(L3.collide(p17))
  {
    L3.changeAnimation("left",L_AniLeft)
    L3.velocityX=-2.35    
  }

if(L4.collide(p18))
  {
    L4.changeAnimation("right",L_AniRight)
    L4.velocityX=1.5    
  }
  else if(L4.collide(p19))
  {
    L4.changeAnimation("left",L_AniLeft)
    L4.velocityX=-1.5    
  }

if(L5.collide(p20))
  {
    L5.changeAnimation("right",L_AniRight)
    L5.velocityX=3
  }
  else if(L5.collide(p21))
  {
    L5.changeAnimation("left",L_AniLeft)
    L5.velocityX=-3  
  }

if(g2.collide(p22))
  {
    g2.changeAnimation("r",G_AniRight)
    g2.velocityX=1.5    
  }
  else if(g2.collide(p23))
  {
    g2.changeAnimation("l",G_AniLeft)
    g2.velocityX=-1.5    
  }

if(g1.collide(p25))
  {
    g1.changeAnimation("r",G_AniRight)
    g1.velocityX=1.5    
  }
  else if(g1.collide(p24))
  {
    g1.changeAnimation("l",G_AniLeft)
    g1.velocityX=-1.5    
  }

L1.bounceOff(p12)
L1.bounceOff(p13)
L2.bounceOff(p14)
L2.bounceOff(p15)
L3.bounceOff(p16)
L3.bounceOff(p17)
L4.bounceOff(p18)
L4.bounceOff(p19)
L5.bounceOff(p20)
L5.bounceOff(p21)
g2.bounceOff(p22);
g2.bounceOff(p23);
g1.bounceOff(p24);
g1.bounceOff(p25);

drawSprites();

}
//**********************\\
  //END
  if(player.x > 0 && plrS.isTouching(endBox))
{
  gameState = END;
canvas.resize(1000,800)

}
if(gameState === END)
{ 
  background(endScreen)
    gameMusic.stop()
    victory.play();
 }

 if(gameState === OVER)
 {
   canvas.resize(1000,800)
   background(overScreen)  
      defeat.play();
    gameMusic.stop()
    
 }
}



function stepSound()
{
    var rand = Math.round(random(1,80));
    switch(rand) {
      case 1: s1.play()
              break;
      case 2: s2.play()
              break;
      case 3: s3.play()
              break;
      case 4: s4.play()
              break;
      case 5: s5.play()
              break;
      case 6: s6.play()
              break;
      case 4: s7.play()
              break;
      case 5: s8.play()
              break;
      case 6: s9.play()
              break;        
      default: break;
    }
}
function LuminiGone()
{
  if(plrS.isTouching(L1)) //&& keydown(SPACE)
  {
          L1.destroy()
          absorb.play();
          player.shapeColor =  103, 103, 103;
  }
  if(plrS.isTouching(L2))
  {
        L2.destroy();
        absorb.play();
        player.shapeColor = 134, 134, 134;
  }
  if(plrS.isTouching(L3))
  {
          L3.destroy();
          absorb.play();
          player.shapeColor = 187, 187, 187;
  }
  if(plrS.isTouching(L4))
  {
          L4.destroy();
          absorb.play();
          player.shapeColor = 209, 209, 209;
  }
  if(plrS.isTouching(L5))
  {
          L5.destroy();
          absorb.play();
          player.shapeColor = "white";
  }
}
function Dmg()
{
  if(plrS.isTouching(sp1))
    {
        hurt.play();
        player.x=-4025
        player.y=-170
        player.shapeColor = "black";
    }
    if(plrS.isTouching(sp2))
    {
        hurt.play();
               player.x=-4025
        player.y=-170 
        player.shapeColor = "black";
    }
    if(plrS.isTouching(sp3))
    {
        gameState = OVER;
    }
 
 if(plrS.isTouching(g1))
 {
        hurt.play();
        player.x=-4025
        player.y=-170
        g1.destroy();
        player.shapeColor = "black";
 }

 if(plrS.isTouching(g2))
 {
   gameState = OVER;
   g2.destroy();
   
 }
}


