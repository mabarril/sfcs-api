"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// Middleware para lidar com erros de validação
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
// GET - Obter todos os cadastros
router.get('/', (req, res) => {
    db_1.default.query('SELECT * FROM cadastro', (err, results) => {
        if (err) {
            console.error('Erro ao obter cadastros:', err);
            res.status(500).json({ error: 'Erro ao obter cadastros' });
            return;
        }
        res.json(results);
    });
});
// GET - Obter cadastro por ID
router.get('/:id', (0, express_validator_1.param)('id').isInt(), validate, (req, res) => {
    const { id } = req.params;
    db_1.default.query('SELECT * FROM cadastro WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao obter cadastro:', err);
            res.status(500).json({ error: 'Erro ao obter cadastro' });
            return;
        }
        if (results) {
            res.status(404).json({ message: 'Cadastro não encontrado' });
            return;
        }
        res.json(results[0]);
    });
});
// POST - Criar novo cadastro
router.post('/', [
    (0, express_validator_1.body)('id').isInt(),
    (0, express_validator_1.body)('nome').isString().notEmpty(),
    (0, express_validator_1.body)('funcao').isString().notEmpty(),
    (0, express_validator_1.body)('ativo').isBoolean()
], validate, (req, res) => {
    const { id, nome, funcao, ativo } = req.body;
    db_1.default.query('INSERT INTO cadastro (id, nome, funcao, ativo) VALUES (?, ?, ?, ?)', [id, nome, funcao, ativo], (err, results) => {
        if (err) {
            console.error('Erro ao criar cadastro:', err);
            res.status(500).json({ error: 'Erro ao criar cadastro' });
            return;
        }
        res.status(201).json({ id: id, message: 'Cadastro criado com sucesso' });
    });
});
// PUT - Atualizar cadastro
router.put('/:id', [
    (0, express_validator_1.param)('id').isInt(),
    (0, express_validator_1.body)('nome').isString().notEmpty(),
    (0, express_validator_1.body)('funcao').isString().notEmpty(),
    (0, express_validator_1.body)('ativo').isBoolean()
], validate, (req, res) => {
    const { id } = req.params;
    const { nome, funcao, ativo } = req.body;
    db_1.default.query('UPDATE cadastro SET nome = ?, funcao = ?, ativo = ? WHERE id = ?', [nome, funcao, ativo, id], (err) => {
        if (err) {
            console.error('Erro ao atualizar cadastro:', err);
            res.status(500).json({ error: 'Erro ao atualizar cadastro' });
            return;
        }
        res.json({ message: 'Cadastro atualizado com sucesso' });
    });
});
// DELETE - Excluir cadastro
router.delete('/:id', (0, express_validator_1.param)('id').isInt(), validate, (req, res) => {
    const { id } = req.params;
    db_1.default.query('DELETE FROM cadastro WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Erro ao excluir cadastro:', err);
            res.status(500).json({ error: 'Erro ao excluir cadastro' });
            return;
        }
        res.json({ message: 'Cadastro excluído com sucesso' });
    });
});
exports.default = router;
