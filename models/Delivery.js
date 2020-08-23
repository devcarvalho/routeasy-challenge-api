const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
    district: {
      type: String,
      required: true,
    },
    adjunct: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    geolocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
  },
});

module.exports = Delivery = mongoose.model("deliveries", deliverySchema);
