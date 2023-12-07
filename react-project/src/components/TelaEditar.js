import React, { useState } from 'react';

function TelaEditar({ setTelaAtiva, produtoAtual, setProdutoAtual }) {
  const baseURL = 'http://localhost:3010/api/produtos';
  const [produtoEditado, setProdutoEditado] = useState(produtoAtual);

  const handleChange = (e) => {
    setProdutoEditado({ ...produtoEditado, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    console.log(produtoEditado);
    editProduct(produtoEditado);
    setTelaAtiva('telaInicial');
  };

  function editProduct(produtoEditado) {
    
    const product =  {
      "codigoEAN": produtoEditado.ean,
      "nome": produtoEditado.name,
      "preco": produtoEditado.price,
      "localidadeProducao": {
        "pais": produtoEditado.country,
        "regiao": produtoEditado.region,
        "cidade": produtoEditado.city
      }
    };
  
    const productJSON = JSON.stringify(product);
  
    fetch(baseURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: productJSON
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        return response.json().then(data => {
          throw new Error(data.message);
        });
      } else {
        throw new Error('Erro ao cadastrar o produto');
      }
    })
    .then(data => {
      console.log('Produto cadastrado com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  return (
    <div className="tela">
      <h1>Editar Produto</h1>
      <input type="number" id="ean" value={produtoEditado.ean} onChange={handleChange} required />
      <input type="text" id="name" value={produtoEditado.name} onChange={handleChange} required />
      <input type="number" id="price" value={produtoEditado.price} onChange={handleChange} required />
      <input type="text" id="country" value={produtoEditado.country} onChange={handleChange} required />
      <input type="text" id="region" value={produtoEditado.region} onChange={handleChange} required />
      <input type="text" id="city" value={produtoEditado.city} onChange={handleChange} required />
      <div className="buttons">
        <button onClick={handleEdit}>Editar</button>
        <button onClick={() => setTelaAtiva('telaInicial')}>Voltar para Tela Inicial</button>
      </div>
    </div>
  );
}

export default TelaEditar;
