import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cadastroRoutes from './routes/cadastro/cadastro';
import cadRoutes from './routes/cad';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());

app.use('/cadastros', cadastroRoutes);
app.use('/cad', cadRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});