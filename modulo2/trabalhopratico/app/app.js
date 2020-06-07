// Const que chama o framework express
const express = require("express");

// Responsavel por tratar os dados no directorio
var fs = require('fs');

global.fileName = 'accounts.json';
global.filenameEstados = 'estados.json';
global.filenameCidades = 'cidades.json';

// Vetores de dados
global.dataEstados = [];
global.dataCidades = [];



// Const do app inicia o framework
var app = express();

let accountsRouter = require('../routes/accounts.js'); // importando o modulo account
let estadosRouter = require('../routes/estado.js'); // importando o modulo de estados

app.use(express.json()); // Define o padrao json para o express
app.use('/account', accountsRouter);
app.use('/estado', estadosRouter);

// Define a porta para 3000
const port = 3000;


app.get('/', (req, res) => {
  // Envia uma resposta JSON minha API viva
  res.json({status: "My API is alive!"});
});

app.listen(port, () => {

  // Carregar os estados
  try {
    fs.readFile(global.filenameEstados, 'utf-8', (err, data) => {
      if(err) {
        // Error
        console.log('Error ao carregar os estados!');

      } else {
        // Carrega os estados
        let estadoJson = JSON.parse(data);
        global.dataEstados.push(estadoJson);
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  // Carregar as cidades
  try {
    fs.readFile(global.filenameCidades, 'utf-8', (err, data) => {
      if(err) {
        // Error
        console.log('Error ao carregar as cidades!');

      } else {
        // Carrega os estados
        let cidadeJson = JSON.parse(data);
        global.dataCidades.push(cidadeJson);
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  /*
  // Cria o arquivo json
  try {
    fs.readFile(global.fileName, "utf8", (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: []
        };

        fs.writeFile(global.fileName, JSON.stringify(initialJson), err => {
          console.log({error: err.message});
        });
      }
    });
  } catch (err) {
    console.log({error: err.message});
  }
  */

  // Imprimi no console os dados
  console.log(`App ouvindo na porta: ${port}`);
});