import { LOGO_URL } from "../utils/constants";
import { useState ,useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import userContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header=()=>{
  useEffect(()=>{
    console.log("header useeffect");
  })
    const cartItems=useSelector((store)=>store.cart.items)
    
  const [loginStatus,setLoginStatus]=useState(false);

  const data=useContext(userContext);
   const {loggedInUser}=data;

const handleChange=()=>{
    if(!loginStatus)
    {
      setLoginStatus(true)
    }

    else
    {
      setLoginStatus(false); 
    }
  }
  
    return (
        <div className='header'>
         <div className='logo-container'>
           <img className='logo' src={LOGO_URL}/>
         </div>
         <div className='nav-items'>
          <ul>
            <li>
              <Link to="/">home</Link>
              </li>
            <li>
              <Link to="/about">About Us</Link>
              </li>
            <li>
              <Link to="/contact">Contact</Link> 
              </li>
            <li>
              <Link to="/cart">Cart ({cartItems.length})</Link>
            </li>
            <button onClick={handleChange} className="login">{(loginStatus===false)?"login":"logout"}</button>

            <li>{loggedInUser}</li>
          </ul>
         </div>
      </div>
  
)
  }
  export default Header ;