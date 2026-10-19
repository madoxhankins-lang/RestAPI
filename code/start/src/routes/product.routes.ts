import express from 'express';
import { productSchema, productUpdateSchema } from '../validation/product.schema';
import { NotFoundError, ValidationError } from '../utils/errorHandler';
import { Product } from '../models/product.model';

const router = express.Router();
let products: Product[] = [];
let idCounter = 1;

const parseProductId = (value: string): number => {
  const productId = Number(value);
  if (!Number.isSafeInteger(productId) || productId < 1) {
    throw new ValidationError('Product ID must be a positive integer');
  }
  return productId;
};

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
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product ID
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
router.get('/:id', (req, res, next) => {
  try {
    const productId = parseProductId(req.params.id);
    const product = products.find((item) => item.id === productId);

    if (!product) {
      return next(new NotFoundError('Product not found'));
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
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
 *         description: Invalid product ID or validation error
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
  try {
    const productId = parseProductId(req.params.id);
    const parseResult = productUpdateSchema.safeParse(req.body);

    if (!parseResult.success) {
      return next(new ValidationError('Invalid product data'));
    }

    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
      return next(new NotFoundError('Product not found'));
    }

    const updatedProduct = {
      ...products[productIndex],
      ...parseResult.data
    };

    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
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
 *       400:
 *         description: Invalid product ID
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


// DELETE /products/:id
router.delete('/:id', (req, res, next) => {
  let productId: number;
  try {
    productId = parseProductId(req.params.id);
  } catch (error) {
    return next(error);
  }
  const productIndex = products.findIndex((product) => product.id === productId);

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
 *       anyOf:
 *         - required: [name]
 *         - required: [price]
 *         - required: [category]
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

export default router;