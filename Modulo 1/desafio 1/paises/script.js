var paisesFiltrados;
var ulPaises;
var globalPaisesSelecionados = [];


window.addEventListener('load', () => {

  // Carrega a lista de paises
  ulPaises = document.querySelector('#paises');

  carregarJson();
});

async function carregarJson(){
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const paises = await res.json();

  paisesFiltrados = filtrarPaises(paises);
  render();
}

function filtrarPaises(paises){
  const dadosPais = paises.map(pais => {
    return {
      nome: pais.name,
      populacao: pais.population,
      bandeira: pais.flag,
      regiao: pais.region
    }
  });

  return dadosPais;
}

function createLi(index){
  function clickSelecionar(){
    // Cria a função para selecionar um pais.
    console.log('click');
    globalPaisesSelecionados.push
    paisesFiltrados.splice(index, 1);
    
    render();
  }

  var li = document.createElement('li');

  // Adiciona função de click
  li.addEventListener('click', clickSelecionar);

  return li;
}


function render(){

  // Verifica se paises tem alguma informação
  if (paisesFiltrados.length > 0) {

    ulPaises.innerHTML = '';

    // Carregar todos os Paises na tela.
    for(var index = 0; index < paisesFiltrados.length; index++){
      
      // Cria o elemento li
      var li = createLi(index);

      // Cria o elemento imagem para o LI
      var img = document.createElement('img');
      img.src = paisesFiltrados[index].bandeira;

      // Nome do pais
      var spanNome = document.createElement('span');
      spanNome.textContent = 'Pais: ' + paisesFiltrados[index].nome;

      // População do pais
      var spanPopulacao = document.createElement('span');
      spanPopulacao.textContent = 'População: '+ paisesFiltrados[index].populacao;

      // Região do pais

      // Configura as características da li
      li.appendChild(img);
      li.appendChild(spanNome);
      li.appendChild(spanPopulacao);

      // Adiciona a lista
      ulPaises.appendChild(li);
    }
  }

}