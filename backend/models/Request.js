import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    skill: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Request = model('Request', requestSchema);

export default Request;