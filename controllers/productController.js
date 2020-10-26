const products = require("../data/products.json")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")

// @route GET /api/products
// @desc Get All products
const getAllProducts = (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" })
  res.end(JSON.stringify(products))
}

// @route GET /api/products/:id
// @desc Get single products
const getSingleProduct = (req, res, id) => {
  const product = products.find(p => p.id === id)
  if (!product) {
    res.writeHead(404, { "Content-type": "application/json" })
    res.end(JSON.stringify({ msg: "Product Not Found" }))
  }
  res.writeHead(200, { "Content-type": "application/json" })
  res.end(JSON.stringify(product))
}

// @route DELETE /api/products/:id
// @desc Delete single product
const deleteProduct = (req, res, id) => {
  const product = products.find(p => p.id === id)

  if (!product) {
    res.writeHead(404, { "Content-type": "application/json" })
    res.end(JSON.stringify({ msg: "Product not Found" }))
  } else {
    const updProducts = products.filter(product => product.id !== id)
    fs.writeFileSync(
      "./data/products.json",
      JSON.stringify(updProducts),
      err => {
        if (err) throw err
      }
    )
    res.writeHead(200, { "Content-type": "application/json" })
    res.end(JSON.stringify(updProducts))
  }
}

// @route POST /api/products
// @desc Create single product
const createProduct = (req, res) => {
  const newProducts = [
    ...products,
    {
      id: uuidv4(),
      name: `product ${(Math.random() * 10) ^ 100}`,
      description: `description ${(Math.random() * 10) ^ 5}`,
    },
  ]
  fs.writeFileSync("./data/products.json", JSON.stringify(newProducts), err => {
    if (err) throw err
  })
  res.writeHead(201, { "Content-type": "application/json" })
  res.end(JSON.stringify(newProducts))
}

// @route PUT /api/products/:id
// @desc Update single product
const updateProduct = (req, res, id) => {
  const product = products.find(p => p.id === id)
  if (!product) {
    res.writeHead(404, { "Content-type": "application/json" })
    res.end(JSON.stringify({ msg: "Product not Found" }))
  }

  const updProduct = {
    ...product,
    name: `Name updated ${product.name} ${(Math.random() * 10) ^ 90}`,
    description: `Description Updated ${product.description} ${
      (Math.random() * 10) ^ 90
    }`,
  }

  const updProducts = [...products.filter(p => p.id !== id), updProduct]

  fs.writeFileSync("./data/products.json", JSON.stringify(updProducts), err => {
    if (err) throw err
  })

  res.writeHead(200, { "Content-type": "application/json" })
  res.end(JSON.stringify(updProducts))
}

// @desc Route not found
const routeNotFound = (req, res) => {
  res.writeHead(404, { "Content-type": "application/json" })
  res.end(JSON.stringify({ msg: "Something went wrong" }))
}

module.exports = {
  getSingleProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  routeNotFound,
}
