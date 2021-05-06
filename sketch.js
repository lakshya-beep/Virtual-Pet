//Create variables here 
var  dog, happyDog;

var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(500,500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.4;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);


  var title = createElement('h3');
  title.html('Press the up arrow key to feed the virtual dog.');
  title.position(430,80);

  var heading = createElement('h1');
heading.html('VIRTUAL PET GAME');
heading.position(450,30);

    
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  //add styles here
  strokeWeight(2)
  stroke("black");
  fill("black");

textSize(20);
  text("Food Remaining: " + foodS, 180,480);
}



function readStock(data){
  foodS=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}

