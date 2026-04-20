import { useState } from "react";
import { useRecoilState } from "recoil";
import { favouriteState, userState } from "../../states/userState";
import { handleFavouriteToggle } from "./handlefavourite";
import { PaintingDetail } from "../PaintingDetail/PaintingDetail";

export function GetListing({ responses }) {
   const [user, setUser] = useRecoilState(userState); 
  const [selectedListing, setSelectedListing] = useState(null);
  const [favourites, setFavourites] = useRecoilState(favouriteState);


  const openOverlay = (listing) => setSelectedListing(listing);
  const closeOverlay = () => setSelectedListing(null);

  return (
    <>
      {/* Listings */}
      {responses?.map((listing, index) => (
        <div
          key={index}
          className="break-inside-avoid p-3 bg-[#fcfcfc] my-1 border border-gray-300 hover:shadow-xl cursor-pointer"
          onClick={() => openOverlay(listing)}
        >
          <div className="flex justify-center pb-4">
            <img
              src={listing.ImageURL?.[0]?.replace(
                "/upload/",
                "/upload/f_auto,q_auto,w_300/"
              )}
              alt={listing.Title}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          <div className="ml-2">
            <div className="text-xl font-semibold underline">{listing.Title}</div>
            <div className="text-md">By {listing.Artist?.FullName}</div>
            <div className="text-md font-medium">
              Canvas: {listing.Width} x {listing.Height}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {listing.Tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-gray-100 border rounded-full hover:bg-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-2xl font-semibold ml-2 mt-4 mb-3 flex-wrap">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(listing.Price)}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={favourites?.includes(listing._id) ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 hover:fill-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavouriteToggle(listing, favourites, setFavourites, user);
                }}

              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}

      {/* Overlay */}
      {selectedListing && (
        <PaintingDetail selectedListing={selectedListing} setSelectedListing={setSelectedListing} openOverlay={openOverlay} closeOverlay={closeOverlay}></PaintingDetail>
      )}
    </>
  );
}