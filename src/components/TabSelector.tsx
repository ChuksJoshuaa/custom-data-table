import type { TabSelectorProps } from "@/interface";
import { useNavigate } from "react-router-dom";

const TabSelector = ({ tabs, currentTab }: TabSelectorProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-4 border-b mb-6 tw-mt-10 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
            currentTab === tab.key
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => navigate(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
