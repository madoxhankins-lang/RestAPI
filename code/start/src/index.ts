import express from 'express';
import swaggerUi from 'swagger-ui-express';
import productRoutes from './routes/product.routes';
import { errorHandler } from './utils/errorHandler';
import { openApiSpecification } from './utils/swagger';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/api/v1/products', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Product API listening on http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});