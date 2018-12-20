'use strict';
// list of elements to change the DOM
var promptElement = document.getElementById('question-prompt');
var eventPrompt = document.getElementById('event-prompt');
var endGamePrompt = document.getElementById('end-game');
var newButton1Element = document.getElementById('input1');
var newButton2Element = document.getElementById('input2');
var newButton3Element = document.getElementById('input3');
var nameElement = document.getElementById('name');
var carImageElement = document.getElementById('second-ti');
var educationImageElement = document.getElementById('first-ti');
var kidImageElement = document.getElementById('fifth-ti');
var houseImageElement = document.getElementById('fourth-ti');
var marriageImageElement = document.getElementById('third-ti');
var newLiabilitiesElement = document.getElementById('liabilities');

var randomIndex; //used ID random event
var button3Flag = false; // used to alternate between Payday  and Random event
var i = 0; // Index for fixed question
var choice = 0; //associates logic with appropriate button (1 or 2)

function Question (prompt, description, button1, button2){ //Used to construct an array of objects for fixed questions
  this.prompt = prompt;
  this.description = description;
  this.button1 = button1;
  this.button2 = button2;
  Question.allQuestions.push(this);
}
Question.allQuestions= [];

// Creates new Instances of the Question object.
new Question('Do you want to go to school?', 'You will need student loans in the amount of $80,000', 'Yes', 'No');
new Question('Do you want to by a car?','','Yes','No');
new Question('What type of car would you like to buy?', 'A new car will require a loan in the amount of $32,000. A used car will deduct $10,000 from savings.' , 'A new car', 'A used Car');
new Question('Do you want to get married?', '', 'Yes', 'No');
new Question('Do you want to buy a house?', 'Buying a house will require a loan in the amount of $500,000.', 'Yes, I don\'t want to rent forever', 'No, I\'m not ready for that');
new Question('How do you feel about kids?', ' ', 'I want them', 'Not for me');
new Question('Would you like to change jobs?', 'A new job will involve a pay-cut, but will have more potential to climb the ladder.', 'Yes', 'No');
new Question('The economy took a downturn and you have been laid off. Do you want to pursue education for a year or find another job quickly?', 'Any education options will require a loan in the amount of $15,000. Immediate job options will provide half as much pay as you were receiving previously.', 'Education', 'Work now');
new Question('Would you like to change jobs?', 'The new job will increase your pay by 10%, but will also reduce your savings by $20,000 to cover moving and the cost-of-living difference. Nothing changes if you stay where you are.', 'Yes', 'No');
new Question('Dad passed away a few years ago and mom can\'t take care of herself anymore. Do you hire an in-home nurse or take care of her yourself?', 'Home care will reduce your savings by $200,000. Taking care of her on your own will require you to work part-time, reducing your salary.', 'Hire nurse', 'Do it myself');

// array of Random Events and descriptions
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


// The object of the user-- used to hold game information
var Player = {
  name: nameElement,
  age : 18,
  salary : 50000,
  education : false,
  savings : 10000,
  car : false,
  newcar : false,
  kids : false,
  kidsNumber : 0,
  house : false,
  marriage : false,
  totalLia : 0,
  netPlayerMoney : 0
};

// Used to alter DOM to display fixed questions
function questionFunc(){
  showQuestions();
  if(i<Question.allQuestions.length){
    document.getElementById('question').textContent = Question.allQuestions[i].prompt;
    document.getElementById('description').textContent = Question.allQuestions[i].description;
    document.getElementById('input1').textContent = Question.allQuestions[i].button1;
    document.getElementById('input2').textContent = Question.allQuestions[i].button2;
    updateStatus();
  } else{
    endGame();
  }

}

//Generates a random number between 1-100
function randomNumber(){
  return Math.floor(Math.random()*(100));
}

