var dadosFiltrados;
var msgUsuarios;
var msgEstatisticas;
var inputBuscar;
var ulDados;
var ulEstatisticas;

window.addEventListener('load', function() {
  // Carrega o JSON
  carregarJson();

  // Bloqueia a ação padrão do envio.
  event.preventDefault();

  msgUsuarios = document.querySelector('#msgUsuarios');
  msgEstatisticas = document.querySelector('#msgEstatisticas');

  ulDados = document.querySelector('#ulDados');
  ulEstatisticas = document.querySelector('#ulEstatisticas');

  // Seleciona o input buscar
  inputBuscar = document.querySelector('#buscar');
  inputBuscar.addEventListener('keyup', digitarInput);
  inputBuscar.focus();
});

// Pega tudo que é digitado no input e pesquisa
function digitarInput(event){
  var dados = filtrarNome(dadosFiltrados, event.target.value);

  // Verifica se os dados retornados estão vazios
  if (dados.length > 0 && inputBuscar.value !== '') {
    // Mostra os dados.
    ulDados.innerHTML = '';
    ulEstatisticas.innerHTML = '';
    for(let index = 0; index < dados.length; index++) {
      var li = document.createElement('li');

      var img = document.createElement('img');
      img.src = dados[index].picture;
      img.classList.add('img');
      
      var spanNome = document.createElement('span');
      spanNome.textContent = dados[index].first;

      var spanIdade = document.createElement('span');
      spanIdade.textContent = dados[index].age;

      li.appendChild(img);
      li.appendChild(spanNome);
      li.appendChild(spanIdade);

      ulDados.appendChild(li);
    }

    // Quantidade de sexos masculinos
    var qtdMasculino = dados.filter(person => {
      return person.gender === 'male';
    });

    // Quantidade de sexo feminino
    var qtdFeminio = dados.filter(person => {
      return person.gender === 'female';
    });

    // Soma das idades
    const totalIdades = dados.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);

    // média das idades
    const media = (totalIdades / dados.length).toFixed(2);


    // Gerar as estatisticas
    var liEstatisticas = document.createElement('li');
    var spanMasculino = document.createElement('span');
    var spanFeminino = document.createElement('span');
    var spanSomaIdade = document.createElement('span');
    var spanMediaIdade = document.createElement('span');

    spanMasculino.textContent = 'Sexo masculino: '+ qtdMasculino.length;
    spanFeminino.textContent = 'Sexo feminino: '+ qtdFeminio.length;
    spanSomaIdade.textContent = 'Soma das idades: '+ totalIdades;
    spanMediaIdade.textContent = 'Média das idades: '+ media;

    liEstatisticas.appendChild(spanMasculino);
    ulEstatisticas.appendChild(liEstatisticas);

    liEstatisticas.appendChild(spanFeminino);
    ulEstatisticas.appendChild(liEstatisticas);

    liEstatisticas.appendChild(spanSomaIdade);
    ulEstatisticas.appendChild(liEstatisticas);

    liEstatisticas.appendChild(spanMediaIdade);
    ulEstatisticas.appendChild(liEstatisticas);

    msgUsuarios.textContent = dados.length + ' usuários(s) encontrados(s)';
    msgEstatisticas.textContent = 'Estatísticas';

  } else {
    // Exibe que não tem nenhum dado.
    ulDados.innerHTML = '';
    ulEstatisticas.innerHTML = '';
    msgUsuarios.textContent = 'Nenhum usuário filtrado';
    msgEstatisticas.textContent = 'Nada a ser exibido';

  }
}

// Carrega o Json externo
async function carregarJson(){
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const pessoas = await res.json();

  dadosFiltrados = listarDados(pessoas);
}

// Cria uma MAP dos dados filtrando apenas o que é importante
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