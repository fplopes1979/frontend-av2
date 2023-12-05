const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

// Mock database
let { products } = require('./products.js');

// GET all products
app.get('/api/produtos', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(products);
});

// GET product by code
app.get('/api/produtos/:ean', (req, res) => {
  const { ean } = req.params;
  const product = products.find(product => product.codigoEAN === Number(ean));

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  
  res.set('Access-Control-Allow-Origin', '*');
  res.json(product);
});

// POST 
app.post('/api/produtos', (req, res) => {
  const newProduct = req.body;
  const existingProduct = products.find(product => product.codigoEAN === newProduct.codigoEAN);

  if (existingProduct) {
    return res.status(400).json({ message: 'Produto já existe' });
  }

  products.push(newProduct);

  res.set('Access-Control-Allow-Origin', '*');
  res.status(201).json(newProduct);
});

// PUT
app.put('/api/produtos', (req, res) => {
  const updatedProduct = req.body;
  const ean = updatedProduct.codigoEAN;
  let found = false;

  products = products.map(product => {
    if (product.codigoEAN === ean) {
      found = true;
      return { ...product, ...updatedProduct };
    }
    return product;
  });

  if (!found) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: 'Produto atualizado com sucesso' });
});

// DELETE
app.delete('/api/produtos/:ean', (req, res) => {
  const { ean } = req.params;
  const initialLength = products.length;
  products = products.filter(product => product.codigoEAN !== Number(ean));

  if (products.length === initialLength) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: 'Produto excluído com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
