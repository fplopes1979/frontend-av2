import React, { useState, useLayoutEffect } from 'react';

function TelaListar({ setTelaAtiva }) {
  const BASE_URL = 'http://localhost:3010/api/produtos'
  const [produtos, setProdutos] = useState([]);

  useLayoutEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch(`${BASE_URL}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        return response.json().then(data => {
          throw new Error(data.message);
        });
      } else {
        throw new Error('Erro ao buscar os produtos');
      }
    })
    .then(products => {
      console.log('Produtos encontrados:', products);
      setProdutos(products);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  return (
    <div className="tela">
      <h1>Lista de Produtos</h1>
      <button onClick={() => setTelaAtiva('telaCadastro')}>Cadastrar Produto</button>
      <button onClick={() => setTelaAtiva('telaInicial')}>Voltar para Tela Inicial</button>
      <table>
        <thead>
          <tr>
            <th>Código EAN</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>País</th>
            <th>Região</th>
            <th>Cidade</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.codigoEAN}</td>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>{produto.localidadeProducao.pais}</td>
              <td>{produto.localidadeProducao.regiao}</td>
              <td>{produto.localidadeProducao.cidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TelaListar;
