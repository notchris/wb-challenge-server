/**
 * Whitebox Code Challenge: Serve
 * https://github.com/whitebox-co/code-challenge
 * Chris McGrane
 * 10/1/2020
*/

const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
app.use(cors())

const router = express.Router()


/**
 * Set source data url & fetch initial data - in a prod. scenario,
 * this request would happen for each user session so that the data is fresh and would
 * also include an try/catch if unable to load or parse the JSON
 */
const dataURL = 'https://next.json-generator.com/api/json/get/EkzBIUWNL'
let products

fetch(dataURL)
.then(res => res.json())
.then(json => products = json)


/**
 * Endpoint: /GetMany
 * Returns a list of all available products
 */
router.get('/GetMany', (req,res) => {
  if (products.length) {
    res.status(200).json(products)
  } else {
    res.status(400).json({
      message: 'Could not find any products'
    })
  }
})

/**
 * Endpoint: /GetSingle/id
 * Returns a single product by product ID
 */
router.get('/GetSingle/:id', (req,res) => {
  let product = products.filter((p) => p._id === req.params.id)
  if (product.length) {
    res.status(200).json(product[0])
  } else {
    res.status(400).json({
      message: 'Invalid product ID'
    })
  }
})


/**
 * Start server
 */
app.use('/', router)
app.listen(process.env.port || 8080)
console.log('Running on Port 8080')