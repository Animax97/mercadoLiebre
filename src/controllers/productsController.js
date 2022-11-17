const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productsdb = products.find(p => p.id == req.params.id)
		res.render('detail', {productsdb})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            category: req.body.category,
            description: req.body.description,
			image: req.file.filename
        }
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

        res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productsdb = products.find(p => p.id == req.params.id)
		res.render('product-edit-form', {productsdb})
	},
	// Update - Method to update
	update: (req, res) => {
			products[req.params.id - 1].name = req.body.name,
            products[req.params.id - 1].price = Number(req.body.price),
            products[req.params.id - 1].discount = Number(req.body.discount),  // cada valor conicide con lo ingresado al modificar el formulario, a traves de req.body.
            products[req.params.id - 1].category = req.body.category,
            products[req.params.id - 1].description = req.body.description,
            products[req.params.id - 1].image = req.body.image

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

        res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;