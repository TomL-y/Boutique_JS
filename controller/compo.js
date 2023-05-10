const products = require('../products.json');

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).send('Produit introuvable');
  }
  res.json(product);
};
