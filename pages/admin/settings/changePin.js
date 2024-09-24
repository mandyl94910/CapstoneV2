import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import EditCredentials from "../../../components/admin/settings/EditCredentials";

const ChangePin = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Header title="Change PIN" />
      <EditCredentials type="PIN" />
    </div>
  </div>
);

export default ChangePin;
