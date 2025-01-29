const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { body, param, validationResult } = require('express-validator');
const db = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());

// Middleware para lidar com erros de validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rotas

// GET - Obter todos os usuários
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM cadastro', (err, results) => {
    if (err) {
      console.error('Erro ao obter usuários:', err);
      res.status(500).json({ error: 'Erro ao obter usuários' });
      return;
    }
    res.json(results);
  });
});

// GET - Obter usuário por ID
app.get('/usuarios/:id', param('id').isInt(), validate, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao obter usuário:', err);
      res.status(500).json({ error: 'Erro ao obter usuário' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// POST - Criar novo usuário
app.post('/usuarios', body('nome').isString().notEmpty(), validate, (req, res) => {
  const { nome } = req.body;
  db.query('INSERT INTO usuarios (nome) VALUES (?)', [nome], (err, results) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      res.status(500).json({ error: 'Erro ao criar usuário' });
      return;
    }
    res.status(201).json({ id: results.insertId, message: 'Usuário criado com sucesso' });
  });
});

// PUT - Atualizar usuário
app.put('/usuarios/:id', [
  param('id').isInt(),
  body('nome').isString().notEmpty()
], validate, (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  db.query('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
      return;
    }
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
});

// DELETE - Excluir usuário
app.delete('/usuarios/:id', param('id').isInt(), validate, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
      return;
    }
    res.json({ message: 'Usuário excluído com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});