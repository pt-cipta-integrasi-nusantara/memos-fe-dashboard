import * as React from "react";
import { Router } from "./routes/sections";
import { BottomMenuBar, Navbar, SideMenuBar } from "./components";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

export default function App() {
  const location = useLocation();

  const asPath = location.pathname + location.search;
  const authorizedPage = ["/dashboard", "/workspace", "/profile"];
  const isLoggedIn =
    authorizedPage.some((page) => asPath.startsWith(page)) &&
    !asPath.includes("/subscription");
  const [isExpandedMenubar, setIsExpandedMenubar] = React.useState(true);
  return (
    <>
      <head>
        <meta
          name="google-site-verification"
          content="RMbsBIUpcLYYwPo4uGuQf1xftz_DMnhb87bv13cscGM"
        />
      </head>
      <section className="w-full mx-auto text-neutral-500">
        <Navbar setIsExpandedMenubar={setIsExpandedMenubar} />
        <div className="flex">
          {isLoggedIn && <SideMenuBar isExpandedMenubar={isExpandedMenubar} />}
          <div className="w-full lg:mt-0">
            <Router />
          </div>
          {isLoggedIn && <BottomMenuBar />}
        </div>
      </section>
      <Toaster position="top-right" />
    </>
  );
}
