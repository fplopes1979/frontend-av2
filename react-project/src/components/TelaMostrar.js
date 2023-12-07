import React from 'react';

function TelaMostrar({ produtoAtual, setTelaAtiva }) {

    function deleteProduct(ean) {
        const baseURL = 'http://localhost:3010/api/produtos';

        fetch(`${baseURL}/${ean}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            return response.json().then(data => {
              throw new Error(data.message);
            });
          } else {
            throw new Error('Erro ao excluir o produto');
          }
        })
        .then(data => {
          console.log('Produto excluído com sucesso:', data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
      }
      
      function confirmDelete(id) {
        const confirmDelete = window.confirm('Deseja realmente excluir este produto?');
      
        if (confirmDelete) {
          deleteProduct(id);
          setTelaAtiva('telaInicial')
        }
      }

  return (
    <div className="tela">
      <h1>Informações do Produto</h1>
      <p>{`Código EAN: ${produtoAtual.ean}`}</p>
      <p>{`Nome: ${produtoAtual.name}`}</p>
      <p>{`Preço: ${produtoAtual.price}`}</p>
      <p>{`País: ${produtoAtual.country}`}</p>
      <p>{`Região: ${produtoAtual.region}`}</p>
      <p>{`Cidade: ${produtoAtual.city}`}</p>
      <div className="buttons">
        <button onClick={() => setTelaAtiva('telaEditar')}>Editar</button>
        <button onClick={() => {confirmDelete(produtoAtual.ean)}}>Excluir</button>
        <button onClick={() => setTelaAtiva('telaInicial')}>Voltar para Tela Inicial</button>
      </div>
    </div>
  );
}

export default TelaMostrar;
