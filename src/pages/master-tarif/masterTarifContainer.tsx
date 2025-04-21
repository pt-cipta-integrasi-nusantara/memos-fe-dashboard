import MasterTarifTabs from "./masterTarifTabs";
import { Outlet } from "react-router-dom";

const MasterTarifContainer = () => {
  return (
    <div className="w-full flex flex-col gap-y-3 mt-3">
      <MasterTarifTabs />
      <div className="border-b border-[#EAEDF1]" />
      <Outlet />
    </div>
  );
};

export default MasterTarifContainer;
