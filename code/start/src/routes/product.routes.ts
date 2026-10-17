import express from 'express';
import { productSchema, productUpdateSchema } from '../validation/product.schema';
import { errorHandler, ValidationError,NotFoundError } from '../utils/errorHandler';
import { Product } from '../models/product.model';

const router = express.Router();
let products: Product[] = [];
let idCounter = 1;

/**
 * @openapi
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

// GET /products
router.get('/', (req, res) => {
  res.json(products);
});

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

// POST /products
router.post('/', (req, res, next) => {
  const parseResult = productSchema.safeParse(req.body);
  
  if (!parseResult.success) {
    return next(new ValidationError('Invalid product data'));
  }

  const newProduct = { 
    id: idCounter++,
    ...parseResult.data,
    createdAt: new Date()
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @openapi
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

// PUT /products/:id
router.put('/:id', (req, res, next) => {
  const parseResult = productUpdateSchema.safeParse(req.body);
  
  if (!parseResult.success) {
    return next(new ValidationError('Invalid product data'));
  }

  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }

  const updatedProduct = {
    ...products[productIndex],
    ...parseResult.data,
    id: productId // Prevent ID modification
  };

  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


// DELETE /products/:id
router.delete('/:id', (req, res, next) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Smartphone"
 *         price:
 *           type: number
 *           format: float
 *           example: 599.99
 *         category:
 *           type: string
 *           enum: [electronics, clothing, books]
 *           example: electronics
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-08-20T12:34:56.789Z"
 *     ProductCreate:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: "Laptop"
 *         price:
 *           type: number
 *           minimum: 0.01
 *           example: 1299.99
 *         category:
 *           type: string
 *           enum: [electronics, clothing, books]
 *           example: electronics
 *     ProductUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: "Updated Laptop"
 *         price:
 *           type: number
 *           minimum: 0.01
 *           example: 1399.99
 *         category:
 *           type: string
 *           enum: [electronics, clothing, books]
 *           example: electronics
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Invalid product data"
 */

// Error handling middleware
router.use(errorHandler);
export default router;