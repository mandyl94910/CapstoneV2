import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import EditCredentials from "../../../components/admin/settings/EditCredentials";

const ChangePassword = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Header title="Change Password" />
      <EditCredentials type="Password" />{" "}
    </div>
  </div>
);

export default ChangePassword;
