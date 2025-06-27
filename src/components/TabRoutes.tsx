import TabSelector from "@/components/TabSelector";
import BlogApp from "@/pages/BlogApp";
import DataTableView from "@/pages/DataTableView";
import FormBuilderView from "@/pages/FormBuilderView";
import { tabs } from "@/utils";
import { Route, Routes, useLocation } from "react-router-dom";
const TabRoutes = () => {
  const location = useLocation();
  const currentTab =
    tabs.find((tab) => location.pathname.startsWith(tab.key))?.key ||
    "/data-table";

  return (
    <div className="main-container w-full">
      <div className="flex justify-between items-center mt-10 w-full">
        <TabSelector tabs={tabs} currentTab={currentTab} />
      </div>
      <Routes>
        <Route path="/data-table" element={<DataTableView />} />
        <Route path="/form-builder" element={<FormBuilderView />} />
        <Route path="/blog" element={<BlogApp />} />
        <Route path="/blog/new" element={<BlogApp />} />
        <Route path="/blog/:id" element={<BlogApp />} />
        <Route path="/blog/edit/:id" element={<BlogApp />} />
        <Route path="*" element={<DataTableView />} />
      </Routes>
    </div>
  );
};

export default TabRoutes;