//  Used to alter elements for random event
function randomEventRender(){
  var randomNumberGen = randomNumber();
  if (Player.kids===false || Player.age > 49){ //checks that player wants kids and is not to old
    do {
      randomNumberGen = randomNumber();
    }
    while( randomNumberGen >= 3 && randomNumberGen < 43 );
  }
  if(randomNumberGen>=0 && randomNumberGen <3 ) randomIndex=0; // changes probability of  random event
  if(randomNumberGen>=3 && randomNumberGen <43 ) randomIndex=1;
  if(randomNumberGen>=43 && randomNumberGen <46 ) randomIndex=2;
  if(randomNumberGen>=46 && randomNumberGen <50 ) randomIndex=3;
  if(randomNumberGen>=50 && randomNumberGen <53 ) randomIndex=4;
  if(randomNumberGen>=53 && randomNumberGen <61 ) randomIndex=5;
  if(randomNumberGen>=61 && randomNumberGen <67 )randomIndex=6;
  if(randomNumberGen>=67 && randomNumberGen <77 ) randomIndex=7;
  if(randomNumberGen>=77 && randomNumberGen <80 ) randomIndex=8;
  if(randomNumberGen>=80 && randomNumberGen <90 ) randomIndex=9;
  if(randomNumberGen>=90 && randomNumberGen <100 ) randomIndex=10;
  Player.age+=2;
  randomLogic();
  showEvents();
  document.getElementById('event').textContent = randomEventPrompt[randomIndex][0];
  document.getElementById('event-description').textContent = randomEventPrompt[randomIndex][1];
  document.getElementById('input3').textContent = 'OK!';
  updateStatus();
}

//Updates Player Stats
function randomLogic(){
  var liElement;
  if (randomIndex===0) {
    Player.savings+=50000;
  }
  if (randomIndex===1 && Player.kids===true) { // kids
    liElement =document.createElement('li');
    liElement.textContent = 'Kid: $13,000 /yr ';
    Player.totalLia+=13000;
    newLiabilitiesElement.appendChild(liElement);
    Player.kids = true;
    Player.kidsNumber++;
    Player.savings-= 13000;
  }
  if (randomIndex===2){ //inheritance
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
  if (randomIndex===7){ // casino good day
    Player.savings+=1000;
  }
  if (randomIndex===8){ // car
    Player.car = true;
    Player.newcar = true;
    carImageElement.src ='images/newcar.png';
  }
  if (randomIndex===9){ // casino bad day
    Player.savings-=400;
  }
  if (randomIndex===10){ // casino really bad day
    Player.savings-=1200;
  }
  pictureLogic();
}


//changes elements of player status
function updateStatus(){
  document.getElementById('name-status').textContent = Player.name;
  document.getElementById('age-status').textContent = ('Age: '+ Player.age);
  document.getElementById('kid-status').textContent = ('Number of kids: ' + Player.kidsNumber);
  document.getElementById('money-status').textContent = ('Savings: $' + Player.savings);
}

//Checks for conditions to display images
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
  if(Player.kidsNumber>0)kidImageElement.src='images/baby.png';
  if(i === 5 && Player.kids===false)kidImageElement.src='images/babyx.png';
  if(i===4){
    if(Player.house===true)houseImageElement.src='images/house.png';
    if(Player.house===false)houseImageElement.src='images/housex.png';
  }
  if(i===3){
    if(Player.marriage===true)marriageImageElement.src='images/ring.png';
    if(Player.marriage===false)marriageImageElement.src='images/ringx.png';
  }
}

// toggles html show class section  to show random events
function showEvents(){
  promptElement.className = 'hide';
  eventPrompt.className = 'show';
  endGamePrompt.className = 'hide';
}
// toggles html show class section  to show questions
function showQuestions(){
  promptElement.className = 'show';
  eventPrompt.className = 'hide';
  endGamePrompt.className = 'hide';
}

// toggles html show class section  to show end game stats
function endGame(){
  Player.netPlayerMoney=Player.savings-Player.totalLia;
  document.getElementById('total-savings').textContent =Player.savings;
  document.getElementById('total-liabilities').textContent =Player.totalLia;
  document.getElementById('net-worth').textContent =Player.netPlayerMoney;
  promptElement.className = 'hide';
  eventPrompt.className = 'hide';
  endGamePrompt.className = 'show';
}

