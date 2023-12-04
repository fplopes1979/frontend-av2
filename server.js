const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock database (replace this with a real database in a production environment)
let products = [];

// GET all products
app.get('/api/produtos', (req, res) => {
  res.json(products);
});

// GET product by code
app.get('/api/produtos/:codigoEAN', (req, res) => {
  const { codigoEAN } = req.params;
  const product = products.find(product => product.codigoEAN === Number(codigoEAN));

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.json(product);
});

// POST create a product
app.post('/api/produtos', (req, res) => {
  const newProduct = req.body;
  const existingProduct = products.find(product => product.codigoEAN === newProduct.codigoEAN);

  if (existingProduct) {
    return res.status(400).json({ message: 'Produto já existe' });
  }

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product by code
app.put('/api/produtos/:codigoEAN', (req, res) => {
  const { codigoEAN } = req.params;
  const updatedProduct = req.body;
  let found = false;

  products = products.map(product => {
    if (product.codigoEAN === Number(codigoEAN)) {
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
app.delete('/api/produtos/:codigoEAN', (req, res) => {
  const { codigoEAN } = req.params;
  const initialLength = products.length;
  products = products.filter(product => product.codigoEAN !== Number(codigoEAN));

  if (products.length === initialLength) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.json({ message: 'Produto excluído com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
