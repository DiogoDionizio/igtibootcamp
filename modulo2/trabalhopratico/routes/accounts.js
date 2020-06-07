let express = require("express"); // Chama a biblioteca express do node
let router = express.Router(); // Chama o modulo router 'Que tem como função gerenciar rotas'

// Responsavel por tratar os dados no directorio
var fs = require('fs');

router.post('/', (req, res) => {
  let account = req.body;

  // res.status(201).send({data: params});

  fs.readFile(global.fileName, "utf8", (err, data) => {

    if (!err) {

      try {

        let json = JSON.parse(data);

        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        
        fs.writeFile(global.fileName, JSON.stringify(json), err => {

          if(err) {
            res.status(400).send({error: err.message});
          } else {
            res.status(201).end();
          }

        });

      } catch (err) {
        res.status(400).send({error: err.message});
      }
      
    } else {
      console.log("erro na leitura");
      res.status(400).send({error: err.message});
    }

  });
});

router.get("/", (req, res) => {
  fs.readFile(global.fileName, "utf8", (err, data) => {
    if(err) {
      res.status(400).send({error: err.message});
    } else {
      let json = JSON.parse(data);
      delete json.nextId;
      res.status(200).send(json);
    }
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  fs.readFile(global.fileName, "utf8", (err, data) => {
    if(err) {
      res.status(400).send({error: err.message});
    } else {
      let json = JSON.parse(data);
      delete json.nextId;
      const account = json.accounts.find(account => account.id === parseInt(id));

      if(account){
        res.status(200).send(account);
      } else {
        res.end();
      }
      
    }
  });
});

module.exports = router;