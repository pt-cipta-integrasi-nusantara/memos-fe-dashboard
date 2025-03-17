import * as React from "react";
import { Router } from "./routes/sections";
import { BottomMenuBar, Navbar, SideMenuBar } from "./components";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./utils/auth/providers";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

export default function App() {
  const location = useLocation();
  const asPath = location.pathname + location.search;
  const { isAuth } = useAuth();
  const [isExpandedMenubar, setIsExpandedMenubar] = React.useState(true);
  return (
    <>
      <head>
        <meta
          name="google-site-verification"
          content="RMbsBIUpcLYYwPo4uGuQf1xftz_DMnhb87bv13cscGM"
        />
      </head>
      <section
        className={`w-full mx-auto text-neutral-500 ${
          !isAuth ? "dual-bg" : ""
        }`}
      >
        <Navbar setIsExpandedMenubar={setIsExpandedMenubar} />
        <div className="flex">
          {isAuth && !asPath.includes("/subscription") && (
            <SideMenuBar isExpandedMenubar={isExpandedMenubar} />
          )}
          <div className="w-full lg:mt-0">
            <Router />
          </div>
          {isAuth && <BottomMenuBar />}
        </div>
      </section>
      <Toaster position="top-right" />
    </>
  );
}
