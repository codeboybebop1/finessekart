export async function getFavourites(token) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getFavourites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch favourites");
  }

  return data.favourites;
}