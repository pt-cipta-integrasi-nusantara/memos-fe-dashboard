import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

// ----------------------------------------------------------------------

// Authenticated Pages
export const SignInPage = lazy(() => import("../pages/login/index"));
export const SignUpPage = lazy(() => import("../pages/index"));

export const DashboardHomePage = lazy(() => import("../pages/dashboard/index"));

const renderFallback = (
  <div className="flex items-center justify-center h-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      style={{
        width: 100,
      }}
    >
      <circle
        fill="#45A03F"
        stroke="#45A03F"
        stroke-width="15"
        r="15"
        cx="40"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </circle>
      <circle
        fill="#45A03F"
        stroke="#45A03F"
        stroke-width="15"
        r="15"
        cx="100"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </circle>
      <circle
        fill="#45A03F"
        stroke="#45A03F"
        stroke-width="15"
        r="15"
        cx="160"
        cy="100"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
    </svg>
  </div>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <Suspense fallback={renderFallback}>
          <Outlet />
        </Suspense>
      ),
      children: [{ path: "dashboard", element: <DashboardHomePage /> }],
    },
    {
      path: "/",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <SignInPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
