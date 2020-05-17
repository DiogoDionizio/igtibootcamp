var dadosFiltrados;

window.addEventListener('load', function() {
  // Carrega o JSON
  carregarJson();

  // Bloqueia a ação padrão do envio.
  event.preventDefault();

  // Seleciona o input buscar
  var inputBuscar = document.querySelector('#buscar');
  inputBuscar.addEventListener('keyup', digitarInput);
  inputBuscar.focus();
});

function digitarInput(event){
  var dados = filtrarNome(dadosFiltrados, event.target.value);
  console.log(dados);
}

async function carregarJson(){
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const pessoas = await res.json();

  dadosFiltrados = listarDados(pessoas);
}

function listarDados(dados){
  // Listar  name (first + last), picture, dob.age e gender de todo o resultado.
  const dadosPessoa = dados.results.map(person => {
    return {
      first: person.name.first + ' '+ person.name.last,
      picture: person.picture.thumbnail,
      age: person.dob.age,
      gender: person.gender
    };
  });

  return dadosPessoa;
}

// Filtrar dados por nome
function filtrarNome(dados, texto){

  dados = dados.filter((name, i) => {
    if (name.first.toLowerCase().indexOf(texto) !== -1) {
      return true;
    }
    
    return false;
  });

  return dados;
}