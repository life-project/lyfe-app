'use strict';

var promptElement = document.getElementById('question-prompt');
var eventPrompt = document.getElementById('event-prompt');
var newButton1Element = document.getElementById('input1');
var newButton2Element = document.getElementById('input2');
var newButton3Element = document.getElementById('input3');
var nameElement = document.getElementById('name');
var carImageElement = document.getElementById('second-ti');
var educationImageElement = document.getElementById('first-ti');
var kidImageElement = document.getElementById('third-ti');
var randomIndex;
var newLiabilitiesElement = document.getElementById('liabilities');
var button3Flag = false;

var i = 0;
var choice = 0;

function Question (prompt, description, button1, button2){
  this.prompt = prompt;
  this.description = description;
  this.button1 = button1;
  this.button2 = button2;
  Question.allQuestions.push(this);
}
Question.allQuestions= [];

new Question('Do you want to go to school?', 'You will need student loans in the amount of $80,000', 'Yes', 'No');
new Question('Do you want to by a car?','','Yes','No');
new Question('What type of car would you like to buy?', 'A new car will require a loan in the amount of $32,000. A used car will deduct $10,000 from savings.' , 'A new car', 'A used Car');
new Question('Do you want to get married?', '', 'Yes', 'No');
new Question('Do you want to buy a house?', 'Buying a house will require a loan in the amount of $500,000.', 'Yes, I don\'t want to rent forever', 'No, I\'m not ready for that');
new Question('How do you feel about kids?', ' ', 'I want them', 'Not for me');
new Question('Would you like to change jobs?', 'A new job will involve a pay-cut, but will have more potential to climb the ladder.', 'Yes', 'No');
new Question('The economy took a downturn and you have been laid off. Do you want to pursue education for a year or find another job quickly?', 'Any education options will require a loan in the amount of $15,000. Immediate job options will provide half as much pay as you were receiving previously.', 'Education', 'Work now');
new Question('Would you like to change jobs?', 'The new job', 'Yes', 'No');

var randomEventPrompt = [['You won the Lotto!', 'You gained $50,000.'],
  ['Congrats, you have a kid!', 'This will cost you $13,000 a year.'],
  ['You received an inheritance!', 'Sorry for your loss, but you gained $40,000.'],
  ['You have been sued.', 'This will cost you $20,000!'],
  ['You were made famous on You-Tube!', 'You gained $10,000.'],
  ['You got a promotion!', 'You will make an additional $5,000'],
  ['You need surgery.', 'Your insurance does not cover all costs, so this will cost you $8,000.'],
  ['You had a good day at the casino.', 'You\'re taking home $1,000.'],
  ['You won a new car on a game show!', ''],
  ['You had a bad day at the casino.', 'You lost $400.'],
  ['You had a really bad day at the casino.', 'You lost $1,200.'],
];





var Player = {
  name: nameElement,
  age : 18,
  job : null,
  salary : 50000,
  education : false,
  savings : 10000,
  car : false,
  newcar : false,
  kids : false,
  kidsNumber : 0,

};

function questionFunc(){
  showQuestions();
  document.getElementById('question').textContent = Question.allQuestions[i].prompt;
  document.getElementById('description').textContent = Question.allQuestions[i].description;
  document.getElementById('input1').textContent = Question.allQuestions[i].button1;
  document.getElementById('input2').textContent = Question.allQuestions[i].button2;
  updateStatus();

}

function randomNumber(){
  return Math.floor(Math.random()*(randomEventPrompt.length));
}

function randomLogic()

{
  if (randomIndex===0) {
    Player.savings+=50000;
  }
  if (randomIndex===1 && Player.kids===true && Player.age < 45) {  // kids
    var liElement =document.createElement('li');
    liElement.textContent = 'Kid: $13,000 /yr ';
    newLiabilitiesElement.appendChild(liElement);
    Player.kids=true;
    Player.kidsNumber++;
    Player.savings-= 13000;
  }
  if (randomIndex===2){ //inheirtance
    Player.savings+=40000;
  }
  if (randomIndex===3){ //lawsuit
    Player.savings-=20000;
  }
  if (randomIndex===4){ // you-tube famous
    Player.savings+=10000;
  }
  if (randomIndex===5){ //promotion
    Player.salary+=5000;
  }
  if (randomIndex===6){ //surgery
    Player.saving-=8000;
  }
  if (randomIndex===7){ // casino
    Player.savings+=1000;
  }
  if (randomIndex===8){ // car
    carImageElement.src ='images/newcar.png';    
  }
}

