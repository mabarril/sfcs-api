const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cadastroRoutes = require('./routes/cadastro/cadastro');
const cadRoutes = require('./routes/cad');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());

app.use('/cadastros', cadastroRoutes);
app.use('/cad', cadRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;