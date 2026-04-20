// If no jwt is found, ask user to sign in first

import { useEffect, useState } from "react";
import axios from "axios";
import { GetListing } from "../BrowseShop/GetListings";
import { useRecoilState } from "recoil";
import { favouriteState, userState} from "../../states/userState";
import { getFavouritePaintings } from "./GetFavouritePaintings";



export function Favourites(){

const [user, setUser] = useRecoilState(userState); 
const [favourites, setFavourites] = useRecoilState(favouriteState);
const [responses, setResponses] = useState([]);

useEffect(() => {
  async function loadFavouritePaintings() {
    const token = localStorage.getItem("token");

    if (!token) return;
    if (user?.role !== "user") return;

    try {
      const paintings = await getFavouritePaintings(token);
      setResponses(paintings);
    } catch (error) {
      console.error("Failed to load favourite paintings:", error);
    }
  }

  loadFavouritePaintings();
}, [user, favourites]);

    return(
        <div className='justify-center items-center'>
        
<div className="w-[100%] h-[90%] flex justify-center overflow-y-auto">
  <div className="w-[70%] pt-5">
    <div className="py-2 px-2 flex text-xl font-semibold   underline mb-3 bg-[#fcfcfc] w-fit border border-gray-300 rounded-sm">Favourites</div>
    <div
      className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-1"
    >
      <GetListing responses={responses} />
    </div>
    
  </div>
</div>



        </div>
    )
}