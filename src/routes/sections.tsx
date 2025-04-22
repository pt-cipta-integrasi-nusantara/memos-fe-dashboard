import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import { Loader } from "../components";
import { useAuth } from "../utils/auth/providers";

// ----------------------------------------------------------------------

// Unauthenticated Pages
export const SignInPage = lazy(() => import("../pages/login/index"));
export const SignUpPage = lazy(() => import("../pages/index"));
export const ForgotPasswordPage = lazy(
  () => import("../pages/forgot-password/index")
);
export const ResetPasswordPage = lazy(
  () => import("../pages/reset-password/index")
);
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

export const DashboardSubscriptionPaymentDetailPage = lazy(
  () => import("../pages/dashboard/subscription/payment/detail")
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

export const DashboardSubscriptionPaymentStatusPage = lazy(
  () => import("../pages/dashboard/subscription/payment/status")
);

export const WorkspacePage = lazy(() => import("../pages/workspace/[slug]"));

export const ProfilePage = lazy(() => import("../pages/profile"));

export const MasterItemPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.MasterItemContainer,
  }))
);

export const MasterTarifPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.MasterTarifContainer,
  }))
);

export const ItemObatListPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({ default: mod.ItemObatList }))
);

export const ItemObatFormPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemObatForm,
  }))
);
export const ItemObatDetailPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemObatDetail,
  }))
);
export const ItemObatDetailPriceListPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemObatDetailPriceList,
  }))
);
export const ItemObatDetailLokasiPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemObatDetailLokasi,
  }))
);
export const ItemObatDetailPemasokPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemObatDetailPemasok,
  }))
);
export const ItemObatDetailSatuanKonversiPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemObatDetailSatuanKonversi,
  }))
);

export const ItemPelayananListPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemPelayananList,
  }))
);

export const ItemAlatKesehatanListPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemAlatKesehatanList,
  }))
);
export const ItemAlatKesehatanFormPage = lazy(() =>
  import("../pages/master-item").then((mod) => ({
    default: mod.ItemAlatKesehatanForm,
  }))
);

export const TarifTindakanListPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifTindakanList,
  }))
);

export const TarifPaketListPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifPaketList,
  }))
);

export const TarifObatListPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifObatList,
  }))
);

export const TarifAlkesListPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifAlkesList,
  }))
);

export const TarifTindakanFormPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifTindakanForm,
  }))
);

export const TarifPaketFormPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifPaketForm,
  }))
);
export const TarifPaketDetailPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifPaketDetail,
  }))
);

export const TarifObatFormPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifObatForm,
  }))
);

export const TarifAlkesFormPage = lazy(() =>
  import("../pages/master-tarif").then((mod) => ({
    default: mod.TarifAlkesForm,
  }))
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
        { path: "/", element: <DashboardHomePage />, index: true },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/master-item",
          element: <MasterItemPage />,
          children: [
            {
              index: true,
              element: <ItemPelayananListPage />,
            },
            {
              path: "item-pelayanan",
              element: <ItemPelayananListPage />,
            },

            {
              path: "item-obat",
              element: <ItemObatListPage />,
            },
            {
              path: "item-obat/create",
              element: <ItemObatFormPage />,
            },
            {
              path: "item-obat/:id",
              element: <ItemObatDetailPage />,
              children: [
                {
                  index: true,
                  element: <ItemObatDetailLokasiPage />,
                },
                {
                  path: "lokasi",
                  element: <ItemObatDetailLokasiPage />,
                },
                {
                  path: "pemasok",
                  element: <ItemObatDetailPemasokPage />,
                },
                {
                  path: "satuan-konversi",
                  element: <ItemObatDetailSatuanKonversiPage />,
                },
                {
                  path: "pricelist",
                  element: <ItemObatDetailPriceListPage />,
                },
              ],
            },

            {
              path: "item-obat/:id/edit",
              element: <ItemObatFormPage />,
            },
            {
              path: "item-alat-kesehatan",
              element: <ItemAlatKesehatanListPage />,
            },
            {
              path: "item-alat-kesehatan/create",
              element: <ItemAlatKesehatanFormPage />,
            },
            {
              path: "item-alat-kesehatan/:id",
              element: <ItemAlatKesehatanFormPage />,
            },
          ],
        },
        {
          path: "/master-tarif",
          element: <MasterTarifPage />,
          children: [
            {
              index: true,
              element: <TarifTindakanListPage />,
            },
            {
              path: "tarif-tindakan",
              element: <TarifTindakanListPage />,
            },
            {
              path: "tarif-tindakan/create",
              element: <TarifTindakanFormPage />,
            },
            {
              path: "tarif-tindakan/:id",
              element: <TarifTindakanFormPage />,
            },

            {
              path: "tarif-paket",
              element: <TarifPaketListPage />,
            },
            {
              path: "tarif-paket/create",
              element: <TarifPaketFormPage />,
            },
            {
              path: "tarif-paket/:id",
              element: <TarifPaketDetailPage />,
            },
            {
              path: "tarif-paket/:id/edit",
              element: <TarifPaketFormPage />,
            },

            {
              path: "tarif-obat",
              element: <TarifObatListPage />,
            },
            {
              path: "tarif-obat/:id/edit",
              element: <TarifObatFormPage />,
            },

            {
              path: "tarif-alkes",
              element: <TarifAlkesListPage />,
            },
            {
              path: "tarif-alkes/:id/edit",
              element: <TarifAlkesFormPage />,
            },
          ],
        },
        {
          path: "/subscription",
          element: <DashboardSubscriptionPage />,
        },
        {
          path: "/subscription/payment",
          element: <DashboardSubscriptionPaymentPage />,
        },
        {
          path: "/subscription/payment/status/success",
          element: <DashboardSubscriptionPaymentSuccessPage />,
        },
        {
          path: "/subscription/payment/status/failed",
          element: <DashboardSubscriptionPaymentFailedPage />,
        },
        {
          path: "/subscription/payment/status/pending",
          element: <DashboardSubscriptionPaymentInProgressPage />,
        },
        {
          path: "/subscription/payment/status/:paymentId",
          element: <DashboardSubscriptionPaymentStatusPage />,
        },

        {
          path: "/subscription/payment/:subscriptionId",
          element: <DashboardSubscriptionPaymentDetailPage />,
        },

        {
          path: "/workspace/:workspaceId",
          element: <WorkspacePage />,
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
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/reset-password",
      element: <ResetPasswordPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return isAuth ? authenticatedRoutes : unAuthenticatedRoutes;
}
