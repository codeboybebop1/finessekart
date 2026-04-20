import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { uploadAllImages } from "./uploadImages";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../states/userState";
import ValidateListing from "./ValidateListing";

export function Listpainting() {
  const navigate = useNavigate();
   const [user, setUser] = useRecoilState(userState);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedtags, setSelectedtags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
     fetch("/data/tags.json")
    .then((res) => res.json())
    .then((data) => setTags(data.Tag))
    .catch((err) => console.error("Error loading tags:", err));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setSelectedtags((prev) =>
      checked ? [...prev, value] : prev.filter((tag) => tag !== value)
    );
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);

  };

  const handleSubmit = async (e) => {
    if (isSubmitting) return;
    e.preventDefault();

    // Validate BEFORE uploading images
    const basicListingData = {
      title,
      price,
      width,
      height,
      date: new Date(),
      urls: files.map((file) => file.name), // temporary placeholder for validation
      selectedtags,
    };

    const validationResult = ValidateListing(basicListingData);
    if (validationResult !== true) {
      alert(validationResult);
      return;
    }

    try {
      setIsSubmitting(true);
      const urls = await uploadAllImages(files);

      const paintingData = {
        title,
        price,
        width,
        height,
        date: new Date(),
        urls,
        objectid: user?.id,
        selectedtags,
      };
      
     
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ListPainting`,
        paintingData
      );

      alert("Painting listed successfully!");
      navigate("/shop");
    } catch (error) {
  console.error("Listing error:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Error listing painting");
  } finally {
  setIsSubmitting(false);
  }
  };

  return (
    <div className="flex justify-center mt-10 overflow-x">
      <div className="bg-[#fcfcfc] h-[90%] w-4/5 md:h-2/3 rounded-xl font-serif font-[Georgia] text-wrap overflow-y-auto md:relative">
        <div className="bg-emerald-900 h-4 rounded-t-xl top-0"></div>
        <div className="mt-6 ml-8 text-2xl font-semibold underline">
          List Painting
        </div>

        <div className="m-5 pr-4 ml-8">
          <label htmlFor="Title">Painting Title:</label>
          <input
            id="Title"
            className="border rounded-md pl-1 w-3xs ml-5"
            type="text"
            placeholder="The Lost Tooth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="m-5 pr-4 ml-8">
          <label htmlFor="canvas">Canvas Dimensions (inches):</label>
          <input
            className="border rounded-md pl-1 ml-5 inline"
            type="number"
            placeholder="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <h3 className="inline ml-5">X</h3>
          <input
            className="inline border rounded-md pl-1 ml-5"
            type="number"
            placeholder="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="m-5 pr-4 ml-8">
          <label htmlFor="Price">Selling Price (INR):</label>
          <input
            id="Price"
            className="border rounded-md pl-1 ml-5"
            type="number"
            placeholder="20000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="m-5 pr-4 ml-8">
          <label>Select Suitable Tags:</label>
          <div className="flex flex-row">
            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <div key={tag} className="flex mr-4">
                  <input type="checkbox" value={tag} onChange={handleChange} />
                  <label className="pl-1">{tag}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="m-5 pr-4 ml-8">
          <label htmlFor="Image">Upload Painting Image(s):</label>
          <input
            id="Image"
            className="border rounded-md pl-1 w-3xs ml-5"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

         <div style={{ display: "flex", marginLeft: "24px", gap: "10px", marginTop: "20px" }}>
        {files.map((file, index) => {
          const previewUrl = URL.createObjectURL(file);
          return (
            <img
              key={index}
              src={previewUrl}
              alt={`preview-${index}`}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              onLoad={() => URL.revokeObjectURL(previewUrl)} // free memory
            />
          );
        })}
      </div>

        <div className="flex justify-end m-6 md:bottom-0 md:right-0">
          <button className="mr-4 text-emerald-900 border rounded-2xl p-2 " onClick={()=>{navigate("/shop")}}>
            Cancel Listing
          </button>
          <button
            disabled={isSubmitting}
            className="bg-emerald-900 text-emerald-50 border rounded-2xl p-2"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Uploading..." : "Upload Listing"}
          </button>
        </div>
      </div>
    </div>
  );
}