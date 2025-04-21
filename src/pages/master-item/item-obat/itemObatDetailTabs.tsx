import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/classnamesHelper";
const tabList = [
  {
    label: "Lokasi",
    url: "lokasi",
  },
  {
    label: "Pemasok",
    url: "pemasok",
  },
  {
    label: "Satuan Konversi",
    url: "satuan-konversi",
  },
  {
    label: "Pricelist",
    url: "pricelist",
  },
];

const ItemObatDetailTabs = () => {
  const { pathname } = useLocation();
  const isActiveTab = (url: string) => pathname?.includes(url);

  return (
    <div className="flex items-center gap-3 px-4 border-b border-[#F3F5F7]">
      {tabList.map((tab, index) => (
        <Link
          to={tab.url}
          key={`nav-tab-${index}`}
          className={cn(
            "flex gap-2  py-4 px-3 items-center text-[14px] transition-all ease-in",
            {
              "text-primary-500 font-bold  border-b-2 border-primary-500":
                isActiveTab(tab.url),
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

export default ItemObatDetailTabs;
