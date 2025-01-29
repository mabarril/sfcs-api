"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = require("dotenv");
// Configurar dotenv antes de qualquer outra coisa
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
// Middleware para validação simples
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    next();
};
const validateNome = (req, res, next) => {
    const { nome } = req.body;
    if (typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome inválido' });
    }
    next();
};
// Rotas
// GET - Obter todos os usuários
app.get('/usuarios', (req, res) => {
    db_1.default.query('SELECT * FROM cadastro', (err, results) => {
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
