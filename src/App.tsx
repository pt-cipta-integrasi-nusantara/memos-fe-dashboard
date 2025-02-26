import * as React from "react";
import { Router } from "./routes/sections";
import { queryClient } from "./utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./utils/auth/providers";
import { Header, MenubarBottom, Sidebar } from "./components";
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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <head>
            <meta
              name="google-site-verification"
              content="RMbsBIUpcLYYwPo4uGuQf1xftz_DMnhb87bv13cscGM"
            />
          </head>
          <section className="w-full mx-auto text-neutral-500">
            <Header setIsExpandedMenubar={setIsExpandedMenubar} />
            <div className="flex">
              {isLoggedIn && <Sidebar isExpandedMenubar={isExpandedMenubar} />}
              <div className="w-full lg:mt-0">
                <Router />
              </div>
              {isLoggedIn && <MenubarBottom />}
            </div>
          </section>
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
