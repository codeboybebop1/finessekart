import axios from "axios";

export async function verifyToken(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/verifyToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // response contains decoded JWT info
    return response.data; // { id, role, fullName }
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null; // token invalid
  }
}