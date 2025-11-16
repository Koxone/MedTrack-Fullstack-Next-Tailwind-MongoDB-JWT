import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';
import { IProduct } from './Product';
import { ITransaction } from './Transaction';

/* --- Sub Interface for items sold --- */
interface ISoldItem {
  product: mongoose.Types.ObjectId | IProduct;
  inventory: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  total: number;
}

/* --- Main Interface --- */
interface IConsultation extends Document {
  employee: mongoose.Types.ObjectId | IUser;
  consultationType: string;
  patient: mongoose.Types.ObjectId | IUser;
  cost: number;
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia';
  itemsSold: ISoldItem[];
  
  date: Date;
  time: string;
  transactions: (mongoose.Types.ObjectId | ITransaction)[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* --- Mongoose Schema --- */
const ConsultationSchema = new Schema<IConsultation>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employee: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    date: { type: Date, required: true },
    time: { type: String, required: true },

    consultationType: { type: String, trim: true, required: true },

    cost: { type: Number, required: true, min: 0 },

    paymentMethod: {
      type: String,
      enum: ['efectivo', 'tarjeta', 'transferencia'],
      required: true,
    },

    itemsSold: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        inventory: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],

    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],

    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

/* --- Model Export --- */
const models = mongoose.models ?? {};

export const Consultation: Model<IConsultation> =
  (models.Consultation as Model<IConsultation>) ||
  mongoose.model<IConsultation>('Consultation', ConsultationSchema);

export default Consultation;
export type { IConsultation, ISoldItem };
