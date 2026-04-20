export const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "finessekart");

  const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};

export const uploadAllImages = async (files) => {
  return await Promise.all(files.map((file) => handleUpload(file)));
};