import { useState } from 'react';
import axios from 'axios';
import { userState } from "../../states/userState";
import {validate } from './validatesignupinput'
import { useNavigate } from 'react-router-dom';
import { verifyToken } from "../../scripts/verifyToken";
import { useRecoilState } from "recoil";

export function UserSignup() {
  const navigate = useNavigate();
     const [user, setUser] = useRecoilState(userState);
  const [FullName, setFullName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [passicon, setPassicon] = useState(true);

  const handleSubmit = async () => {
    const userData = {
  FullName,
  Username,
  Email,
  Password,
  PhoneNumber,
};

    const validationResult = validate(userData);
    if(validationResult==true){
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/UserSignup`, userData);
      console.log(response.data);
      // localStorage.setItem("token", response.data.token);
      alert("Account created successfully!");
      //redirect to shop
           
        const token = response.data.token;
        localStorage.setItem("token", token);
      
        // Verify token and update Recoil
        const data = await verifyToken(token);
    
      if (data) {
        setUser({
          id: data.id,
          role: data.role,
          fullName: data.fullName,
        });
      } else {
        // Token invalid for some reason (rare after login)
        // localStorage.removeItem("token");
        // setUser(null);
      }
        navigate(("/shop"))

    } catch (err) {
      console.error(err);
      alert("Error creating account");
    }
   }
   else alert(`${validationResult}`);
   
  };

  return (
    <div className='flex justify-center mt-20'>
      <div className="px-2 bg-[#f1f1f1] font-serif font-[Georgia] rounded-xl md:rounded-l-xl md:rounded-r-none opacity-90 text-wrap max-w-96 ">
        <h1 className="text-2xl font-semibold flex justify-center items-center m-3 underline mt-5 ">Sign Up</h1>

        <div className="m-5 pr-4">
          <label htmlFor="FullName"> Enter Full Name:</label>
          <input
            id="FullName"
            className="block border rounded-md pl-1 w-3xs"
            type="text"
            placeholder="John Doe"
            value={FullName}
            onChange={(e) => setFullName(e.target.value)}
          /><h6></h6>
        </div>

        <div className="m-5 pr-4">
          <label htmlFor="Username"> Enter Username:</label>
          <input
            id="Username"
            className="block border rounded-md pl-1 w-3xs"
            type="text"
            placeholder="JohnDoe123"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="m-5 pr-4">
          <label htmlFor="Email"> Enter Email ID:</label>
          <input
            id="Email"
            className="block border rounded-md pl-1 w-3xs"
            type="Email"
            placeholder="JohnDoe123@gmail.com"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="m-5 pr-4">
          <label htmlFor="Password"> Enter Password:</label>
          <div className="flex">
          <input
            id="Password"
            className="inline border rounded-md pl-1 w-3xs"
            type={passicon? "Password" : "text"}
            placeholder="********"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />

    <button
      type="button"
      onClick={() => setPassicon(!passicon)}
      className="px-2"
    >
      {passicon ? (
        // Eye OFF (hidden)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 3l18 18M10.584 10.587a3 3 0 0 0 4.243 4.243M9.88 4.24A9.77 9.77 0 0 1 12 4.5c4.638 0 8.573 3.007 9.963 7.178a1.012 1.012 0 0 1 0 .639 10.01 10.01 0 0 1-4.293 5.137M6.53 6.53A10.05 10.05 0 0 0 2.036 11.683a1.012 1.012 0 0 0 0 .639C3.423 16.49 7.36 19.5 12 19.5c1.61 0 3.13-.36 4.47-1.002" />
        </svg>
      ) : (
        // Eye ON (visible)
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      )}
    </button>
</div>
        </div>

        <div className="m-5 pr-4">
          <label className='block' htmlFor="Phone"> Enter Phone Number:</label>
          <div className="inline px-1 w-3xs">+91</div>
          <input
            type="text"
            id="Phone"
            className="inline pb-1 border rounded-md pl-1 w-3xs"
            name="Phone"
            pattern="[0-9]{10}"
            placeholder="8888888888"
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center mt-6 mx-15 bg-[#356141] opacity-100 rounded-xl text-white font-semibold" onClick={handleSubmit}>
          <button >Create Account</button>
        </div>
        <div className='ml-4 my-4'>Already have an account? <span className='underline text-blue hover:cursor-pointer' onClick={()=>{navigate("/UserLogin")}}>Login</span></div>
         {/* redirect to login page */}
      </div>
    </div>
  );
}