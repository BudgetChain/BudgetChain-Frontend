import Sidebar from "../components/sideBar";
import AdminHomePage from "../components/admin/adminHomePage";
import NavBar from "../components/navBar";
function AdminDashboard(){
    return(
       <div className="md:flex md:justify-between">
         <Sidebar/>
       <div>
      <NavBar/>
      <div className="">
        <AdminHomePage/>
      </div>
       </div>
       </div>
    )
}



export default AdminDashboard;