function randomEventRender(){
  randomIndex = randomNumber();
  randomLogic();
  showEvents();
  document.getElementById('event').textContent = randomEventPrompt[randomIndex][0];
  document.getElementById('event-description').textContent = randomEventPrompt[randomIndex][1];
  document.getElementById('input3').textContent = 'OK!';
  updateStatus();

}

function updateStatus(){
  document.getElementById('name-status').textContent = Player.name;
  document.getElementById('age-status').textContent = ('Age: '+ Player.age);
  document.getElementById('money-status').textContent = ('Savings: $' + Player.savings);
}

// function liabilitiesFunc(){
//   if(i===0){
//     var liElement =document.createElement('li');
//     liElement.textContent = 'Student Loans: $80,000';
//     newLiabilitiesElement.appendChild(liElement);
//   }
// }

function pictureLogic(){
  if(i===0){
    if (Player.education) educationImageElement.src='images/graduation.png';
    if (!Player.education) educationImageElement.src='images/graduationx.png';
  }

  if(i>=1){
    if(Player.car===false)carImageElement.src= 'images/newcarx.png';
    if(Player.car===true && Player.newcar===false)carImageElement.src ='images/oldcar.png';
    if(Player.car===true && Player.newcar===true)carImageElement.src ='images/newcar.png';
  }
}

function showEvents(){
  promptElement.className = 'hide';
  eventPrompt.className = 'show';
}

function showQuestions(){
  promptElement.className = 'show';
  eventPrompt.className = 'hide';
}

function checkforName(){
  Player.name = localStorage.getItem('username');
  while(!Player.name){
    Player.name = prompt('Please enter your name :');
    localStorage.setItem('username', Player.name);
  }
}

function payday(){
  showEvents();
  console.log('payday');
  document.getElementById('event').textContent = 'You Got Paid!';
  document.getElementById('event-description').textContent = 'This is 1 year of disposable income.';
  document.getElementById('input3').textContent = 'OK!';
  Player.savings += Player.salary;
  Player.age+=2;
  updateStatus();
  // questionFunc();

}

function logic(){
  var liElement;
  if (i===0){
    Player.age+=4;
    if(choice===1){
      Player.education=true;
      liElement = document.createElement('li');
      liElement.textContent = 'Student Loans: $80,000';
      newLiabilitiesElement.appendChild(liElement);
    }
    else{
      for(var j=0; j<4;j++){
        Player.savings+=Player.salary;
      }
    }
  }
  if (i===1){
    if(choice===1)Player.car = true;
  }
  if (i===2){ //type of car
    if(choice===1){ //new
      Player.newcar = true;
      liElement = document.createElement('li');
      liElement.textContent = 'Car Loan: $32,000';
      newLiabilitiesElement.appendChild(liElement);
    }else{ //used
      Player.savings-=10000;
    }
  }
  if(i===3){ //Marriage
    if(choice===1){
      Player.salary= Player.salary*1.6;
    }
  }
  if(i===4){ //Mortgage
    if(choice===1){
      liElement = document.createElement('li');
      liElement.textContent = 'Mortgage: $500,000';
      newLiabilitiesElement.appendChild(liElement);

    }

    if(i===5){ //kids
      if(choice===1){
        Player.kids=true;
      }
    }
    if (i===6){ //new job
      if(choice===1){
        Player.salary= Player.salary*0.9;
      }
    }
    if (i===7){ // laid off
      if (choice===1){
        liElement = document.createElement('li');
        liElement.textContent = 'Continuing Education: $15,000';
        newLiabilitiesElement.appendChild(liElement);
      }
      if (choice===2){
        Player.salary= Player.salary*0.5;
      }
    }
  }

  if(i!==1)pictureLogic();
  if(i===1 && Player.car===false)pictureLogic();
}
function startChoice1(event){
  choice=1;
  if(i===1){
    Player.car=true;
    i++;
    questionFunc();
  } else{
    logic();
    randomEventRender();
    i++;
  }
}

function startChoice2(event){
  choice = 2;
  logic();
  if(i===1)i++;
  randomEventRender();
  i++;

}

function startChoice3(event){
  console.log(button3Flag);
  if(!button3Flag){
    payday();
    button3Flag = true;
  }else{
    button3Flag = false;
    questionFunc();
  }
}

checkforName();
questionFunc();

newButton1Element.addEventListener('click', startChoice1);
newButton2Element.addEventListener('click', startChoice2);
newButton3Element.addEventListener('click', startChoice3);
