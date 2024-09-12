import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

export default function Settings() {
    return(
        <div className="flex">
           <Sidebar /> 
           <div className="flex-1 p-6 bg-gray-100">
           <Header />
           </div>
        </div>
    )
}