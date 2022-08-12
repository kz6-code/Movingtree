let trunkLen =    199;   // length of the trunk
let windInc =     0.01;  // how quickly wind changes speed 

let windSpeed =   0;     // speed, which will = angle of bend
let noisePos =    0;     // "position" in the Perlin noise

// for the fancier Pythagoras tree
let branchAngle = 30;    // angle between two branches
let minLen =      5;    // minimum size of branches  og: 5

var points = [];
var grass = [];
var across;
var up;
var wind;
var blow;


function setup() {
  across=window.innerWidth;
  up=window.innerHeight;
  createCanvas(window.innerWidth, window.innerHeight);// creates canvas the size of device
  //fr = createP('Frame Rate: '); 
  for(var i=0; i<50; i++) {
    grass[i]=random(-5,5);
  }
  wind=0;
  blow=true; 
}


function draw() {
  background(235, 218, 169); // 50 as well 204, 255, 255
  field();

  push();
  translate(width/2, height);
  stroke('#73401C') // 255 looks good as well 
  strokeWeight(3);  // og : 3
  line(0, 0, 0, -trunkLen);
  branch(trunkLen);
  pop();

  
  // update wind speed using 1D Perlin noise
  // noise() returns a value 0 to 1, so mult by 30 means
  // the wind speed will result in an angle of 0-30º
  windSpeed = noise(noisePos) * 30;
  noisePos += windInc;
  
  // random() will generate movement that is jerky and unrealistic
  //fr.html("Frame Rate: " + floor(frameRate())) 
}

function field(){
  breeze();
  
  fill('#73401C');
  var i=0;
  var p=0;
  for(var z=up-50; z<=up+30; z=z+3){
    for(var k=-50; k<across+0; k=k+30){
    stroke('#73401C');
    //stroke(50*constrain(grass[i],1,5));
    strokeWeight(1);
    //line(k+p, z, k+grass[i]+p+wind*((p+10)/20), z-20+constrain(grass[i],-2,2));
    line(k+p, z, k+grass[i]+p+wind, z-50+constrain(grass[i],-2,2)-10);
    i++;
    if(i== 50){
      i=-25;                   /// LATER TESTS
    }
    }
   p=p+3;
  }
}

function breeze(){
  if(wind==0){
    blow=true;
  }
  if(wind<10 && blow==true){
  wind=wind+.5;
  }
   if(wind==7){
    blow=false;
  }
  if(wind>0 && blow==false){
  wind=wind-.5;
  }
}

// a recursive function to draw the tree
// on recursive functions, see Basics > Recursion)
function branch (len) {
 
  // store previous and reduce branch length
  let prevLen = len;
  len *= 0.5 * sqrt(2);    // experiment with changing this and see what happens
  
  // keep going until the branches are too small
  if (len > minLen) {
    
    // larger branches are stiffer than little ones
    let stiffness = map(len, minLen, trunkLen, 1.0, 0.2);
  
    // add some twist based on the wind speed and stiffness
    let twist = windSpeed * stiffness;
    
    // draw left branches
    push();                                 // local mode
    translate(0, -prevLen);                 // move up to top of prev branch
    rotate(radians(-branchAngle + twist));  // rotate to new position + twist from wind*
    line(0, 0, 0, -len);                    // draw as a line
    branch(len);                            // call again!
    pop();

    // *NOTE i only add twist to branches on the left side
    // it's more realistic

    // draw right branches too
    push();
    translate(0, -prevLen);
    rotate(radians(branchAngle));
    line(0, 0, 0, -len);
    branch(len);
    pop();
  }
}
