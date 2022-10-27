
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var fireFighter, fireFighterImg
var bkImg
var weight, weightImg, wall, wallImg
var weight_con_1,weight_con_2
var fire, fireImg
var button, button2
var gameOver, gameOverImg
var axe1, axe2, axeImg, axecon1, axecon2

function preload(){
  bkImg=loadImage("90c5343a00cf098851f2fbea066b1bcb.jpg")
  wallImg=loadImage("wall.png")
  axeImg=loadImage("axe_1fa93.png")
  weightImg=loadImage("weight.png")
  fireImg=loadImage("fire-png.webp")
  fireFighterImg=loadImage("dc465ab6cf99cadd7143269721545a05-firefighter-with-hose-pipe.png")
  gameOverImg=loadImage("game_over_PNG57.png")
}

function setup() {
  createCanvas(800,800);
  frameRate(50)

  engine = Engine.create();
  world = engine.world;
  
  wall=createSprite(70,600,50,50)
  wall.addImage(wallImg)
  wall.scale=0.8

  fireFighter=createSprite(500,700,10,10)
  fireFighter.addImage(fireFighterImg)
  fireFighter.scale=0.4

 gameOver=createSprite(400,400,10,10) 
 gameOver.addImage(gameOverImg)
 gameOver.scale=0.25
 gameOver.visible=false


//fire=createSprite(40, 700, 10, 10)
//fire.addImage(fireImg)
//fire.scale=0.05

fire=Bodies.circle(40,700,50)


  button = createImg('cut-icon.png');
  button.position(160,70);
  button.size(30,30);
  button.mouseClicked(drop);

  button2 = createImg('cut-icon.png');
  button2.position(530, 70);
  button2.size(30,30);
  button2.mouseClicked(drop2);

  //weight=createSprite(470,400,10,10)
  //weight.addImage(weightImg)
  //weight.scale=0.2
var optionw={
isStatic: false
}
  
   weight= Bodies.circle(400,150,100, optionw)
  World.add(world, weight)

  

  rope1=new Rope(11,{x: 600, y: 20})
  rope2=new Rope(11,{x: 100, y: 20 })


 
  weight_con_1=new Link(rope1,weight)
  weight_con_2= new Link(rope2,weight)


  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}


function draw() 
{
  background(51);
  image(bkImg,0,0,width,height)

  push();
  imageMode(CENTER);
  if(weight!=null){
    image(weightImg,weight.position.x,weight.position.y,100,100);
  }
pop();
  push();
  imageMode(CENTER);
  if(axe1!=null){
    image(axeImg,axe1.position.x,axe1.position.y,50,50);
  }
  pop();
 
  push();
  imageMode(CENTER);
  if(axe2!=null){
    image(axeImg,axe2.position.x,axe2.position.y,50,50 );

  }
  pop();

  push();
  imageMode(CENTER);
  if(fire!=null){
    image(fireImg,fire.position.x,fire.position.y,200,300 );

  }
  pop();

  if(collide(weight, wall, 160)){
    wall.remove()
    fireFighter.velocityX=-6
  }


if(collide(weight, fireFighter,80)){
  fireFighter.remove()
  gameOver.visible=true
  
}
if(collide(fire, fireFighter,80)){
//  fireFighter.remove()
  fire=null;
  fireFighter.velocityX=0
  
}


  

  rope1.show();
  rope2.show();
  

 
  Engine.update(engine);
  


  drawSprites()

  }

function drop()
{
 rope2.break()
 weight_con_2.dettach()
 weight_con_2=null
 

}


function drop2()
{
 

  rope1.break()
  weight_con_1.dettach()
  weight_con_1=null
 
}
function collide(body,sprite,x)
{
  if(body!=null)
  {
   var d = dist(body.position.x,body.position.y, sprite.position.x, sprite.position.y);
    if(d<=x)
      {
      
         return true;  
      }
      else{
        return false;
      }
   }
}
