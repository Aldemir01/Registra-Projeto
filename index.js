const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas')

const app = customExpress();

conexao.connect(erro =>{
    if (erro) {
        console.log(erro);
    } else {
        console.log('Passa que conectou!');

        Tabelas.init(conexao);
        const app = customExpress();

        app.listen(3000, () => console.log('Servidor conectado! Rodando na porta 3000'));
    
    }
});

