//conexões com o banco de dados

const moment = require('moment');
//const registro = require('../controllers/registro');
const conexao = require('../infraestrutura/conexao');

class Registro {
    adiciona(registro, req, res) {
        const data_Criacao = new Date //.moment().format('YYYY-MM-DD HH:MM:SS');
        const data_Atualizacao = new Date //.moment(registro.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        //Data atualização por ora vai ser a data posta pelo cliente até arrumar uma lógica mais adequada.
        
        const d_AtualizacaoEhValida = moment(data_Atualizacao).isSameOrAfter(data_Criacao);
        const relevanciaEhValida = (registro.Relevância >=1 && registro.Relevância<= 10);

        const validacoes = [
            {
                nome: 'Data de Atualização',
                valido: d_AtualizacaoEhValida,
                mensagem: 'Data de Atualização deve ser maior ou igual a data de criação.'
            },
            {
                nome: 'Relevância',
                valido: relevanciaEhValida,
                mensagem: 'Relevância deve ser entre 1 a 10, sendo 10 mais relevante.'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        } else {
            const registroDatado = {...registro, data_Criacao, data_Atualizacao}; 
        }

        const sql = 'INSERT INTO Registros SET ?'

        conexao.query(sql, registroDatado, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(201).json(resultados);
            }
        })
    }
    lista(res){
        const sql = 'SELECT * FROM Registros'

        conexao.query(sql, (erro,resultados) => {
            if (erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }
    buscaPorId(id,res){
        const sql = `SELECT * FROM Registros WHERE id = ${id}`;

        conexao.query(sql, (erro,resultados) =>{
            const registro = resultados[0];
            if (erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(registro);
            }
        });
    }
    altera(id, valores, res){
        const sql = 'UPDATE Registros SET ? WHERE id = ?';

        conexao.query(sql, [valores,id], (erro,resultados) => {
            if (erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        });
    }
    deleta(id, res){
        const sql = 'DELETE FROM Registros WHERE id = ?';

        conexao.query(sql, id, (erro, resultados)=>{
            if (erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Registro;