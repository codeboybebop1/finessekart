
export async function getFavouritePaintings(token) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getFavouritePaintings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch favourite paintings");
  }

  return data.paintings;
}