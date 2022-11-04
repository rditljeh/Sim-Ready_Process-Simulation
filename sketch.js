//run command: browser-sync start --server -f -w

//structure: x, y, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8, flag9, flag10, wait_node, wait_time
let questions=[];
let start = 0;
let pause = 0;

let travel_speed=Math.floor(Math.random() * 10) + 0; // speed that questions travel between nodes 
let service_time=120; // *20 is a single second*
let spawn_num=1; //num questions that should appear every week
let arrival_rate=2; //how often questions should appear
let capacity=2; //# of questions a node can store
let wait_distance=20; //# of pixels questions should wait away if node is full
let total_seconds=0;


let spawn_x=100;
let spawn_y=170;

img_step1_x=100;
img_step1_y=350;
img_step2_x=420;
img_step2_y=350;
img_step3_x=500;
img_step3_y=800;
img_step4_x=780;
img_step4_y=350;
img_step5_x=820;
img_step5_y=800;
img_step6_x=1100;
img_step6_y=350;
img_step7_x=1470;
img_step7_y=350;
img_step8_x=1550;
img_step8_y=800;
img_step9_x=1780;
img_step9_y=350;
img_step10_x=1860;
img_step10_y=800;
//place for finished questions
img_step11_x=2200;
img_step11_y=900;

//createQuestion();

//let data = loadJSON("jsons/test.json");

//tank, artillery, military stuff
//time display,

function setup() {
  current_second = second();
  createCanvas(1980, 1080);
  startBtn = createButton("Start Simulation");
  startBtn.position(50, 40);
  startBtn.mouseClicked(startSim);
  pauseBtn = createButton("Pause");
  pauseBtn.position(180, 40);
  pauseBtn.mouseClicked(pauseSim);
  resumeBtn = createButton("Resume");
  resumeBtn.position(240, 40);
  resumeBtn.mouseClicked(resumeSim);
}

function startSim(){
  start = 1;
}

function pauseSim(){
  pause = 1;
}

function resumeSim(){
  pause = 0;
}


function preload() {
  img_step1=loadImage('/assets/planning.png');
  img_step2=loadImage('/assets/scenario_dev.png');
  img_step3=loadImage('/assets/vignette_dev.png');
  img_step4=loadImage('/assets/M&S_selection.png');
  img_step5=loadImage('/assets/digitization.png');
  img_step6=loadImage('/assets/data_dev.png');
  img_step7=loadImage('/assets/integration&testing.png');
  img_step8=loadImage('/assets/data_collect.png');
  img_step9=loadImage('/assets/data_analysis.png');
  img_step10=loadImage('/assets/findings_dev.png');
  img_step11=loadImage('/assets/back_briefs.png');
  img_bg=loadImage('/assets/simplified_OV1.png');
  img_question0=loadImage('/assets/pies/pie_0.png');
  img_question20=loadImage('/assets/pies/pie_20.png');
  img_question40=loadImage('/assets/pies/pie_40.png');
  img_question60=loadImage('/assets/pies/pie_60.png');
  img_question80=loadImage('/assets/pies/pie_80.png');
  img_question100=loadImage('/assets/pies/pie_100.png');
  
  //structure: x, y, current_count, max_capacity, image, index, servicetime
  node=[[img_step1_x, img_step1_y, 0, capacity, img_step1, 0, service_time], 
         [img_step2_x, img_step2_y, 0, capacity, img_step2, 1, service_time], 
         [img_step3_x, img_step3_y, 0, capacity, img_step3, 2, service_time], 
         [img_step4_x, img_step4_y, 0, capacity, img_step4, 3, service_time], 
         [img_step5_x, img_step5_y, 0, capacity, img_step5, 4, service_time], 
         [img_step6_x, img_step6_y, 0, capacity, img_step6, 5, service_time],
         [img_step7_x, img_step7_y, 0, capacity, img_step7, 6, service_time], 
         [img_step8_x, img_step8_y, 0, capacity, img_step8, 7, service_time], 
         [img_step9_x, img_step9_y, 0, capacity, img_step9, 8, 10], 
         [img_step10_x, img_step10_y, 0, capacity, img_step10, 9, 10], 
         [img_step11_x, img_step11_y, 0, capacity, img_step11, 10, 10]
        ];
}

function toStep(x, y, targ_x, targ_y, step_index) {

  let diff_x = targ_x+50 - x;
  let diff_y = targ_y+30 - y;
  let done = 0;
  //text("goal: "+targ_x+" "+targ_y, x, y);
  if(node[step_index][2] >= node[step_index][3]){
    if((abs(diff_x)+abs(diff_y)) > wait_distance){
      return [x, y, done];
    }
    if((abs(diff_x)+abs(diff_y)) > wait_distance){
      return [x, y, done];
    }
  }
  if(diff_y > 10){
    y += travel_speed;
    return [x, y, done];
  }
  else if(diff_y < -10){
    y -= travel_speed;
    return [x, y, done];
  }
  else{ 
    done += 1;
  }
  if(diff_x > 10){
    x += travel_speed;
  }
  else if(diff_x < -10){
    x -= travel_speed;
  }
  else{
    done += 1;
  }
  if (done == 2){
    node[step_index][2] += 1;
  }
  return [x, y, done];
}

