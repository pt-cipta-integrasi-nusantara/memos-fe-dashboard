import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/classnamesHelper";
const tabList = [
  {
    label: "Tarif Tindakan",
    url: "tarif-tindakan",
  },
  {
    label: "Tarif Paket",
    url: "tarif-paket",
  },
  {
    label: "Tarif Obat",
    url: "tarif-obat",
  },
  {
    label: "Tarif Alkes",
    url: "tarif-alkes",
  },
];

const MasterTarifTabs = () => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);

  const isActiveTab = (url: string) => pathname?.includes(url);

  return (
    <div className="flex items-center gap-3 px-4">
      {tabList.map((tab, index) => (
        <Link
          to={tab.url}
          key={`nav-tab-${index}`}
          className={cn(
            "flex gap-2 rounded-xl py-2 px-2 items-center text-[14px] transition-all ease-in",
            {
              "bg-[#FEE7E7] text-primary-500 font-semibold ": isActiveTab(
                tab.url
              ),
            }
          )}
        >
          <span
            className={cn("px-[1px] font-normal", {
              "font-semibold ": isActiveTab(tab.url),
            })}
          >
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MasterTarifTabs;
