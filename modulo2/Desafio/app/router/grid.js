// As descirções que ja foram passadas no arquivo app.js não serão repetidas.

let express = require('express');

// Responsavel por permitir as rotas no express
let router = express.Router();

// Lista todas as grades
router.get('/', (req, res) => {
  console.log('chamada no grid');
  res.status(200).send(dataGrid);
});

// Adiciona uma grade
router.post('/', (req, res) => {
  
});

// Encontra uma grade especifica

// Deleta uma grade.

module.exports = router;