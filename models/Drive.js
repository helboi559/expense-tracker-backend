import mongoose from "mongoose";



const driveSchema = mongoose.Schema(
  {
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    tolls: { type: Number, min: 0, default: 0 },
    parking: { type: Number, min: 0, default: 0 },
    mileage: { type: Number, min: 0, default: 0 },
    reimbursement: { type: Number, min: 0, default: 0 },
    total: { type: Number, min: 0, default: 0 },
    date:{type:Date, },
    uid: { type: String, required: true },
    uName: { type: String, required: true },
    uPhoto: { type: String, default: '' },
    // tripId: { type: String, required: true },
  }
);

const Drive = mongoose.model('drives',driveSchema)

export default Drive