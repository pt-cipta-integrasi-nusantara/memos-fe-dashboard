import { Outlet } from "react-router-dom";
import MasterItemTabs from "./masterItemTabs";

const MasterItemContainer = () => {
  return (
    <div className="w-full flex flex-col gap-y-3 mt-3">
      <MasterItemTabs />
      <div className="border-b border-[#EAEDF1]" />
      <Outlet />
    </div>
  );
};

export default MasterItemContainer;
