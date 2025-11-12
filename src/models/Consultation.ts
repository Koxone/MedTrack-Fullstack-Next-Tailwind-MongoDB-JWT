import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';
import { IProduct } from './Product';
import { ITransaction } from './Transaction';

/* --- Interface --- */
interface IConsultation extends Document {
  patient: mongoose.Types.ObjectId | IUser;
  employee: mongoose.Types.ObjectId | IUser;
  date: Date;
  time: string;
  consultationType: string;
  cost: number;
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia';
  itemsSold?: mongoose.Types.ObjectId[] | IProduct[];
  transaction?: mongoose.Types.ObjectId | ITransaction | null;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
    itemsSold: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    transaction: { type: Schema.Types.ObjectId, ref: 'Transaction', default: null },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};

export const Consultation: Model<IConsultation> =
  (models.Consultation as Model<IConsultation>) ||
  mongoose.model<IConsultation>('Consultation', ConsultationSchema);

export default Consultation;
export type { IConsultation };
