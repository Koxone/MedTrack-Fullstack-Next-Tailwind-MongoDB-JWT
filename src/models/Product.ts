import mongoose, { Document, Model, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  inStock: boolean;
  costPrice: number;
  salePrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    inStock: { type: Boolean, default: true },
    costPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};

export const Product: Model<IProduct> =
  (models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
export type { IProduct };
