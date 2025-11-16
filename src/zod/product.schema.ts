import { z } from 'zod';

export const ZMed = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  category: z.string(),
  inStock: z.boolean(),
  costPrice: z.number(),
  salePrice: z.number(),
  description: z.string().optional(),
});

export const ZMedArray = z.array(ZMed);
export type ZMed = z.infer<typeof ZMed>;
