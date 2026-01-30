const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    destination: { type: String, required: true, trim: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    description: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

tripSchema.index({ destination: 'text' });
tripSchema.index({ dateFrom: 1, dateTo: 1 });

module.exports = mongoose.model('Trip', tripSchema);
