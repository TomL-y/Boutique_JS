const express = require('express');
const router = express.Router();
const compoController = require('../controller/compo');

// Route pour obtenir tous les produits
router.get('/', compoController.getProducts);

// Route pour obtenir un produit par ID
router.get('/:id', compoController.getProductById);

module.exports = router;
