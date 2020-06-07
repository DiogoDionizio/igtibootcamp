// As descirções que ja foram passadas no arquivo app.js não serão repetidas.

let express = require('express');

// Responsavel por permitir as rotas no express
let router = express.Router();

// Lista todas as grades
router.get('/', (req, res) => {
  console.log('chamada no grid');
  res.status(200).send(dataGrid);
});

// Nota total de aluno por disciplina
router.get('/nota/:student/:subject', (req, res) =>{
  let data = req.params;

  let student = dataGrid[0].grades.filter(grid => grid.student == data.student && grid.subject == data.subject);
  const sumSubject = student.reduce((acc, cur) =>{
    return acc + cur.value;
  }, 0);
  res.status(200).send({student: data.student, subject: data.subject, soma: sumSubject});
});

// Média das grades de determinado subject e type
router.get('/media/:subject/:type', (req, res) => {
  let data = req.params;

  const gridSubject = dataGrid[0].grades.filter(grid => grid.subject == data.subject && grid.type == data.type);
  const somaSubject = gridSubject.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  console.log('Quantidade: ' + gridSubject.length);
  console.log('Soma: ' + somaSubject);

  res.status(200).send({subject: data.subject, type: data.type, media: (somaSubject / gridSubject.length)});
});

// Retornar as três melhores grades de acordo com determinado subject e type
router.get('/melhores/:subject/:type', (req, res) => {
  let data = req.params;

  // Filtra as melhores notas
  const melhoresNotas = dataGrid[0].grades.filter(grid => grid.subject == data.subject && grid.type == data.type);
  
  // Ordena as melhores notas
  melhoresNotas.sort((a, b) => {
    return b.value - a.value;
  });

  console.log(melhoresNotas);

  // Lista apenas os 3 primeiros
  let tresMelhorNotas = melhoresNotas.filter((notas, i) => {
    if (i < 3) {
      return true;
    }
  });

  res.status(200).send(tresMelhorNotas);
});

// Adiciona uma grade ao arquivos grades.json
router.post('/', (req, res) => {

  try {
    let data = req.body;

    // Pegar a data e hora para fazer o timestamp
    let date = new Date();

    let ano = date.getFullYear();
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let dia = ("0" + date.getDate()).slice(-2);

    // Pegar as Horas minutos e segundos
    let horas = date.getHours();            // Pega as horas
    let minutos = date.getMinutes();        // Pega os minutos
    let segundos = date.getSeconds();       // Pegar os segundos
    let milesimos = date.getMilliseconds(); // Pega os milesimos de segundo

    let timestamp = ano+'-'+mes+'-'+dia+'T'+horas+':'+minutos+':'+segundos+'.'+milesimos+'Z';

    let gradeNova = {"id": dataGrid[0].nextId++, ...data, "timestamp": timestamp};

    dataGrid[0].grades.push(gradeNova);

    res.status(201).send(gradeNova);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }

});

// Encontra uma grade especifica
router.get('/:id', (req, res) =>{
  const grid = dataGrid[0].grades.find(grid => grid.id == req.params.id);
  res.status(200).send(grid);
});

// Deleta uma grade.
router.delete('/:id', (req, res) => {
  // Deleta um registro da grade
  let gridAlterada = dataGrid[0].grades.filter(grid => grid.id != req.params.id);

  dataGrid[0].grades = gridAlterada; // Atualiza a lista de grades
  --dataGrid[0].nextId; // Atualiza o index para menos 1

  res.status(200).end();
});

// Atualizar uma grade
router.put('/', (req, res) => {
  // Tudo que foi passado pelo parametro res
  let atualizarGrid = req.body;

  let oldIndex = dataGrid[0].grades.findIndex(grid => grid.id == atualizarGrid.id);

  if(oldIndex != '-1'){
    dataGrid[0].grades[oldIndex] = atualizarGrid;
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;