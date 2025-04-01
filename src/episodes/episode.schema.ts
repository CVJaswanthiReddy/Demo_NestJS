import { Schema, Document } from 'mongoose';
export const EpisodeSchema = new Schema({
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
export interface Episode extends Document {
  id: string;
  name: string;
  featured: boolean;
  publishedAt: Date;
}
