`use strict`;

var nameSubmit = document.getElementById('home-form');
var name;

function addName(event){
 localStorage.setItem('user-name', event.target.username.value);
}


nameSubmit.addEventListener('submit',addName)
