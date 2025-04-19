import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Main(){
    return (
<>

<Header />
<div className="maincontent">< Outlet/></div>
<Footer/>
</>
    );
}



export default Main;