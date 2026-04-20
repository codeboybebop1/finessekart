
const {User,Painting} = require('./db');

async function getFavouritePaintingsFromDB(userId) {
  const user = await User.findById(userId).select("Favourites");

  if (!user) {
    throw new Error("User not found");
  }

  const favourites = user.Favourites || [];

  const paintings = await Painting.find({
    _id: { $in: favourites },
  }).populate("Artist", "FullName");

  // preserve favourites order
  const orderedPaintings = favourites
    .map((id) =>
      paintings.find((painting) => painting._id.toString() === id.toString())
    )
    .filter(Boolean);

  return orderedPaintings;
}

module.exports = getFavouritePaintingsFromDB;