const http = require("http")
const colors = require("colors")
const products = require("./data/products.json")

const {
  getSingleProduct,
  getAllProducts,
  routeNotFound,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("./controllers/productController")

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getAllProducts(req, res)
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3]
    getSingleProduct(req, res, id)
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res)
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3]
    deleteProduct(req, res, id)
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3]
    updateProduct(req, res, id)
  } else {
    routeNotFound(req, res)
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () =>
  console.log(`Server up and running on ${PORT}`.yellow.underline)
)
