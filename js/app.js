`use strict`;
var promptElement = document.getElementById('form');
// var newQuestionElement = document.getElementById('question').textContent;
var newButton1Element = document.getElementById('input1');
var newButton2Element = document.getElementById('input2');
var questionIndicator = 0;
var i=0;

function Question (prompt,discription,button1,button2){
  this.prompt= prompt;
  this.discription= discription;
  this.button1=button1;
  this.button2=button2;
  Question.allQuestions.push(this);
}
Question.allQuestions= [];

 new Question('Do you want to go to school?','You will need a loan of $80,000', 'Yes','No');
 new Question('Do you want to by a car?','','Yes','No');
 new Question('What type of car would you like','' ,'A new car', 'A used Car');


function Player (name){
  this.name = name;
  this.age = 18;
  this.job = null;
  this.salary = null;
  this.savings = 10000;
  Player.allPlayers.push(this);
}
Player.allPlayer=[];

function questionFunc(){
  console.log(i);
  document.getElementById('question').textContent = Question.allQuestions[i].prompt;
  document.getElementById('description').texContent = Question.allQuestions[i].description;
  document.getElementById('input1').textContent = Question.allQuestions[i].button1;
  document.getElementById('input2').textContent = Question.allQuestions[i].button2;
    
     
}
function randomEvent(){

}

function payday(){
  player.savings += player.salary;
}


function startChoice1(event){
  
  alert('1');
  i++;
  console.log(i);
  questionFunc();
  
}
function startChoice2(event){
  
  alert('2');
   i++;
  questionFunc();
 
}

questionFunc();
// i++;
// questionFunc();

newButton1Element.addEventListener('click',startChoice1);
newButton2Element.addEventListener('click',startChoice2);
