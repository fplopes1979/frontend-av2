import React, { useState } from 'react';
import TelaInicial from './components/TelaInicial';
import TelaCadastro from './components/TelaCadastro';
import TelaBuscar from './components/TelaBuscar';
import TelaListar from './components/TelaListar';
import TelaMostrar from './components/TelaMostrar';
import TelaEditar from './components/TelaEditar';

function App() {
  const [telaAtiva, setTelaAtiva] = useState('telaInicial');
  const [produtoAtual, setProdutoAtual] = useState({
    ean: 0,
    name: '',
    price: 0.0,
    country: '',
    region: '',
    city: ''
  });

  return (
    <div>
      {telaAtiva === 'telaInicial' && <TelaInicial setTelaAtiva={setTelaAtiva} />}
      {telaAtiva === 'telaCadastro' && <TelaCadastro setTelaAtiva={setTelaAtiva} />}
      {telaAtiva === 'telaBuscar' && <TelaBuscar setTelaAtiva={setTelaAtiva} setProdutoAtual={setProdutoAtual} produtoAtual={produtoAtual}/>}
      {telaAtiva === 'telaEditar' && <TelaEditar setTelaAtiva={setTelaAtiva} setProdutoAtual={setProdutoAtual} produtoAtual={produtoAtual}/>}
      {telaAtiva === 'telaListar' && <TelaListar setTelaAtiva={setTelaAtiva} />}
      {telaAtiva === 'telaMostrar' && <TelaMostrar setTelaAtiva={setTelaAtiva} produtoAtual={produtoAtual} />}
    </div>
  );
}

export default App;
