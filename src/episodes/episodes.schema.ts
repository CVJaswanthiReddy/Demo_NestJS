import { Schema, Document } from 'mongoose';
export const EpisodesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
});
export interface Epsiode extends Document {
  id: string;
  name: string;
  featured: boolean;
  publishedAt: Date;
}
