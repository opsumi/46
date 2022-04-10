var balloon;
var database;
var height;
var shooter;

function preload(){
   bg =loadImage("Images/cityImage.png");
   shooterImg =loadImage("Images/shoot.gif")
   bImg = loadImage("Images/im.gif")
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addImage(bImg);
  shooter=createSprite(200,400,150,150);
  shooter.addImage(shooterImg);
  shooter.scale = 0.5;
  balloon.scale=0.5;
   
  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    
    balloon.scale=balloon.scale+0.005;
    
  }
  shooter.x = balloon.x;
  shooter.y = balloon.y;
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }




 function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }



function showError(){
  console.log("Error in writing to the database");
}