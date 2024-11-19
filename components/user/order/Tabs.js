import { useRouter } from "next/router";

/**
 * Helped by chatGPT
 * Create tabs that can show different styles according to its active status
 * For each tab, it will check if it is active to decide which styles is for it
 * Also, it will set new active tab and pass that value to the parent's component when being clicked
 */
const Tabs = ({ activeTab, setActiveTab }) => {
  const router = useRouter();
  const { customerId } = router.query;

  const tabs = [
    { key: "allOrders", label: "All Orders" },
    { key: "pending", label: "Pending" },
    { key: "shipped", label: "Shipped" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex border-b border-gray-300 ml-10 min-w-[700px] max-w-[1000px]">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`relative px-4 py-2 cursor-pointer ${
            activeTab === tab.key
              ? "text-blue-500 font-bold border-blue-500 border-b-2"
              : "text-black hover:text-blue-500 border-b-gray-600"
          }`}
          onClick={() => {
            setActiveTab(tab.key);
            router.push({
              pathname: `/user-profile/order/${customerId}`,
              query: { tab: tab.key }, // 更新 URL 参数
            });
          }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
