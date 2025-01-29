import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import db from './db';
import { config } from 'dotenv';

// Configurar dotenv antes de qualquer outra coisa
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());

// Middleware para validação simples
const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
};

const validateNome = (req: Request, res: Response, next: NextFunction) => {
  const { nome } = req.body;
  if (typeof nome !== 'string' || nome.trim() === '') {
    return res.status(400).json({ error: 'Nome inválido' });
  }
  next();
};

// Rotas

// GET - Obter todos os usuários
app.get('/usuarios', (req: Request, res: Response) => {
  db.query('SELECT * FROM cadastro', (err, results) => {
    if (err) {
      console.error('Erro ao obter usuários:', err);
      res.status(500).json({ error: 'Erro ao obter usuários' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});