// import { Disclosure, Listbox, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  DashboardIcon,
  SettingsIcon,
  // ProfileIcon,
  WorkIcon,
} from "../iconsComponent";
// import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { Disclosure, Listbox, Transition } from "@headlessui/react";

interface SelectProps {
  label: string;
  id: string;
  logo: string;
}

const orgList = [
  {
    id: "1",
    label: "PT. Setio Husodo",
    logo: "/assets/images/logo-setio.png",
  },
  {
    id: "2",
    label: "PT. Healthy",
    logo: "/assets/images/logo-healthy.png",
  },
];

function Navmenu({ isExpandedMenubar }: { isExpandedMenubar: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const asPath = location.pathname + location.search;
  const [selectedOrg, setSelectedOrg] = useState<SelectProps>(orgList[0]);

  const onClickWorkspace = (workspaceItem: string) => {
    navigate(`/workspace/${workspaceItem}`);
  };

  return (
    <nav>
      <ul className="list-style-none flex flex-col gap-4">
        <li
          onClick={() => navigate("/")}
          className="py-4 flex items-center w-full cursor-pointer border-b border-neutral-250 pb-6"
        >
          {asPath === "/" && (
            <img
              src="/assets/icons/side-menu.svg"
              width={4}
              height={52}
              alt="side-menu"
            />
          )}
          <div className="ml-8 flex items-center gap-3">
            <DashboardIcon
              className={`w-[18px] h-[18px] ${
                asPath === "/" ? "text-primary-500" : ""
              }`}
            />
            {isExpandedMenubar && (
              <span
                className={`font-bold ${
                  asPath === "/" ? "text-primary-500" : ""
                } `}
              >
                Dashboard
              </span>
            )}
          </div>
        </li>

        <Listbox value={selectedOrg} onChange={setSelectedOrg}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="py-4 flex items-center w-full cursor-pointer px-8">
                <span className="block truncate">
                  <div className="cursor-pointer flex items-center justify-between gap-2">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedOrg?.logo}
                        alt="rs-setio"
                        width={16}
                        height={16}
                      />
                      <span className={`text-[14px] block truncate font-bold`}>
                        {selectedOrg?.label}
                      </span>{" "}
                      <img
                        src="/assets/icons/office.svg"
                        alt="office"
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                </span>
                {isExpandedMenubar && (
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-2">
                    <ArrowDownIcon
                      className={
                        open ? "transition-all rotate-180" : "transition-all"
                      }
                    />
                  </span>
                )}
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="z-10 absolute mt-1  w-[90%] -translate-x-1/2 left-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  <div className="p-4">Organisasi saat ini</div>
                  <Listbox.Option
                    className={() => `relative cursor-default select-none p-4`}
                    value={selectedOrg}
                  >
                    {({ selected }) => (
                      <div className="cursor-pointer flex items-center justify-between gap-2">
                        <div className="flex items-center gap-4">
                          <img
                            src={selectedOrg?.logo}
                            alt="rs-setio"
                            width={16}
                            height={16}
                          />
                          <span
                            className={`text-[14px] block truncate ${
                              selected ? "font-bold" : "font-normal"
                            }`}
                          >
                            {selectedOrg?.label}
                          </span>{" "}
                          <img
                            src="/assets/icons/office.svg"
                            alt="office"
                            width={16}
                            height={16}
                          />
                        </div>
                        <img
                          src="/assets/icons/org-checked.svg"
                          alt="office"
                          width={16}
                          height={16}
                        />
                      </div>
                    )}
                  </Listbox.Option>
                  <div className="border-t-2 my-2 border-neutral-250 w-full h-1"></div>
                  <div className="p-4">Ganti organisasi</div>
                  {orgList
                    ?.filter((item) => item?.id !== selectedOrg?.id)
                    .map((org, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={() =>
                          `relative cursor-default select-none p-4`
                        }
                        value={org}
                      >
                        {({ selected }) => (
                          <div className="cursor-pointer flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={org?.logo}
                                alt="rs-setio"
                                width={16}
                                height={16}
                              />
                              <span
                                className={`text-[14px] block truncate ${
                                  selected ? "font-bold" : "font-normal"
                                }`}
                              >
                                {org?.label}
                              </span>{" "}
                              <img
                                src="/assets/icons/office.svg"
                                alt="office"
                                width={16}
                                height={16}
                              />
                            </div>
                            <img
                              src="/assets/icons/org-unchecked.svg"
                              alt="office"
                              width={16}
                              height={16}
                            />
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  <div className="border-t-2 my-2 border-neutral-250 w-full h-1"></div>
                  <div className="flex items-center gap-4 p-4 cursor-pointer">
                    <img
                      src="/assets/icons/plus.svg"
                      alt="plus"
                      width={16}
                      height={16}
                    />
                    Tambah organisasi
                  </div>
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
        <div className="relative">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="py-4 flex items-center w-full cursor-pointer px-8">
                  <span className="block truncate">
                    <div className="cursor-pointer flex items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <WorkIcon
                          className={`w-[18px] h-[18px] ${
                            asPath.includes("/workspace")
                              ? "text-primary-500"
                              : ""
                          }`}
                        />
                        <span
                          className={`font-bold ${
                            asPath.includes("/workspace")
                              ? "text-primary-500"
                              : ""
                          } `}
                        >
                          Workspace
                        </span>
                      </div>
                    </div>
                  </span>
                  {isExpandedMenubar && (
                    <span className="pointer-events-none absolute right-4 flex items-center pr-2">
                      <ArrowDownIcon
                        className={
                          open ? "transition-all rotate-180" : "transition-all"
                        }
                      />
                    </span>
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="relative">
                  <div className="flex flex-col gap-0">
                    <div
                      onClick={() => onClickWorkspace("setio-yogya")}
                      className="h-[40px] py-4 flex items-center w-full cursor-pointer"
                    >
                      {asPath.includes("/workspace/setio-yogya") && (
                        <img
                          src="/assets/icons/side-menu.svg"
                          width={4}
                          height={52}
                          alt="side-menu"
                          className="h-[40px]"
                        />
                      )}
                      <span
                        className={`ml-16 font-bold ${
                          asPath.includes("/workspace/setio-yogya")
                            ? "text-primary-500"
                            : "pl-1"
                        }`}
                      >
                        RS Setio Husodo Jogja
                      </span>
                    </div>
                    <div
                      onClick={() => onClickWorkspace("setio-medan")}
                      className="h-[40px] py-4 flex items-center w-full cursor-pointer"
                    >
                      {asPath.includes("/workspace/setio-medan") && (
                        <img
                          src="/assets/icons/side-menu.svg"
                          width={4}
                          height={52}
                          alt="side-menu"
                          className="h-[40px]"
                        />
                      )}
                      <span
                        className={`ml-16 font-bold ${
                          asPath.includes("/workspace/setio-medan")
                            ? "text-primary-500"
                            : "pl-1"
                        }`}
                      >
                        RS Setio Husodo Medan
                      </span>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="relative">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="py-4 flex items-center w-full cursor-pointer px-8">
                  <span className="block truncate">
                    <div className="cursor-pointer flex items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <SettingsIcon
                          className={`w-[18px] h-[18px] ${
                            asPath.includes("/master-item")
                              ? "text-primary-500"
                              : ""
                          }`}
                        />

                        <span
                          className={`font-bold ${
                            asPath.includes("/master-item")
                              ? "text-primary-500"
                              : ""
                          } `}
                        >
                          Admin Panel
                        </span>
                      </div>
                    </div>
                  </span>
                  {isExpandedMenubar && (
                    <span className="pointer-events-none absolute right-4 flex items-center pr-2">
                      <ArrowDownIcon
                        className={
                          open ? "transition-all rotate-180" : "transition-all"
                        }
                      />
                    </span>
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="relative">
                  <div className="flex flex-col gap-0">
                    <div
                      onClick={() => navigate("/master-item")}
                      className="py-4 flex items-center w-full cursor-pointer"
                    >
                      <span
                        className={`ml-16 font-bold ${
                          asPath.includes("/master-item")
                            ? "text-primary-500"
                            : "pl-1"
                        }`}
                      >
                        Master Item
                      </span>
                    </div>
                    <div
                      onClick={() => navigate("/master-tarif")}
                      className="py-4 flex items-center w-full cursor-pointer"
                    >
                      <span
                        className={`ml-16 font-bold ${
                          asPath.includes("/master-tarif")
                            ? "text-primary-500"
                            : "pl-1"
                        }`}
                      >
                        Master tarif
                      </span>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        {/* <li
          onClick={() => navigate("/profile")}
          className="py-4 flex items-center w-full cursor-pointer border-b border-neutral-250 pb-6"
        >
          {asPath.includes("/profile") && (
            <img
              src="/assets/icons/side-menu.svg"
              width={4}
              height={52}
              alt="side-menu"
            />
          )}
          <div className="ml-8 flex items-center gap-3">
            <ProfileIcon
              className={`w-[18px] h-[18px] ${
                asPath.includes("/profile") ? "text-primary-500" : ""
              }`}
            />
            {isExpandedMenubar && (
              <span
                className={`font-bold ${
                  asPath.includes("/profile") ? "text-primary-500" : ""
                } `}
              >
                Profile
              </span>
            )}
          </div>
        </li> */}
      </ul>
    </nav>
  );
}

export function SideMenuBar({
  isExpandedMenubar,
}: {
  isExpandedMenubar: boolean;
}) {
  return (
    <div
      className={`transition-all hidden lg:block pt-[2rem] h-screen border-r border-neutral-250 w-0 ${
        isExpandedMenubar ? "min-w-[300px] " : "min-w-[85px] "
      }  overflow-auto`}
    >
      <Navmenu isExpandedMenubar={isExpandedMenubar} />
    </div>
  );
}
