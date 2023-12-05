const baseURL = 'http://localhost:3010/api/produtos'; // Replace with your server URL

function submitProduct() {

  const ean = document.getElementById('ean').value;
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const country = document.getElementById('country').value;
  const region = document.getElementById('region').value;
  const city = document.getElementById('city').value;

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
    // You can perform any additional actions here upon successful response
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function editProduct() {

  const ean = document.getElementById('ean').value;
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const country = document.getElementById('country').value;
  const region = document.getElementById('region').value;
  const city = document.getElementById('city').value;

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
    // You can perform any additional actions here upon successful response
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function deleteProduct() {
  const ean = document.getElementById('ean').value;

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
    // You can perform any additional actions here upon successful response
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
    // You can perform any additional actions here upon successful response
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

