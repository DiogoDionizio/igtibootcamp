// As descirções que ja foram passadas no arquivo app.js não serão repetidas.

let express = require('express');

// Responsavel por permitir as rotas no express
let router = express.Router();

// Lista todas as grades
router.get('/', (req, res) => {
  console.log('chamada no grid');
  res.status(200).send(dataGrid);
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

    dataGrid[0].grades.push({
      "id": dataGrid[0].nextId++, 
      "student": data.student,
      "subject": data.subject,
      "type": data.type,
      "value": data.value,
      "timestamp": timestamp,
    });
    

    res.status(201).end();
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }

});

// Encontra uma grade especifica
router.get('/:id')

// Deleta uma grade.

module.exports = router;