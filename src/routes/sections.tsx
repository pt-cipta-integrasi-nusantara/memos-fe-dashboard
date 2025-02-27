import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import { Loader } from "../components";
import { useAuth } from "../utils/auth/providers";

// ----------------------------------------------------------------------

// Unauthenticated Pages
export const SignInPage = lazy(() => import("../pages/login/index"));
export const SignUpPage = lazy(() => import("../pages/index"));
export const SignUpStepOnePage = lazy(
  () => import("../pages/registration/step/1")
);
export const SignUpStepTwoPage = lazy(
  () => import("../pages/registration/step/2")
);
export const SignUpStepThreePage = lazy(
  () => import("../pages/registration/step/3")
);
export const SignUpSummaryPage = lazy(
  () => import("../pages/registration/summary")
);
export const SignUpSummaryFinishPage = lazy(
  () => import("../pages/registration/summary/finish")
);

// Authenticated Pages
export const DashboardHomePage = lazy(() => import("../pages/dashboard/index"));
export const DashboardSubscriptionPage = lazy(
  () => import("../pages/dashboard/subscription/index")
);
export const DashboardSubscriptionPaymentPage = lazy(
  () => import("../pages/dashboard/subscription/payment")
);

export const DashboardSubscriptionPaymentSuccessPage = lazy(
  () => import("../pages/dashboard/subscription/payment/success")
);
export const DashboardSubscriptionPaymentFailedPage = lazy(
  () => import("../pages/dashboard/subscription/payment/failed")
);
export const DashboardSubscriptionPaymentInProgressPage = lazy(
  () => import("../pages/dashboard/subscription/payment/in-progress")
);

const renderFallback = (
  <div className="flex items-center justify-center h-full">
    <Loader />
  </div>
);

export function Router() {
  const { isAuth } = useAuth();

  const authenticatedRoutes = useRoutes([
    {
      element: (
        <Suspense fallback={renderFallback}>
          <Outlet />
        </Suspense>
      ),
      children: [
        { path: "/dashboard", element: <DashboardHomePage /> },
        {
          path: "dashboard/subscription",
          element: <DashboardSubscriptionPage />,
        },
        {
          path: "dashboard/subscription/payment",
          element: <DashboardSubscriptionPaymentPage />,
        },
        {
          path: "dashboard/subscription/payment/success",
          element: <DashboardSubscriptionPaymentSuccessPage />,
        },
        {
          path: "dashboard/subscription/payment/failed",
          element: <DashboardSubscriptionPaymentFailedPage />,
        },
        {
          path: "dashboard/subscription/payment/pending",
          element: <DashboardSubscriptionPaymentInProgressPage />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ]);

  const unAuthenticatedRoutes = useRoutes([
    {
      path: "/",
      element: <SignUpPage />,
    },
    {
      path: "/registration/step/1",
      element: <SignUpStepOnePage />,
    },
    {
      path: "/registration/step/2",
      element: <SignUpStepTwoPage />,
    },
    {
      path: "/registration/step/3",
      element: <SignUpStepThreePage />,
    },
    {
      path: "/registration/summary",
      element: <SignUpSummaryPage />,
    },
    {
      path: "/registration/summary/finish",
      element: <SignUpSummaryFinishPage />,
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

  return isAuth ? authenticatedRoutes : unAuthenticatedRoutes;
}
