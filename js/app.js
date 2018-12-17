`use strict`;
var promptElement = document.getElementById('form');
// var newQuestionElement = document.getElementById('question').textContent;
var newButton1Element = document.getElementById('input1');
var newButton2Element = document.getElementById('input2');
var questionIndicator = 0;

var question = {
  prompt:'Do you want to go to school',
  button1:'button1',
  button2:'button2',
};

var player = {
  name: 'tim',
  age: 18,
  job: null,
  salary:null,
  savings:10000,

};

function questionFunc(){
   document.getElementById('question').textContent = question.prompt;
}
function randomEvent(){

}

function payday(){
  player.savings += player.salary;
}


function startChoice1(){
  alert('1');
}
function startChoice2(){
  alert('2');
}
questionFunc();

newButton1Element.addEventListener('click',startChoice1);
newButton2Element.addEventListener('click',startChoice2);
