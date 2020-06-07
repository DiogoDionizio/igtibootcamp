let express = require('express');
let router = express.Router();

let fs = require('fs');

router.get('/', (req, res) => {
  res.status(200).send(dataEstados);
});

// UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente.
router.get('/max', (req, res) => {

  // Vetor que armazena todos os estados e quantidade de cidades.
  let EstadoQtdCidades = [];
  
  for (let index = 0; index < dataEstados[0].length; index++) {
    //console.log(dataEstados[0][index].Sigla);

    // Filtra as cidades pela quantidade
    let qtdCidades = dataCidades[0].filter(cidade => {
      return dataEstados[0][index].ID == cidade.Estado;
    });

    EstadoQtdCidades.push({estado: dataEstados[0][index].Sigla, qtdCidade: qtdCidades.length});
    //console.log({estado: dataEstados[0][index].Sigla, qtdCidade: qtdCidades.length});
  }

  // Reorganiza vetor Maior para menor
  EstadoQtdCidades.sort((a, b) =>{
    return b.qtdCidade - a.qtdCidade;
  });

  // Pega os 5 primeiros elementos
  let statusEstado = EstadoQtdCidades.filter((estado, i) => {
    if(i < 5){
      return true;
    }
  });


  console.log(statusEstado);
  res.status(200).send(statusEstado);

});

// UF dos cinco estados que mais possuem cidades, seguidos da quantidade.
router.get('/min', (req, res) => {

  // Vetor que armazena todos os estados e quantidade de cidades.
  let EstadoQtdCidades = [];
  
  for (let index = 0; index < dataEstados[0].length; index++) {
    //console.log(dataEstados[0][index].Sigla);

    // Filtra as cidades pela quantidade
    let qtdCidades = dataCidades[0].filter(cidade => {
      return dataEstados[0][index].ID == cidade.Estado;
    });

    EstadoQtdCidades.push({estado: dataEstados[0][index].Sigla, qtdCidade: qtdCidades.length});
    //console.log({estado: dataEstados[0][index].Sigla, qtdCidade: qtdCidades.length});
  }

  // Reorganiza vetor Maior para menor
  EstadoQtdCidades.sort((a, b) =>{
    return a.qtdCidade - b.qtdCidade;
  });

  // Pega os 5 primeiros elementos
  let statusEstado = EstadoQtdCidades.filter((estado, i) => {
    if(i < 5){
      return true;
    }
  });

  statusEstado.sort((a, b) => {
    return b.qtdCidade - a.qtdCidade;
  });

  console.log(statusEstado);
  res.status(200).send(statusEstado);

});

// Array com a cidade de maior nome de cada estado, seguida de seu UF
router.get('/maior', (req, res) => {
  let estadoNomeCidades = [];

  for (let index = 0; index < dataEstados[0].length; index++) {
    // Filtra as cidades pelo maior nome
    let qtdCidades = dataCidades[0].filter(cidade => {
      return dataEstados[0][index].ID == cidade.Estado;
    });

    // Verifica qual cidade tem o maior nome
    let statusNomeCidade = qtdCidades.map(cidade => {
      return {estado: dataEstados[0][index].Sigla, tamanhoNome: cidade.Nome.length, cidade: cidade.Nome};
    });

    statusNomeCidade.sort((a, b) => {
      return a.Nome - b.Nome || b.tamanhoNome - a.tamanhoNome;
    });

    if(dataEstados[0][index].Sigla != 'DF'){
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade});
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[1].cidade});
    } else {
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade});
    }

  }

  console.log(estadoNomeCidades);
  res.status(200).send(estadoNomeCidades);

});

