const baseURL = 'http://127.0.0.1:8080/'; // Substitua pela sua URL de API

function submitProduct(event) {
  event.preventDefault();

  const ean = document.getElementById('ean').value;
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const country = document.getElementById('country').value;
  const region = document.getElementById('region').value;
  const city = document.getElementById('city').value;

  const product = {
    codigoEAN: parseInt(ean),
    nome: name,
    preco: parseFloat(price),
    localidadeProducao: {
      pais: country,
      regiao: region,
      cidade: city
    }
  };

  // Enviar requisição para o servidor
  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('result').innerText = 'Produto adicionado/atualizado com sucesso!';
    } else if (response.status === 204) {
      document.getElementById('result').innerText = 'Produto já existe ou não encontrado!';
    } else {
      throw new Error('Erro ao adicionar/atualizar o produto');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function deleteProduct() {
  const ean = document.getElementById('ean').value;

  // Enviar requisição para o servidor
  fetch(`${baseURL}/${ean}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('result').innerText = 'Produto excluído com sucesso!';
    } else if (response.status === 204) {
      document.getElementById('result').innerText = 'Produto não encontrado!';
    } else {
      throw new Error('Erro ao excluir o produto');
    }
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function searchProduct() {
  const ean = document.getElementById('ean').value;

  // Enviar requisição para o servidor
  fetch(`${baseURL}?codigo=${ean}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 204) {
      document.getElementById('result').innerText = 'Produto não encontrado!';
    } else {
      throw new Error('Erro ao buscar o produto');
    }
  })
  .then(data => {
    // Manipular os dados do produto encontrado
    document.getElementById('result').innerText = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}
