import { useEffect, useState } from "react";
import axios from "axios";
import { GetListing } from "./GetListings";
import { useRecoilState } from "recoil";
import { favouriteState, userState} from "../../states/userState";
import { getFavourites } from "../../scripts/getFavourites";

export function BrowseShop(){

  const [user, setUser] = useRecoilState(userState); 
  const [favourites, setFavourites] = useRecoilState(favouriteState);
     const [responses, setResponses] = useState([]);
     const [page, setPage] = useState(1);

     useEffect(() => {
  async function loadFavourites() {
    const token = localStorage.getItem("token");

   
    if (!token || !user) return;

    if (user?.role !== "user") return;
    try {
      const favouriteIds = await getFavourites(token);
      setFavourites(favouriteIds);
    } catch (error) {
      console.error("Failed to load favourites:", error);
    }
  }

  loadFavourites();
}, [page]);
    
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/shop?page=${page}`);
        setResponses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchListings();
  }, [page]); 


    return(
        <div className='justify-center items-center'>
        
<div className="w-[100%] h-[90%] flex justify-center overflow-y-auto">
  <div className="w-[70%] pt-5">
    <div className="py-2 px-2 flex text-xl font-semibold   underline mb-3 bg-[#fcfcfc] w-fit border border-gray-300 rounded-sm">Browse Listings</div>
    <div
      className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 gap-1"
    >
      <GetListing responses={responses} />
    </div>
    <div className="flex justify-center mx-auto bg-[#fcfcfc] w-fit border rounded-xl py-1 mb-5 mt-3">
  <button className="cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline ml-2" onClick={() => setPage(page - 1)} 
  disabled={page === 1}>&lt; Prev</button>
  <div className="mx-4">Page {page}</div>
  <button className="mr-2 cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:no-underline" onClick={() => setPage(page + 1)} 
  disabled={responses.length<20}> Next &gt;</button>
</div>
  </div>
</div>



        </div>
    )
}