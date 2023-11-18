import React from 'react'
import "./Cms.css"
import { useNavigate } from 'react-router-dom';
import Auth from '../cmsComponents/Auth';
import { auth } from '../firebase/firebase';
import { useStateContext } from '../context/context';
import { signOut } from 'firebase/auth';

const Cms = () => {

  const navigate = useNavigate()

  const {user, setUser} = useStateContext()

  const logout = async () => {
    await signOut(auth);
    setUser(false);
    navigate("/")
  }

  if (!user){
    return (
      <Auth/>
    )
  } else{
    return (
      <div className='cms'>
        <div className="cmsContainer">
          <div className="cmsTitle">Content Manager</div>
          <div className="cmsLink signout" onClick={() =>{logout()}}>Sign Out</div>
          <div className="cmsLink" onClick={() => navigate("/cms/allclothes")}>All Clothes</div>
          <div className="cmsLink" onClick={() => navigate("/cms/brandMsg")}>Brand Message</div>
          <div className="cmsLink" onClick={() => navigate("/cms/squad")}>Squad/Testimonials</div>
          <div className="cmsLink" onClick={() => navigate("/cms/gallery")}>Gallery</div>
          <div className="cmsLink" onClick={() => navigate("/cms/contact")}>Contact Info</div>
          <div className="cmsLink" onClick={() => navigate("/cms/shipping")}>Shipping Fees</div>
          <div className="cmsLink" onClick={() => navigate("/cms/policies")}>Return Policies</div>
          <div className="cmsLink" onClick={() => navigate("/")}>Back to Website</div>
        </div>
        
      </div>
    )
}
}

export default Cms