
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "./states/userState";
import { verifyToken } from "./scripts/verifyToken";
import { UserSignup } from './components/UserSignup/UserSignup';
import { UserLogin } from './components/UserSignup/UserLogin';
import { Carousel } from './components/Carousel/Carousel'
import { BrowseShop } from './components/BrowseShop/Shop';
import { SellerSignup } from './components/SellerSignup/SellerSignup';
import { SellerLogin } from './components/SellerSignup/SellerLogin';
import { Listpainting } from './components/ListPainting/Listpainting';
import { Favourites } from "./components/Favourites/Favourites";
import { Routes, Route, useNavigate } from "react-router-dom"


import Logo from './assets/Logo.png'
import { Navbar } from "./components/NavigationBar/Navbar";

function App() {

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token).then((data) => {
        if (data) {
          setUser({
            id: data.id,
            role: data.role,
            fullName: data.fullName,
          });
          
        } else {
          // Token invalid
          localStorage.removeItem("token");
          setUser(null); // Reset atom
        }
      });
    } else {
      setUser(null); // No token found
    }
  }, []);

  const navigate = useNavigate();
  // localStorage.removeItem("token");
  return (
    <>
      <div className='bgpattern overflow-x-hidden'>

        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Carousel></Carousel>}></Route>
          <Route path="/shop" element={<BrowseShop></BrowseShop>}></Route>
          <Route path="/SellerSignup" element={<SellerSignup> </SellerSignup>}></Route>
          <Route path="/SellerLogin" element={<SellerLogin> </SellerLogin>}></Route>
          <Route path="/ListPainting" element={<Listpainting></Listpainting>}></Route>
          <Route path="/UserSignup" element={<UserSignup></UserSignup>}></Route>
          <Route path="/UserLogin" element={<UserLogin></UserLogin>}></Route>
          <Route path="/Favourites" element={<Favourites></Favourites>}></Route>
        </Routes>

      </div>
    </>
  )
}

export default App
