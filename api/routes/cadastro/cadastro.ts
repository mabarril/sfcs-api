const { Router } = require('express');
const { body, param, validationResult } = require('express-validator');
const db = require('../../db');

const router = Router();

// Middleware para lidar com erros de validação
import { Request, Response, NextFunction } from 'express';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET - Obter todos os cadastros
router.get('/', (req: Request, res: Response) => {
  db.query('SELECT * FROM cadastro', (err: Error, results: any) => {
    if (err) {
      console.error('Erro ao obter cadastros:', err);
      res.status(500).json({ error: 'Erro ao obter cadastros' });
      return;
    }
    res.json(results);
  });
});

// GET - Obter cadastro por ID
router.get('/:id', param('id').isInt(), validate, (req: Request, res: Response) => {
  const { id } = req.params;
  db.query('SELECT * FROM cadastro WHERE id = ?', [id], (err: Error, results: any) => {
    if (err) {
      console.error('Erro ao obter cadastro:', err);
      res.status(500).json({ error: 'Erro ao obter cadastro' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Cadastro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// // POST - Criar novo cadastro
// router.post('/', [
//   body('id').isInt(),
//   body('nome').isString().notEmpty(),
//   body('cargo').isString().notEmpty(),
//   body('ativo').isBoolean()
// ], validate, (req: Request, res: Response) => {
//   const { id, nome, cargo, ativo } = req.body;
//   db.query('INSERT INTO cadastro (id, nome, cargo, ativo) VALUES (?, ?, ?, ?)', [id, nome, cargo, ativo], (err, results) => {
//     if (err) {
//       console.error('Erro ao criar cadastro:', err);
//       res.status(500).json({ error: 'Erro ao criar cadastro' });
//       return;
//     }
//     res.status(201).json({ id: id, message: 'Cadastro criado com sucesso' });
//   });
// });

// // PUT - Atualizar cadastro
// router.put('/:id', [
//   param('id').isInt(),
//   body('nome').isString().notEmpty(),
//   body('cargo').isString().notEmpty(),
//   body('ativo').isBoolean()
// ], validate, (req, res) => {
//   const { id } = req.params;
//   const { nome, cargo, ativo } = req.body;
//   db.query('UPDATE cadastro SET nome = ?, cargo = ?, ativo = ? WHERE id = ?', [nome, cargo, ativo, id], (err) => {
//     if (err) {
//       console.error('Erro ao atualizar cadastro:', err);
//       res.status(500).json({ error: 'Erro ao atualizar cadastro' });
//       return;
//     }
//     res.json({ message: 'Cadastro atualizado com sucesso' });
//   });
// });

// // DELETE - Excluir cadastro
// router.delete('/:id', param('id').isInt(), validate, (req: Request, res: Response) => {
//   const { id } = req.params;
//   db.query('DELETE FROM cadastro WHERE id = ?', [id], (err) => {
//     if (err) {
//       console.error('Erro ao excluir cadastro:', err);
//       res.status(500).json({ error: 'Erro ao excluir cadastro' });
//       return;
//     }
//     res.json({ message: 'Cadastro excluído com sucesso' });
//   });
// });

module.exports = router;