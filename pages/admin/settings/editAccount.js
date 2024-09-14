import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import EditAccount from "../../../components/admin/settings/EditAccount";
const EditAccountPage = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Header title="Edit Account Detail" />
      <EditAccount />
    </div>
  </div>
);

export default EditAccountPage;
