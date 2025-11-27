import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  questionId: number;
  text: string;
  specialty: 'weight' | 'dental' | 'stetic';
  version: 'short' | 'full';
  isMetric?: boolean;
}

const QuestionSchema: Schema<IQuestion> = new Schema({
  questionId: { type: Number, required: true },
  text: { type: String, required: true },
  specialty: { type: String, enum: ['weight', 'dental', 'stetic'], required: true },
  version: { type: String, enum: ['short', 'full'], required: true },
  isMetric: { type: Boolean, default: false },
});

export const Question =
  mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