// Array com a cidade de menor nome de cada estado, seguida de seu UF
router.get('/menor', (req, res) => {
  let estadoNomeCidades = [];

  for (let index = 0; index < dataEstados[0].length; index++) {
    // Filtra as cidades pelo maior nome
    let qtdCidades = dataCidades[0].filter(cidade => {
      return dataEstados[0][index].ID == cidade.Estado;
    });

    // Verifica qual cidade tem o maior nome
    let statusNomeCidade = qtdCidades.map(cidade => {
      return {estado: dataEstados[0][index].Sigla, tamanhoNome: cidade.Nome.length, cidade: cidade.Nome};
    });

    statusNomeCidade.sort((a, b) => {
      return a.Nome - b.Nome || a.tamanhoNome - b.tamanhoNome;
    });

    if(dataEstados[0][index].Sigla != 'DF'){
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade});
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[1].cidade});
    } else {
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade});
    }

  }

  console.log(estadoNomeCidades);
  res.status(200).send(estadoNomeCidades);

});

// cidade de maior nome entre todos os estados, seguido do seu UF
router.get('/maiorEstado', (req, res) => {
  let estadoNomeCidades = [];

  for (let index = 0; index < dataEstados[0].length; index++) {
    // Filtra as cidades pelo maior nome
    let qtdCidades = dataCidades[0].filter(cidade => {
      return dataEstados[0][index].ID == cidade.Estado;
    });

    // Verifica qual cidade tem o maior nome
    let statusNomeCidade = qtdCidades.map(cidade => {
      return {estado: dataEstados[0][index].Sigla, tamanhoNome: cidade.Nome.length, cidade: cidade.Nome};
    });

    statusNomeCidade.sort((a, b) => {
      return a.Nome - b.Nome || b.tamanhoNome - a.tamanhoNome;
    });

    if(dataEstados[0][index].Sigla != 'DF'){
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade, tamanho: statusNomeCidade[0].tamanhoNome});
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[1].cidade, tamanho: statusNomeCidade[1].tamanhoNome});
    } else {
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade, tamanho: statusNomeCidade[0].tamanhoNome});
    }

    estadoNomeCidades.sort((a, b) => {
      return a.Nome - b.Nome || b.tamanho - a.tamanho;
    });

  }

  console.log(estadoNomeCidades);
  res.status(200).send(estadoNomeCidades);

});

//  cidade de menor nome entre todos os estados, seguido do seu UF
router.get('/menorEstado', (req, res) => {
  let estadoNomeCidades = [];

  for (let index = 0; index < dataEstados[0].length; index++) {
    // Filtra as cidades pelo maior nome
    let qtdCidades = dataCidades[0].filter(cidade => {
      return dataEstados[0][index].ID == cidade.Estado;
    });

    // Verifica qual cidade tem o maior nome
    let statusNomeCidade = qtdCidades.map(cidade => {
      return {estado: dataEstados[0][index].Sigla, tamanhoNome: cidade.Nome.length, cidade: cidade.Nome};
    });

    statusNomeCidade.sort((a, b) => {
      return a.Nome - b.Nome || b.tamanhoNome - a.tamanhoNome;
    });

    if(dataEstados[0][index].Sigla != 'DF'){
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade, tamanho: statusNomeCidade[0].tamanhoNome});
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[1].cidade, tamanho: statusNomeCidade[1].tamanhoNome});
    } else {
      estadoNomeCidades.push({estado: dataEstados[0][index].Sigla, cidade: statusNomeCidade[0].cidade, tamanho: statusNomeCidade[0].tamanhoNome});
    }

    estadoNomeCidades.sort((a, b) => {
      return a.Nome - b.Nome || a.tamanho - b.tamanho;
    });

  }

  console.log(estadoNomeCidades);
  res.status(200).send(estadoNomeCidades);

});

// Retorna a quantidade de cidades daquele estado.
router.get('/:uf', (req, res) => {
  // Encontra um estado especificado pela URI
  let estado = dataEstados[0].find(estado => estado.Sigla.toLowerCase() == res.params.uf);

  // Encontra a quantidade de cidade do estado.
  let qtdCidades = dataCidades[0].filter(cidade => {
    return cidade.Estado === estado.ID;
  });

  console.log('Estado: '+estado.Sigla+' Quantidade de cidades: '+ qtdCidades.length);
  res.status(200).send({estado: estado.Sigla, quantidadeCidades: qtdCidades.length});
  
});

module.exports = router;