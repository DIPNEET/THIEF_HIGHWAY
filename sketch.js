var ground,ground1,thief,bullet,people,police,currency,Go,GoImage,laser,thiefS,copS,bb,t,c;
var policeGroup,peopleGroup,bulletGroup,laserGroup,restart;
var gamestate="play"
var edges
function preload(){
ground1= loadImage("background.jpg"); 
GoImage= loadImage("go.png"); 
thiefS=loadSound("thief.mp3");
copS=loadSound("cops/cevilians.mp3");
bb=loadSound("shoot.mp3");
t=loadImage("cop.png")
c=loadAnimation("b1.png","b2.png")
c1=loadImage("c1.png")
c2=loadImage("c2.png")
c3=loadImage("c3.png")
}
function setup() {
  createCanvas( innerWidth, innerHeight );
  
  ground = createSprite( 800,400,800,20);
  ground.addImage ("road",ground1)
 ground.scale=2.6;

restart=createSprite(innerWidth/2,50,50,50)
  restart.shapeColor="red"
  restart.visible=false;
bulletGroup=new Group();
policeGroup=new Group();
peopleGroup=new Group();
laserGroup= new Group();
currency=0
Go=createSprite(innerWidth/2, innerHeight/2);
Go.addImage("GO",GoImage);
Go.scale=0.68
thief=createSprite(innerWidth/2,innerHeight,50,100)
thief.addImage("thief",t)
thief.scale=0.75;
edges=createEdgeSprites()
}

function draw() {
  background(215,255,255);  
  if(gamestate==="play"){
    Go.visible=false;
    thief.visible=true;
    restart.visible=false;
    ground.velocityY=+5;
  if (keyDown ("left") ) {
thief.x-=50
  }
  if (keyDown ("right") ) {
    thief.x+=50
      }
      if (keyDown ("space") ) {
        shoot();
        bb.play();
          }
        

          thief.collide(edges)
         // thief.collide(rightEdge)
   Cops();
   civil()
   if(bulletGroup.isTouching(peopleGroup)){
bullet.remove()
people.remove()
copS.play();
currency+=Math.round(random(5,10))
   }
   if(bulletGroup.isTouching(policeGroup)){
    bullet.remove()
    police.remove()
    copS.play()
   }   
   if(laserGroup.isTouching(thief)){
    
    
    gamestate="end"
    thiefS.play();
   }   
   thief.visible=true;
   if(policeGroup.isTouching(thief)){
     police.remove()
     thief.visible=false;
     gamestate="end"
     thiefS.play();
   }
   }

   else if(gamestate==="end"){
    background(0);
    Go.visible= true;
    restart.visible=true;
    thief.visible=false;
    ground.velocityY=0;
    policeGroup.destroyEach()
    peopleGroup.destroyEach()
    bulletGroup.destroyEach()
   }
  //if(ground.y>800){
   // ground.y = ground.height/2;
    //ground.velocityY=+3;
  //}
  if(mousePressedOver(restart)){
    gamestate="play";
    currency=0;
    thief.visible=true
  }
  drawSprites();
  textSize(30);
  if(gamestate==="play"){
  fill(255)
text("Cash:"+currency,innerWidth-160,40);}
if(gamestate==="end"){
  textSize(36);
  
  textFont("chiller")
  fill("white")
text("Cash:"+currency,innerWidth/2-50,innerHeight-100);

  }}
function shoot(){
  if(frameCount % 4  === 0) {
   bullet= createSprite(thief.x,thief.y-50,10,20);
  bullet.velocityY=-10
  bullet.shapeColor="red"
bullet.lifetime=81;
bulletGroup.add(bullet);
  }
}

function Cops(){
  if(frameCount % 175 ===0) {
       police= createSprite(100,-10,50,100)
      police.x= Math.round(random (100,innerWidth-100)) 
      police.addAnimation("police",c);
      police.scale=0.5
      police.velocityY=5+(currency/30)
      police.shapeColor="blue"
      police.lifetime=165;
      policeGroup.add(police);
    
      if((thief.x-8)<police.x || (thief.x+8)>police.x|| thief.x===police.x){
        
        laser =createSprite(police.x,police.y,10,20)
        laser.velocityY=10+2*(currency/30)
        laser.lifetime=81;
        laser.shapeColor="green"
        laserGroup.add(laser);
      }
  }
}
function civil(){
  if(frameCount % 111 ===0) {
       people= createSprite(100,-10,50,100)
       var r=Math.round(random(1,3));
       switch(r){
         case 1:people.addImage("c1",c1);break;
         case 2:people.addImage("c2",c2);break;
         case 3:people.addImage("c3",c3);break;
       }
       people.scale=0.35
      people.x= Math.round(random (100,innerWidth-100)) 
      people.velocityY=5+(currency/30)
      people.shapeColor="red"
      people.lifetime=87;

      peopleGroup.add(people);
  }
}