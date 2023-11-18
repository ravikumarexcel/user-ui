import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
      <div className="container-fluid p-0">
          <Outlet />
      </div>
    )
  };
  
  export default LoginLayout;