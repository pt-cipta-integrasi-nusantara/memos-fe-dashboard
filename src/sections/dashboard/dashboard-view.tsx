import { useNavigate } from "react-router-dom";
import { CloseIcon, DownloadIcon } from "../../components/iconsComponent";
import { Fragment, useState } from "react";
import { Button, Card } from "../../components/uiComponent";
import { twMerge } from "tailwind-merge";
import { Dialog, Transition } from "@headlessui/react";
import { useMe } from "../../services/auth/use-me";
import { useMyActivityList } from "../../services/my-activity/use-my-activity-list";
import dayjs from "dayjs";

export function DashboardContent() {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { data: myActivity } = useMyActivityList();
  const [isWorkspaceModal, setIsWorkspaceModal] = useState(false);
  const [isDetailWorkspaceModal, setIsDetailWorkspaceModal] = useState(false);

  // const userData = JSON.parse(getUserData() ?? "");

  // useEffect(() => {
  //   if (!userData) {
  //     setUserData(me ?? {});
  //     console.log("set user data");
  //   }
  // }, [me, userData]);

  const onToDetail = () => {
    navigate("/subscription");
  };

  const onToDetailRegistration = (payload: any) => {
    if (payload?.subscription_id) {
      navigate(`/subscription/payment/${payload?.subscription_id}`);
    }
    if (payload?.payment_id) {
      navigate(`/subscription/payment/status/${payload?.payment_id}`);
    }
  };

  const onAcceptWorkspace = (mode: string) => {
    if (mode === "Terima") {
      setIsWorkspaceModal(true);
    } else {
      setIsDetailWorkspaceModal(true);
    }
  };

  const hasSubscriptionId = myActivity?.some(
    (item) => item.payload?.subscription_id !== undefined
  );

  const hasPaymentId = myActivity?.some(
    (item) => item.payload?.payment_id !== undefined
  );

  return (
    <div
      id="dashboard"
      className={twMerge("mb-24 px-4 lg:px-8", "max-w-full mx-auto")}
    >
      <div className="">
        <Card className="p-4 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-[24px] font-bold">
              Halo, Dr. {me?.account?.full_name}!
            </h1>
            <p>
              Selamat datang di Memos, ruang untuk bekerja dengan nyaman dan
              meningkatkan media sosial profesional Anda.
            </p>
          </div>
          {/* <Button
            className="flex-none w-40 md:w-auto mt-2 md:mt-0 h-0"
            isPrimary
            title="Lengkapi Profil"
          /> */}
        </Card>
        <Card className="mt-4 p-0 py-4">
          <div className="flex items-center gap-2  p-4">
            <img
              src="/assets/icons/history.svg"
              width={24}
              height={24}
              alt="history"
            />
            <span className="font-bold">Aktivitas</span>
          </div>

          <div id="aktivitas-content">
            {myActivity?.map((activity, index) => (
              <div
                className={`flex flex-col md:flex-row justify-between  py-4 px-8  ${
                  index % 2 === 0 ? "bg-blue-50 w-full" : ""
                } `}
              >
                <div className={`flex gap-2`}>
                  {activity?.image && (
                    <img
                      src={activity?.image}
                      width={40}
                      height={40}
                      alt="ava"
                      className="rounded-full w-[40px] h-[40px]"
                    />
                  )}
                  <div>
                    <div>
                      <span className="text-[12px] font-bold">
                        {activity?.details}
                      </span>
                    </div>
                    {activity?.timestamp && (
                      <div>
                        <span className="text-[12px] text-neutral-300">
                          {dayjs(activity?.timestamp).format(
                            "DD - MMMM - YYYY - hh:mm"
                          )}
                        </span>
                      </div>
                    )}

                    {hasPaymentId &&
                      activity?.details === "Konfirmasi Pembayaran Terkirim" &&
                      activity?.payload &&
                      !activity?.payload?.choose_plan && (
                        <div>
                          <span
                            className="cursor-pointer text-[14px] text-primary-500"
                            onClick={() =>
                              onToDetailRegistration(activity?.payload)
                            }
                          >
                            Lihat detail
                          </span>
                        </div>
                      )}

                    {!hasPaymentId &&
                      activity?.details ===
                        "Order langganan Clinix Anda masih menunggu pembayaran" &&
                      activity?.payload &&
                      !activity?.payload?.choose_plan && (
                        <div>
                          <span
                            className="cursor-pointer text-[14px] text-primary-500"
                            onClick={() =>
                              onToDetailRegistration(activity?.payload)
                            }
                          >
                            Lihat detail
                          </span>
                        </div>
                      )}
                    {!hasSubscriptionId &&
                      activity?.payload?.choose_plan === true &&
                      me?.loginSource !== "memos" && (
                        <div>
                          <span
                            className="cursor-pointer text-[14px] text-primary-500"
                            onClick={onToDetail}
                          >
                            Lihat Paket
                          </span>
                        </div>
                      )}
                    {activity?.content && (
                      <div>
                        <span className="text-[12px] text-neutral-300">
                          {activity?.content}
                        </span>

                        <button
                          onClick={() =>
                            onAcceptWorkspace(activity?.actions?.label)
                          }
                          className="block md:hidden mt-4 bg-white border-primary-500 text-primary-500 rounded-lg px-2 py-1 border-2  "
                        >
                          {activity?.actions?.label}
                        </button>
                      </div>
                    )}
                    <div>
                      <span
                        className="cursor-pointer text-[14px] text-primary-500"
                        onClick={onToDetail}
                      >
                        {activity?.extra}
                      </span>
                    </div>
                  </div>
                </div>
                {activity?.actions && (
                  <button
                    onClick={() => onAcceptWorkspace(activity?.actions?.label)}
                    className="hidden md:block mt-4 bg-white border-primary-500 text-primary-500 rounded-lg px-4 p-2 border-2  "
                  >
                    {activity?.actions?.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {isWorkspaceModal && (
        <Transition appear show={isWorkspaceModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsWorkspaceModal(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-[30rem] transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-col justify-center items-center gap-4">
                      <h2 className="text-[20px] font-bold mt-32">
                        Workspace Baru Berhasil Dibuka
                      </h2>
                      <p>
                        Selamat! Anda telah menjadi bagian dari RS Setio Husodo
                      </p>
                      <Button
                        isPrimary
                        className="w-full"
                        title="Mulai Bekerja"
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}

      {isDetailWorkspaceModal && (
        <Transition appear show={isDetailWorkspaceModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsDetailWorkspaceModal(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-[80rem] transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between mb-2"
                    >
                      PKS_John_doe.pdf
                      <CloseIcon
                        className="cursor-pointer"
                        onClick={() => setIsDetailWorkspaceModal(false)}
                      />
                    </Dialog.Title>

                    <div className="max-h-[40rem] overflow-y-auto p-4">
                      <img
                        src="/assets/images/PKS.png"
                        width={1200}
                        height={640}
                        alt="pks"
                      />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                      <Button
                        icon={<DownloadIcon />}
                        title="Unduh Dokumen"
                        className="w-full md:w-[15%]"
                      />

                      <div className="flex w-full md:w-auto mt-4 md:mt-0 flex-none flex-col-reverse lg:flex-row  justify-between gap-4 ">
                        <Button title="Tolak" className="w-full md:w-64" />
                        <Button
                          isPrimary
                          // onClick={onFinishRegistration}
                          title="Terima"
                          className="w-full md:w-64"
                        />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
}
