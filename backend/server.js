const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

// Mock database (replace this with a real database in a production environment)
let { products } = require('./products.js');


// GET all products
app.get('/api/produtos', (req, res) => {
  res.json(products);
});

// GET product by code
app.get('/api/produtos/:ean', (req, res) => {
  const { ean } = req.params;
  const product = products.find(product => product.ean === ean);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.json(product);
});

// POST create a product
app.post('/api/produtos', (req, res) => {
  const newProduct = req.body;
  const existingProduct = products.find(product => product.ean === newProduct.ean);

  if (existingProduct) {
    return res.status(400).json({ message: 'Produto já existe' });
  }

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product by code
app.put('/api/produtos', (req, res) => {
  const updatedProduct = req.body;
  const ean = updatedProduct.ean;
  let found = false;

  products = products.map(product => {
    if (product.ean === ean) {
      found = true;
      return { ...product, ...updatedProduct };
    }
    return product;
  });

  if (!found) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.json({ message: 'Produto atualizado com sucesso' });
});

// DELETE a product by code
app.delete('/api/produtos/:ean', (req, res) => {
  const { ean } = req.params;
  const initialLength = products.length;
  products = products.filter(product => product.ean !== ean);

  if (products.length === initialLength) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.json({ message: 'Produto excluído com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
