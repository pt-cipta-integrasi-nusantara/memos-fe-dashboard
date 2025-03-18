import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { LogoutIcon, ProfileIcon } from "../iconsComponent";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../uiComponent";
import { useAuth } from "../../utils/auth/providers";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../services/auth/types";
import { useMe } from "../../services/auth/use-me";

function UserAccount({
  handleLogout,
  me,
}: {
  handleLogout: () => void;
  me: User | undefined;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center gap-3">
          <img
            src="/assets/images/dummy-ava.png"
            alt="dummy"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1 items-start">
            <span className="font-bold">Dr. {me?.full_name}</span>
            <span>Dokter Bedah</span>
          </div>
          <img
            src="/assets/icons/chevron-down.svg"
            width={16}
            height={16}
            alt="chevron-down"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-2 ">
            <Menu.Item>
              <div className="p-4 cursor-pointer hover:bg-primary-200 flex items-center gap-4">
                <ProfileIcon />
                Profil
              </div>
            </Menu.Item>
            <div className="border-t w-full border-neutral-250" />
            <Menu.Item>
              <div
                onClick={handleLogout}
                className="p-4 cursor-pointer hover:bg-primary-200 flex items-center gap-4"
              >
                <LogoutIcon />
                Logout
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

interface NavMenuDesktopProps {
  isLoggedIn: boolean;
  onClickLogo: () => void;
  onClickToLogin: () => void;
  setIsExpandedMenubar: Dispatch<SetStateAction<boolean>>;
  handleLogout: () => void;
  me: User | undefined;
  pathname: string;
}

function NavMenuDesktop({
  isLoggedIn,
  onClickLogo,
  onClickToLogin,
  // setIsExpandedMenubar,
  handleLogout,
  me,
  pathname,
}: NavMenuDesktopProps) {
  // const onToggleMenubar = () => {
  //   setIsExpandedMenubar((prev) => !prev);
  // };
  return (
    <div className={`transition-all sticky z-50 top-0`}>
      <header className="flex w-full bg-white shadow-md  justify-between border-neutral-300 py-4 items-center mx-auto max-w-[100%] px-8">
        {/* Logo */}
        <div id="logo" className="flex items-center gap-4">
          {/* <MenubarIcon className="cursor-pointer" onClick={onToggleMenubar} /> */}
          <img
            src="/assets/logo/logo-memos.png"
            width={112}
            height={32}
            alt="logo-memos"
            onClick={onClickLogo}
            className="cursor-pointer"
          />
        </div>

        {/* Right section */}
        {isLoggedIn ? (
          <div id="right" className="hidden lg:flex gap-8 items-center">
            {/* TODO: Notification handler */}
            <img
              src="/assets/icons/notification.svg"
              alt="notification"
              width={24}
              height={24}
            />
            <UserAccount handleLogout={handleLogout} me={me} />
          </div>
        ) : (
          <>
            {pathname === "/login" ? (
              <div id="right" className="hidden lg:flex gap-3 items-center">
                <span>Belum memiliki akun?</span>
                <Button title="Daftar" onClick={onClickLogo} />
              </div>
            ) : (
              <div id="right" className="hidden lg:flex gap-3 items-center">
                <span>Sudah memiliki akun?</span>
                <Button title="Masuk" onClick={onClickToLogin} />
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export function Navbar({
  setIsExpandedMenubar,
}: {
  setIsExpandedMenubar: Dispatch<SetStateAction<boolean>>;
}) {
  const { isAuth, logout } = useAuth();
  const { data: me } = useMe();

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname, "pathname");
  const [_, setOpen] = React.useState(false);

  const onClickLogo = () => {
    navigate("/");
  };

  const onClickToLogin = () => {
    navigate("/login");
  };

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavMenuDesktop
        isLoggedIn={isAuth}
        onClickLogo={onClickLogo}
        onClickToLogin={onClickToLogin}
        setIsExpandedMenubar={setIsExpandedMenubar}
        handleLogout={handleLogout}
        me={me}
        pathname={pathname}
      />
    </>
  );
}
