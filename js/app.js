`use strict`;
var promptElement = document.getElementById('form');
// var newQuestionElement = document.getElementById('question').textContent;
var newButton1Element = document.getElementById('input1');
var newButton2Element = document.getElementById('input2');
// var newNameElement = document.getElementById('name-status');
// var newAgeElement = document.getElementById('age-status');
// var newMoneyElement = document.getElementById('money-status');
var newLiabilitiesElement = document.getElementById('liabilities');
var questionIndicator = 0;
var i=0;
var choice = 0;

function Question (prompt,description,button1,button2){
  this.prompt= prompt;
  this.description= description;
  this.button1=button1;
  this.button2=button2;
  Question.allQuestions.push(this);
}
Question.allQuestions= [];

new Question('Do you want to go to school?','You will need a loan of $80,000', 'Yes','No');
new Question('Do you want to by a car?','','Yes','No');
new Question('What type of car would you like','' ,'A new car', 'A used Car');
new Question('Do you want to get married?', '', 'Yes','No');
new Question('Do you want to buy a house?','House cost a lot of money', 'Yes I don\'t want to rent forever', 'No I prefer wasting my money');
new Question('How do you feel about kids', ' ', 'I want one now', 'Not for me');


var Player = {
  name:'tim' ,
  age : 18,
  job : null,
  salary : 1000,
  education:false,
  savings :10000,
  car:false,
};

function questionFunc(){
  console.log(i);
  document.getElementById('question').textContent = Question.allQuestions[i].prompt;
  document.getElementById('description').textContent = Question.allQuestions[i].description;
  document.getElementById('input1').textContent = Question.allQuestions[i].button1;
  document.getElementById('input2').textContent = Question.allQuestions[i].button2;
  updateStatus();

}
function randomEvent(){

}
function updateStatus(){
  document.getElementById('name-status').textContent = Player.name;
  document.getElementById('age-status').textContent = ('Age: '+ Player.age);
  document.getElementById('money-status').textContent = ('Savings: $' + Player.savings);
}
function liabilitiesFunc(){
  if(i===0){
    var liElement =document.createElement('li');
    liElement.textContent = 'Student Loans: $80,000';
    newLiabilitiesElement.appendChild(liElement);
  }
}
function pictureLogic(){
  if(i===0 ){
    if(choice===1){
    //update school image
    }else{
      //not school image
    }
  }
  if(i===1 &&choice===2){
    //Not car image
  }
  if (i===2 && choice===1){
    //new car image
  }
  if (i===2 && choice===2){
    //used car image
  }
  
}


function payday(){
  Player.savings += Player.salary;
  updateStatus();
}
function logic(){
  if (i===0){
    Player.age+=4;
    if(choice===1){
      liabilitiesFunc();
    }
    else{
      for(var j=0; j<4;j++){
        Player.savings+=Player.salary;
      }
    }
  }
  if (i===1){
    if(choice===1){
      Player.car=true;
    }else{
      i++;
    }
  }
}

function startChoice1(event){
  choice=1;
  logic();
  i++;
  questionFunc();
}
function startChoice2(event){
  choice=2;
  logic();
  i++;
  questionFunc();
}

questionFunc();
// i++;
// questionFunc();

newButton1Element.addEventListener('click',startChoice1);
newButton2Element.addEventListener('click',startChoice2);
