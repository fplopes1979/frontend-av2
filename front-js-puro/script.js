const baseURL = 'http://localhost:3010/api/produtos';

function submitProduct() {

  const ean = document.getElementById('ean1').value;
  const name = document.getElementById('name1').value;
  const price = document.getElementById('price1').value;
  const country = document.getElementById('country1').value;
  const region = document.getElementById('region1').value;
  const city = document.getElementById('city1').value;

  const product =  {
    "codigoEAN": ean,
    "nome": name,
    "preco": price,
    "localidadeProducao": {
      "pais": country,
      "regiao": region,
      "cidade": city
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
    mostrarTela('telaListar')
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function editProduct() {

  const ean = document.getElementById('ean4').value;
  const name = document.getElementById('name4').value;
  const price = document.getElementById('price4').value;
  const country = document.getElementById('country4').value;
  const region = document.getElementById('region4').value;
  const city = document.getElementById('city4').value;

  const product =  {
    "codigoEAN": ean,
    "nome": name,
    "preco": price,
    "localidadeProducao": {
      "pais": country,
      "regiao": region,
      "cidade": city
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
    console.log(response);
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
    mostrarTela('telaListar')
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function deleteProduct(ean) {

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
    mostrarTela('telaListar')
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function searchProduct(ean) {

  fetch(`${baseURL}/${ean}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return response.json().then(data => {
        throw new Error(data.message);
      });
    } else {
      throw new Error('Erro ao buscar o produto');
    }
  })
  .then(data => {
    console.log('Produto encontrado:', data);
    mostrarTela('telaMostrar');
    document.getElementById('ean3').value = data.codigoEAN;
    document.getElementById('name3').value = data.nome;
    document.getElementById('price3').value = data.preco;
    document.getElementById('country3').value = data.localidadeProducao.pais;
    document.getElementById('region3').value = data.localidadeProducao.regiao;
    document.getElementById('city3').value = data.localidadeProducao.cidade;
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function getAllProducts() {

  fetch(`${baseURL}`)
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
    const tableBody = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";
    products.forEach(product => {
      console.log('Product:', product);
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${product.codigoEAN}</td>
        <td>${product.nome}</td>
        <td>${product.preco}</td>
        <td>${product.localidadeProducao.pais}</td>
        <td>${product.localidadeProducao.regiao}</td>
        <td>${product.localidadeProducao.cidade}</td>
        <td><button onclick="searchProduct(${product.codigoEAN})">Visualizar</button></td>
      `;
    });
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function mostrarTela(telaId) {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela => tela.classList.remove('ativa'));

  const telaSelecionada = document.getElementById(telaId);
  telaSelecionada.classList.add('ativa');

  if (telaId == 'telaListar') {
    getAllProducts();
  }
}

function confirmDelete(id) {
  const confirmDelete = window.confirm('Deseja realmente excluir este produto?');

  if (confirmDelete) {
    deleteProduct(id);
  }
}

