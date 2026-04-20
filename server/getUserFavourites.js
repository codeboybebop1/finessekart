
const {User} = require('./db');

async function getUserFavourites(userId) {
  const user = await User.findById(userId).select("Favourites");

  if (!user) {
    throw new Error("User not found");
  }

  return user.Favourites || [];
}

module.exports = getUserFavourites;