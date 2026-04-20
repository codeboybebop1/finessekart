require('dns').setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');


// Schemas
const SellerSchema = new mongoose.Schema({
    FullName: String,
    Email: String,
    Username: String,
    Password: String,
    PhoneNumber: Number,
});

const UserSchema = new mongoose.Schema({
  FullName: String,
  Email: String,
  Username: String,
  Password: String,
  PhoneNumber: String,
  Favourites: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Painting",
      },
    ],
    default: [],
  },
});
const PaintingSchema = new mongoose.Schema({
    Title: String,
    Width: Number,
    Height: Number,
    Price: Number,
    PostingTime: Date,
    ImageURL: [String],
    Artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    Tags: [String]
});

// Models
const Seller = mongoose.model('Seller', SellerSchema, 'Sellers');
const Painting = mongoose.model('Painting', PaintingSchema,'Paintings');
const User = mongoose.model('User',UserSchema,'Users');

module.exports = {
    Seller,
    Painting,
    User
};