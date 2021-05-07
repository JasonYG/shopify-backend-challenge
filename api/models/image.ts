import mongoose, { Schema, Document } from 'mongoose';

// TypeScript Interface
export interface ImageType extends Document {
  s3Url: string;
  name: string;
  price: string;
  username: string;
  status: string;
}

const ImageSchema = new Schema({
  s3Url: {
    type: String,
    required: true,
  },
  name: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  username: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Image = mongoose.model<ImageType>('Image', ImageSchema);
export default Image;