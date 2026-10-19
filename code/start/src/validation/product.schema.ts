import { z } from 'zod';

const productFields = {
  name: z.string().trim().min(3).max(50),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'books'])
};

export const productSchema = z.object(productFields).strict();

export const productUpdateSchema = z
  .object(productFields)
  .partial()
  .strict()
  .refine((product) => Object.keys(product).length > 0, {
    message: 'At least one product field is required'
  });