// checks to see if user name was stored in  local storage from index html
function checkforName(){
  Player.name = localStorage.getItem('username');
  while(!Player.name){
    Player.name = prompt('Please enter your name :');
    localStorage.setItem('username', Player.name);
  }
}

// pays player once a year
function payday(){
  showEvents();
  console.log('payday');
  document.getElementById('event').textContent = 'You Got Paid!';
  document.getElementById('event-description').textContent = 'This is 1 year of disposable income.';
  document.getElementById('input3').textContent = 'OK!';
  Player.savings += Player.salary;
  Player.age+=1;
  updateStatus();
}


// Logic for question responses to alter player stats
function logic(){
  var liElement;
  if (i===0){
    Player.age+=4;
    if(choice===1){
      Player.education = true;
      liElement = document.createElement('li');
      liElement.textContent = 'Student Loans: $80,000';
      Player.totalLia+=80000;
      newLiabilitiesElement.appendChild(liElement);
    }
    else{
      for(var j=0; j<4;j++){
        Player.savings+=Player.salary;
      }
    }
  }
  if (i===1){
    Player.age+=1;
    if(choice===1)Player.car = true;
  }
  if (i===2){ //type of car
    if(choice===1){ //new
      Player.newcar = true;
      liElement = document.createElement('li');
      liElement.textContent = 'Car Loan: $32,000';
      newLiabilitiesElement.appendChild(liElement);
      Player.totalLia+=32000;
    }else{ //used
      Player.savings-=10000;
    }
  }
  if(i===3){ //Marriage
    Player.age+=1;
    if(choice===1){
      Player.salary = Player.salary*1.6;
      Player.marriage = true;
    }
  }
  if(i===4){ //Mortgage
    Player.age+=1;
    if(choice===1){
      liElement = document.createElement('li');
      liElement.textContent = 'Mortgage: $500,000';
      newLiabilitiesElement.appendChild(liElement);
      Player.totalLia+= 500000;
      Player.house = true;
    }
  }

  if(i===5){ //kids
    Player.age+=1;
    if(choice===1){
      Player.kids = true;
    }
  }
  if (i===6){ //new job
    Player.age+=3;
    if(choice===1){
      Player.salary = Player.salary*0.9;
    }
  }
  if (i===7){ // laid off
    Player.age+=1;
    if (choice===1){
      liElement = document.createElement('li');
      liElement.textContent = 'Continuing Education: $15,000';
      newLiabilitiesElement.appendChild(liElement);
      Player.totalLia+=15000;
    }
    if (choice===2){
      Player.salary = Player.salary*0.5;
    }
  }
  if (i===8){ //change job
    Player.age+=3;
    if (choice===1){
      Player.savings-=20000;
      Player.salary = Player.salary*1.1;
    }
  }
  if(i===9){ //nurse for mom
    Player.age+=5;
    if (choice===1){
      Player.savings-=200000;
      Player.savings+=(Player.salary*5);
    }
    if(choice===2){
      Player.salary=Player.salary*0.5;
      Player.savings+=(Player.salary*5);
    }
  }

  if(i!==1)pictureLogic();
  if(i===1 && Player.car===false)pictureLogic();
}

//callback function for 1st button that will show if  Questions are displayed
function startChoice1(event){  //eslint-disable-line
  localStorage.setItem('user-game-play',JSON.stringify(Player));
  localStorage.setItem('user-question-indicator',i);
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
//callback function for 2nd button that will show if  Questions are displayed
function startChoice2(event){ //eslint-disable-line
  localStorage.setItem('user-game-play',JSON.stringify(Player));
  localStorage.setItem('user-question-indicator',i);
  choice = 2;
  logic();
  if(i===1)i++;
  randomEventRender();
  i++;
}

//callback function button that will show if  payday or random events are displayed
function startChoice3(event){ //eslint-disable-line
  localStorage.setItem('user-game-play',JSON.stringify(Player));
  localStorage.setItem('user-question-indicator',i);
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


//event listeners

newButton1Element.addEventListener('click', startChoice1);
newButton2Element.addEventListener('click', startChoice2);
newButton3Element.addEventListener('click', startChoice3);
