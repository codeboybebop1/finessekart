const { Painting, User} = require('./db');

async function toggleFavouriteInDB(userId, listingId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const painting = await Painting.findById(listingId);

  if (!painting) {
    throw new Error("Listing not found");
  }

  const alreadyFavourite = user.Favourites.some(
    (favId) => favId.toString() === listingId
  );

  if (alreadyFavourite) {
    user.Favourites = user.Favourites.filter(
      (favId) => favId.toString() !== listingId
    );

    await user.save();

    return {
      favourited: false,
      favourites: user.Favourites,
      message: "Removed from favourites",
    };
  } else {
    user.Favourites.push(listingId);

    await user.save();

    return {
      favourited: true,
      favourites: user.Favourites,
      message: "Added to favourites",
    };
  }
}

module.exports = toggleFavouriteInDB;