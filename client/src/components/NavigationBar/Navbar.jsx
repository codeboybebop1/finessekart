
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { favouriteState, userState } from "../../states/userState";
import Logo from "../../assets/Logo.png";

export function Navbar() {
   const [user, setUser] = useRecoilState(userState); // subscribes to updates
   const [favourites, setFavourites] = useRecoilState(favouriteState);
  const navigate = useNavigate();

  return (
    <div className='flex bg-[#fcfcfc] py-2 sticky top-0 z-50'>
      
      {user?.role === "seller" && <div className="h-fit my-auto p-2 border ml-8 rounded-lg hover:cursor-pointer shadow-[4px_4px_0px_0px_black] 
                hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                transition-all duration-150 hover:underline hover:decoration-1" onClick={() => { navigate("/ListPainting"); }}>List Painting </div>}
      
      <img className="h-8 my-auto mx-auto pl-22 justify-center hover:cursor-pointer" src={Logo} height="32px" alt="Logo" onClick={() => { navigate("/"); }} />
    
              <div title="View Favourites" className="mt-3 mr-4 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 hover:fill-red-400 " onClick={() => {
  if (user?.role === "user") {
    navigate("/Favourites");
  }
  else{
    window.alert("Login as User to access Favourites")
  }
}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              </div>
    
              <div className="m-2 mr-6">
                {user? (<> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 inline pl-1 hover:fill-gray-700 hover:cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg> <span title="Logout"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 inline pl-1 hover:fill-gray-700 hover:cursor-pointer" onClick={()=>{localStorage.removeItem("token");setUser(null);
setFavourites([]);}}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg> </span></> )
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 inline pl-1 hover:fill-gray-700 hover:cursor-pointer" onClick={()=>{navigate("/UserLogin")}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg> }
                
                <div className="text-2sm justify-center">{user?.fullName ? user.fullName.split(" ")[0] : "Guest"}</div>
              </div>
    
              
    
            </div>
  );
}