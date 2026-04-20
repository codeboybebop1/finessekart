


export async function handleFavouriteToggle(listing, favourites, setFavourites, user) {
  const token = localStorage.getItem("token");

  if (!token || !user) {
    alert("Login first to mark favourites");
    return;
  }

  if (user.role == "seller") {
    alert("Favourites are currently a user-only feature");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/toggleFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        listingId: listing._id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    setFavourites(data.favourites);
  } catch (error) {
    console.error("Favourite toggle error:", error);
    alert("Server error while updating favourites");
  }
}