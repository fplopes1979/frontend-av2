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

  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 400) {
      return response.json().then(data => {
        throw new Error(data.message);
      });
    } else {
      throw new Error('Erro ao adicionar/atualizar o produto');
    }
  })
  .then(data => {
    console.log('Produto adicionado/atualizado com sucesso:', data);
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

function searchProduct() {
  const ean = document.getElementById('ean').value;

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
  .then(data => {
    console.log('Produtos encontrados:', data);
    // You can perform any additional actions here upon successful response
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

