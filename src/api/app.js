const express = require('express');

const routers = require('../routes');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', routers.user);
app.use('/login', routers.login);

module.exports = app;
