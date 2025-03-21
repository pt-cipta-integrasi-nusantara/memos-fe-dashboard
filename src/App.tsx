import * as React from "react";
import { Router } from "./routes/sections";
import { BottomMenuBar, Navbar, SideMenuBar } from "./components";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "./utils/auth/providers";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

export default function App() {
  const location = useLocation();
  const asPath = location.pathname + location.search;
  const { isAuth, logout } = useAuth();
  const [isExpandedMenubar, setIsExpandedMenubar] = React.useState(true);

  // Auto logout if idling for 10 minutes
  React.useEffect(() => {
    let logoutTimer = 0;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(async () => {
        await logout();
        toast.success("Anda telah keluar karena idle selama 10 menit");
      }, 600000); // 10 minutes (600000 ms)
    };

    // Listen to user interactions
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    if (isAuth) {
      resetTimer(); // Initialize the timer when component mounts
    }

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [isAuth]);
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
