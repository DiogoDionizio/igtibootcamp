// Const que chama o frameworks express
const express = require('express');

// Responsavel por tratar os dados no directorio
let fs = require('fs');

// Arquivo responsavel pelo GRID
global.filenameGrid = 'app/grades.json';

// Vetor responsavel pelos dados globais da grade.
global.dataGrid = [];

// Const do app inicia o framework
var app = express();

// Responsavel pelas rotas
let gradesRouter = require('./router/grid.js');

app.use(express.json()); // Define o padrão json para o modelo de trabalho no express
app.use('/grid', gradesRouter); // Chama a rota grid

// Define a porta para ser utilizada
const porta = 3000;

app.get('/', (req, res) => {
  res.json({status: 'My API is alive!'});
});

app.listen(porta, () => {

  try {

    fs.readFile(filenameGrid, 'utf-8', (err, data) => {
      // Verifica se encontrou algum erro de leitura do arquivo
      if(err){
        // Exibe a msg de error
        console.log('Error: Grid.json não encontrado!');
      } else {
        // Caso tenha lido o documento corretamente.
        let gridJson = JSON.parse(data);
        dataGrid.push(gridJson);
      }
    });

  } catch (error) {
    console.log(error.message);
  }

});