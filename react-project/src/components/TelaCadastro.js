import React, { useState } from 'react';

function TelaCadastro({ setTelaAtiva }) {
  const baseURL = 'http://localhost:3010/api/produtos';

  const [produto, setProduto] = useState({
    ean: '',
    name: '',
    price: '',
    country: '',
    region: '',
    city: ''
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProduct(produto)
    setTelaAtiva('telaInicial');
  };

  function submitProduct(produto) {

    const product =  {
      "codigoEAN": produto.ean,
      "nome": produto.name,
      "preco": produto.price,
      "localidadeProducao": {
        "pais": produto.country,
        "regiao": produto.region,
        "cidade": produto.city
      }
    };
  
    const productJSON = JSON.stringify(product);
  
    fetch(baseURL, {
      method: 'POST',
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
      <h1>Cadastrar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" id="ean" placeholder="Código EAN" required onChange={handleChange} />
        <input type="text" id="name" placeholder="Nome" required onChange={handleChange} />
        <input type="number" id="price" step="0.01" placeholder="Preço" required onChange={handleChange} />
        <input type="text" id="country" placeholder="País" required onChange={handleChange} />
        <input type="text" id="region" placeholder="Região" required onChange={handleChange} />
        <input type="text" id="city" placeholder="Cidade" required onChange={handleChange} />
        <div className="buttons">
          <button type="submit">Adicionar</button>
          <button type="reset" onClick={() => setTelaAtiva('telaInicial')}>Voltar para Tela Inicial</button>
        </div>
      </form>
    </div>
  );
}

export default TelaCadastro;
