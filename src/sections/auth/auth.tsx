import { SignUpPage } from "../../routes/sections";
import { useAuth } from "../../utils/auth/providers";

export function withAuth(WrappedApp: React.ComponentType) {
  function AppWithAuth() {
    const { isAuth } = useAuth();

    return isAuth ? <WrappedApp /> : <SignUpPage />;
  }

  const displayName =
    WrappedApp.displayName || WrappedApp.name || "AppComponent";
  AppWithAuth.displayName = `withAuth(${displayName})`;

  return AppWithAuth;
}
