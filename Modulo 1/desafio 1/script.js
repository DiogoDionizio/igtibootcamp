'use strict'; // O javascript mostra mais erros

window.addEventListener('load', start);

var globalNames = [];
var inputName = null;
var lista = null;

function start(){
  inputName = document.querySelector('#inputName');
  lista = document.querySelector('#lista');

  preventFormSubmit();
  activateInput();
}

function preventFormSubmit(){
  function handleFormSubmit(event){
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput(){
  function insertName(newName){
    globalNames.push(newName);

    render();
    inputName.value = '';
    inputName.focus();
  }
  function handleTyping(event) {
    if (event.key == 'Enter') {
      insertName(event.target.value);
    }    
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index){
    function deleteName(){
      console.log('deleteName');
      globalNames.splice(index, 1);
      render();
    }
    
    var button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', deleteName);

    return button;
  }

  lista.innerHTML = '';
  for (let index = 0; index < globalNames.length; index++) {
    var li = document.createElement('li');

    var button = createDeleteButton(index);

    var span = document.createElement('span');
    span.textContent = globalNames[index];

    li.appendChild(button);
    li.appendChild(span);
    lista.appendChild(li);
  }
}