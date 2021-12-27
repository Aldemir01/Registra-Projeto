const consign = require('consign');
const Registro = require('../models/registros');

module.exports = app => {
    app.get('/', (req,res) => res.send('Registra Projeto: Uma API para você registrar seu Projeto.'));
    app.get('/registros', (req,res) => res.send('Registra Projeto: Registre seu projeto aqui.(GET)'));
    
    app.get('/registros', res => {
        Registro.lista(res);
    });

    app.get('registros/:id', (req,res) =>{
        const id =parseInt(req.params.id);
        Registro.buscaPorId(id, res);
    });

    app.post('/registros', (req,res) => {
        const registro = req.body;

        Registro.adiciona(registro, res);
        
    });
    app.patch('/registros/:id', (req,res)=>{
        const id = parseInt(req.params.id);
        const valores = req.body;

        Registro.altera(id, valores,res);
    });
    app.delete('registros/:id', (req,res) =>{
        const id = parseInt(req.params.id);

        Registro.deleta(id, res);
    });
};