class Tabelas {
    init(conexao){
        this.conexao = conexao;

        this.criarRegistro();
    };
    criarRegistro(){
        const sql = 'CREATE TABLE IF NOT EXISTS Registros (id int NOT NULL AUTO_INCREMENT, Título VARCHAR(50) NOT NULL, Relevância int NOT NULL, Completa BOOLEAN NOT NULL, Data_Criação DATETIME NOT NULL, Data_Atualização DATETIME NOT NULL, PRIMARY KEY(id));';
    
        this.conexao.query(sql, erro => {
            if (erro){
                console.log(erro);
            } else {
                console.log('Tabela Registro criada com sucesso!');
            };
        });
    };
};

module.exports = new Tabelas;