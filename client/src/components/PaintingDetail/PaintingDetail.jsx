import React from "react";
import { useRecoilState } from "recoil";
import { favouriteState, userState } from "../../states/userState";
import { handleFavouriteToggle } from "../BrowseShop/handlefavourite";
import { ContactSeller } from "./ContactSeller";
import ImageCarousel from "./ImageCarousel";

export function PaintingDetail({ selectedListing, closeOverlay }) {
  const [user, setUser] = useRecoilState(userState); 
  const [favourites, setFavourites] = useRecoilState(favouriteState);
  if (!selectedListing) return null;

  return (
    <div
      className="fixed inset-0 opacity-100 flex justify-center items-center z-50"
      onClick={closeOverlay} // Clicking outside closes overlay
    >
      <div
        className="bg-white p-5 rounded max-w-2xl w-full relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={closeOverlay}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">{selectedListing.Title}</h2>
        {/* <img
          src={selectedListing.ImageURL?.[0]}
          alt={selectedListing.Title}
          className="w-full h-auto object-contain mb-4"
        /> */}
        <ImageCarousel selectedListing={selectedListing}></ImageCarousel>
        <div className="grid grid-cols-3">
        <div className="col-span-2">
        <p>By: {selectedListing.Artist?.FullName}</p>
        <p>
          Canvas: {selectedListing.Width} x {selectedListing.Height}
        </p>
        <p className="text-lg font-semibold">
          Price:{" "}
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(selectedListing.Price)}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedListing.Tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-gray-100 border rounded-full hover:bg-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
        </div>
        <div className="absolute bottom-4 right-4 flex space-x-4 mb-4 ">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={favourites?.includes(selectedListing._id) ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10 hover:fill-red-400"
                onClick={() => { handleFavouriteToggle(selectedListing, favourites, setFavourites, user);}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 hover:fill-green-500 mx-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
  onClick={() => {
  if (user?.role === "user") {
    ContactSeller(user,selectedListing);
  }
  else{
    window.alert("Login as User to contact seller")
  }
}} />
</svg>
        </div>
        </div>
      </div>
    </div>
  );
}