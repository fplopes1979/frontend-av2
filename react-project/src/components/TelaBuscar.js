import React, { useState } from 'react';

function TelaBuscar({ setTelaAtiva, setProdutoAtual, produtoAtual }) {
  const baseURL = 'http://localhost:3010/api/produtos';
  const [ean, setEan] = useState('');

  const handleSearch = () => {
    console.log(`Buscar produto com EAN: ${ean}`);
    searchProduct(ean);
  };

  function searchProduct(ean) {
  
    fetch(`${baseURL}/${ean}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 204) {
        window.alert('Produto não cadastrado');
      } else {
        throw new Error('Erro ao buscar o produto');
      }
    })
    .then(data => {
      console.log('Produto encontrado:', data);
      console.log(data.nome);
      setProdutoAtual({
        ean: data.codigoEAN,
        name: data.nome,
        price: data.preco,
        country: data.localidadeProducao.pais,
        region: data.localidadeProducao.regiao,
        city: data.localidadeProducao.cidade
      });
      console.log(produtoAtual);
      setTelaAtiva('telaMostrar');
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  return (
    <div className="tela">
      <h1>Buscar Produto</h1>
      <input type="number" value={ean} onChange={(e) => setEan(e.target.value)} placeholder="Código EAN" required />
      <div className="buttons">
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={() => setTelaAtiva('telaInicial')}>Voltar para Tela Inicial</button>
      </div>
    </div>
  );
}

export default TelaBuscar;
