import { Outlet, useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import { useEffect } from "react";

const FullLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in local storage
    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    if (!storedToken) {
      navigate('/auth/login');
    }
  })

  return (
    <div className="container-fluid p-0">

      <Navigation />
      <Outlet />
    </div>
  )
};

export default FullLayout;