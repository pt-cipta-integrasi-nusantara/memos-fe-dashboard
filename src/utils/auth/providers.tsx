import * as React from "react";
import { createContext } from "../create.context";
import * as sessionService from "../../utils/session";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth/login";
import toast from "react-hot-toast";

interface AuthContextValue {
  isAuth: boolean;
  logout: () => Promise<void>;
  login: (formField: LoginCredentialsDTO) => Promise<void>;
}

const [useAuth, AuthInternalProvider] = createContext<AuthContextValue>({
  name: "Auth",
});

export { useAuth };

interface LoginCredentialsDTO {
  email: string;
  password: string;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = React.useState<string | null>(
    () => sessionService.getSession() ?? ""
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  async function login(formField: LoginCredentialsDTO) {
    const { data } = await loginUser(formField);
    const { token, account } = data;
    if (account?.is_approved === false) {
      toast.error("Harap menunggu hingga akun terkonfirmasi oleh PT CIN");
    } else {
      sessionService.setSession(token);
      setAccessToken(token);
      setIsLoggedIn(true);
      navigate("/");
    }
  }

  async function logout() {
    sessionService.flushSession();
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }

  // React.useEffect(() => {
  //   if (!accessToken) {
  //     logout();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [accessToken]);

  return (
    <AuthInternalProvider
      value={{
        isAuth: !!accessToken && !!isLoggedIn,
        login,
        logout,
      }}
    >
      {props?.children}
    </AuthInternalProvider>
  );
}
