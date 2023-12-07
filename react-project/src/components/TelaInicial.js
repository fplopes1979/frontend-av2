import React from 'react';

function TelaInicial({ setTelaAtiva }) {
  return (
    <div className="tela ativa">
      <h1>CRUD de Produtos</h1>
      <p>Escolha uma opção:</p>
      <div className="container">
        <div className="buttons">
          <button onClick={() => setTelaAtiva('telaCadastro')}>Cadastrar Produto</button>
          <button onClick={() => setTelaAtiva('telaBuscar')}>Buscar Produto</button>
          <button onClick={() => setTelaAtiva('telaListar')}>Listar Produtos Cadastrados</button>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
