// Só executa o código quando a página for carregada totalmente.
let red, green, blue = 0;
window.addEventListener('load', start);

function start() {

  // Range Blue
  let rangerBlue = document.querySelector('#blue'); // Encontra o ranger da cor blue.
  rangerBlue.addEventListener('change', function () {
    // Define o valor que foi modificado no campo de texto
    let txtBlue = document.querySelector('#textBlue');
    txtBlue.value = rangerBlue.value;
    mudarCor('blue', rangerBlue.value);
  }); // Define o evento

  //Range Red
  let rangerRed = document.querySelector('#red'); // Encontra o ranger da cor red.
  rangerRed.addEventListener('change', function() {
    let txtRed = document.querySelector('#textRed');
    txtRed.value = rangerRed.value;
    mudarCor('red', rangerRed.value);
  });

  //Range Green
  let rangerGreen = document.querySelector('#green');
  rangerGreen.addEventListener('change', function() {
    let textGreen = document.querySelector('#textGreen');
    textGreen.value = rangerGreen.value;
    mudarCor('green', rangerGreen.value);
  });
}

function mudarCor(cor, value){

  if (cor == 'red') {
    red = value;
  } else if(cor == 'green') {
    green = value;
  } else {
    blue = value;
  }

  let divColor = document.querySelector('.color');
  divColor.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}