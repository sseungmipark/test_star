//p5canvas용 width, height 설정(설정이 꼬이기 때문)
let width=windowWidth, height=windowHeight;
let stars=[];
let factor = 100;
let speedSlider;
function setup() {
  createCanvas(width, height);

  //DOM. createSildr(최소, 최대, 기본값)
  speedSlider=createSlider(0,20,5);
  //vactor=(x,y,z) z는 속도감 표현

  for (let i=0; i<500 ; i++) {
    stars[i]=createVector(
      random(-width*factor, width*factor), 
      random(-height*factor, height*factor), 
      random(10,400)
      );
      stars[i].pz=stars[i].z;
   }
}
           
function draw() {
  background(0);
  noStroke();
  fill(255);
  //중앙으로 올수 있게 원점 변경
  translate(width/2, height/2);
  for(let star of stars){
  let x=star.x/star.z; //다가울수록 빨라짐
  let y=star.y/star.z;
  let px=star.x/star.pz;
  let py=star.y/star.pz;


  //속도가 빨라지면 원이 커짐=> 속도를 크기로 매칭
  //3D 공간감 작=>크게 맵핑함.
  let d =map(star.z, 0, 400, 10 , 1);
  circle(x, y, d);
  
  //textSize(d*5);
  //text("*",x,y);
  stroke(255);
  line(x,y,px,py);
  star.pz=star.z;
  star.z -= speedSlider.value(); //속도감. 진행할 수록 빨라짐. -로 바꿔서 바깥쪽으로 퍼지도록 바꿈.
  if(star.z<1) {
    star.x=random(-width*factor, width*factor);
    star.y=random(-height*factor, height*factor);
    star.z=400;
    star.pz=400;
  }
  }
} 