function createQuestion(){
  //structure: x, y, flag1, flag2, flag3, flag4, flag5, flag6, flag7, flag8, flag9, flag10, flag11, wait_node, wait_time
  for(i=0; i < spawn_num; i++){
    questions.push([spawn_x, spawn_y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
}

function draw() {
  //image(img_bg, 0, 0);
  //img_bg.filter(GRAY);
  //background("white");

  background(img_bg);
  if(start == 0){
    return;
  }
  //tint(255, 255);
  let s = second();
  if(s != current_second & pause == 0){
    total_seconds += 1;
    current_second = s;
    if(total_seconds%arrival_rate==0){
      createQuestion();
    }
  }
  textSize(25);
  fill("blue");
  text("Week: "+total_seconds, 250, 150);
  //text("Week: "+total_seconds + " " + (current_second%10).toString(), 250, 150);
  for (let step in node) {
    //image(node[step][4], node[step][0], node[step][1], node[step][4].width/3, node[step][4].height/3);
    //text(node[step], node[step][0], node[step][1]+80);
    text((node[step][2]+"/"+node[step][3]), node[step][0]+10, node[step][1]+10);
  }
  textSize(12);
  //noFill();
  //noLoop(), make functions to move closer to each step
  let wait = 0;
  for (var q in questions) {
    if(questions[q][-3] == 1){
      continue;
    }
    fill("white");
    //ellipse(questions[q][0], questions[q][1], 40, 40);
    if(questions[q][7]==1){
      image(img_question100, questions[q][0], questions[q][1], 40, 40);
    }
    else if(questions[q][6]==1){
      image(img_question80, questions[q][0], questions[q][1], 40, 40);
    }
    else if(questions[q][5]==1){
      image(img_question60, questions[q][0], questions[q][1], 40, 40);
    }
    else if(questions[q][4]==1){
      image(img_question40, questions[q][0], questions[q][1], 40, 40);
    }
    else if(questions[q][3]==1){
      image(img_question20, questions[q][0], questions[q][1], 40, 40);
    }
    else{
      image(img_question0, questions[q][0], questions[q][1], 40, 40);
    }
    fill("black");
    ///for question debugging
    //text(questions[q], questions[q][0]-5, questions[q][1]+5);
    text(q, questions[q][0]-5, questions[q][1]+5);
    if(pause == 1){
      continue;
    }
    if (questions[q][-1] > 0){
      questions[q][-1] -= 1;
      //wait = 1;
      prev_index = questions[q][-2];
      if(questions[q][-1]==1){
        node[prev_index][2] -= 1;
      }
      continue;
    }
    //else if(wait == 1 & ){
    //  wait = 0;
    //}
    else{
    ///collision detection
    if (q > 0){
      hit = collidePointRect(questions[q][0], questions[q][1], questions[q-1][0], questions[q-1][1], 100, 100);
      text(hit, questions[q][0]-5, questions[q][1]+5);
      if(hit == true){
        questions[q][-1] = 20;
      }
    }
    ///finding which step it is going to
    for (let step in node) {
      let done = 0;
      if (questions[q][(node[step][5]+2)]==0){
        [questions[q][0], questions[q][1], done] = toStep(questions[q][0], questions[q][1], node[step][0], node[step][1], node[step][5]);
        if (done == 2){
          questions[q][node[step][5]+2] = 1;
          questions[q][-1] = service_time;
          questions[q][-2] = node[step][5];
        }
        break;
      }
    }
  }
    /*
    else if (questions[q][3] == 0){
      [questions[q][0], questions[q][1], done] = toStep(questions[q][0], questions[q][1], img_step2_x, img_step2_y, 1);
      if (done == 2){
        questions[q][3] = 1;
        questions[q][-1] = service_time;
        questions[q][-2] = 1;
      }
    }
    else if (questions[q][4] == 0){
      [questions[q][0], questions[q][1], done] = toStep(questions[q][0], questions[q][1], img_step3_x, img_step3_y, 2);
      if (done == 2){
        questions[q][4] = 1;
        questions[q][-1] = service_time;
        questions[q][-2] = 2;
      }
    }
    else if (questions[q][5] == 0){
      [questions[q][0], questions[q][1], done] = toStep(questions[q][0], questions[q][1], img_step4_x, img_step4_y, 3);
      if (done == 2){
        questions[q][5] = 1;
        questions[q][-1] = service_time;
        questions[q][-2] = 2;
      }
    }
    else if (questions[q][6] == 0){
      [questions[q][0], questions[q][1], done] = toStep(questions[q][0], questions[q][1], img_step5_x, img_step5_y, 4);
      if (done == 2){
        questions[q][6] = 1;
        questions[q][-1] = service_time;
        questions[q][-2] = 2;
      }
    }
    /*
    else if (questions[q][7] == 0){
      [questions[q][0], questions[q][1], done] = toStep(questions[q][0], questions[q][1], img_step6_x, img_step6_y, 5);
      if (done == 2){
        questions[q][7] = 1;
        questions[q][-1] = service_time;
        questions[q][-2] = 2;
      }
    }
    */
  }
}