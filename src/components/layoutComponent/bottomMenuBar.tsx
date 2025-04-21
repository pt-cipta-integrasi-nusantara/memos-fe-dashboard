import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, ProfileIcon, WorkIcon } from "../iconsComponent";

function Navmenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const asPath = location.pathname + location.search;
  const menus = [
    {
      path: "/home",
      label: "Home",
      icon: (
        <HomeIcon
          className={`mt-4 w-[20px] h-[20px] ${
            asPath === "/" ? "text-primary-500" : ""
          }`}
        />
      ),
    },

    {
      path: "/workspace",
      label: "Workspace",
      icon: (
        <WorkIcon
          className={`mt-4 w-[20px] h-[20px] ${
            asPath.includes("/workspace") ? "text-primary-500" : ""
          }`}
        />
      ),
    },

    // {
    //   path: "/social",
    //   label: "Social",
    //   icon: (
    //     <SocialIcon
    //       className={`mt-4 w-[20px] h-[20px] ${
    //         asPath.includes("/social") ? "text-primary-500" : ""
    //       }`}
    //     />
    //   ),
    // },

    {
      path: "/profile",
      label: "Profile",
      icon: (
        <ProfileIcon
          className={`mt-4 w-[20px] h-[20px] ${
            asPath.includes("/profile") ? "text-primary-500" : ""
          }`}
        />
      ),
    },
  ];

  const handleRoute = (path: string) => {
    if (path === "/home") {
      navigate("/");
    } else {
      navigate(`${path}`);
    }
  };
  console.log(location, "location");
  return (
    <nav className="bg-white w-full border-t border-neutral-250">
      <ul className="flex justify-center px-16 gap-8">
        {menus
          ?.filter((item) =>
            asPath?.includes("workspace")
              ? item
              : !item?.path?.includes("workspace")
          )
          .map((menu) => (
            <li
              onClick={() => handleRoute(menu?.path)}
              className={`${
                (asPath === "/" && menu.path === "/home") ||
                asPath.includes(menu.path)
                  ? "bg-gradient-to-b from-[#FFEFEF] via-white to-white via-50%"
                  : ""
              }  pb-4 flex items-center cursor-pointer`}
            >
              <div className="flex flex-col items-center gap-3 relative">
                {(asPath === "/" && menu.path === "/home") ||
                asPath.includes(menu.path) ? (
                  <div className="absolute top-0 w-[72px] h-[4px]">
                    <img
                      src="/assets/icons/bottom-menu.svg"
                      width={72}
                      height={4}
                      alt="bottom-menu"
                    />
                  </div>
                ) : null}

                {menu?.icon}
                <span
                  className={`${
                    (asPath === "/" && menu.path === "/home") ||
                    asPath.includes(menu.path)
                      ? "font-bold text-primary-500"
                      : ""
                  }`}
                >
                  {menu?.label}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export function BottomMenuBar() {
  return (
    <div className="block lg:hidden fixed bottom-0 w-full max-w-full flex overflow-hidden">
      <Navmenu />
    </div>
  );
}
