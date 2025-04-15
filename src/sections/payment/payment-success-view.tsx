import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../components/uiComponent";
import { useNavigate } from "react-router-dom";
import { useSubscriptionStore } from "../../stores/subscription/useSubscriptionStore";
import { formatRupiah } from "../../helpers/format-currency";
import dayjs from "dayjs";
import { useSubscriptionById } from "../../services/subscription/use-subscription-detail";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CloseIcon } from "../../components/iconsComponent";

export function PaymentSuccessContent({ data }: { data: any }) {
  const { subscriptionData, resetFormData, resetSubscriptionData } =
    useSubscriptionStore();
  const { data: subscription } = useSubscriptionById(data?.subscription_id);
  const navigate = useNavigate();
  const [isPreviewImage, setIsPreviewImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");

  const onBackToHome = () => {
    navigate("/");
    resetFormData();
    resetSubscriptionData();
  };

  const onPreviewImage = (image: string) => {
    setIsPreviewImage(true);
    setSelectedImage(image);
  };

  // useEffect(() => {
  //   if (Object.keys(subscriptionData).length === 0) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div
      id="summary"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[80rem] mx-auto")}
    >
      <div className="lg:mx-36">
        <div>
          <Card>
            <div className="flex flex-col items-center gap-4 justify-center">
              <img
                src="/assets/images/success-payment.png"
                width={250}
                height={200}
                alt="success-payment"
              />
              <div className="flex flex-col gap-1 items-center">
                <h1 className="text-[24px] font-bold text-center">
                  Terima kasih! <br className="block md:hidden" /> Pembayaran
                  Anda telah diterima
                </h1>
                <p className="text-center">
                  Akses ke layanan Anda telah aktif. Anda dapat mulai
                  menggunakan Workspace sekarang!
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center mt-4">
              <p>Jumlah</p>
              <p className="text-[20px] text-primary-500 font-bold">
                {formatRupiah(subscription?.plan?.price)}
              </p>
              <p>
                {dayjs(subscription?.plan?.pay_date).format("DD MMMM YYYY")} •
                Pembayaran 82302393
              </p>
            </div>

            <div className="mt-8 text-[14px]">
              <div id="identitas-profesi" className="mt-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Detail Transaksi</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Paket Langganan</span>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/logo/logo-clinix.png"
                      width={81}
                      height={24}
                      alt="logo-clinix"
                      className="cursor-pointer"
                    />
                    <span className="font-bold text-primary-500 text-[20px]">
                      {subscriptionData?.duration} –{" "}
                      {formatRupiah(subscription?.plan?.price)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Tagihan Kepada</span>
                  <span>{subscription?.payment?.bank_account?.owner_name}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Metode Pembayaran</span>
                  <span>Bank Transfer</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Nama Pemilik Rekening</span>
                  <span>{subscription?.payment?.bank_account?.owner_name}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Nama Bank</span>
                  <span>{subscription?.payment?.bank_account?.bank_name}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>No. Rekening</span>
                  <span>
                    {subscription?.payment?.bank_account?.account_number}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Bukti Transfer</span>
                  <span
                    onClick={() =>
                      onPreviewImage(subscription?.payment?.payment_proof)
                    }
                    className="underline text-link cursor-pointer"
                  >
                    {subscription?.payment?.payment_proof}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Total Pembayaran</span>
                  <span className="text-[14px] font-bold">
                    {formatRupiah(subscription?.payment?.pay_amount)}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 w-full h-1 mt-8"></div>

            <div className="flex flex-col-reverse md:flex-row  justify-between gap-4 mt-8">
              <Button
                title="Cetak Bukti Pembayaran"
                className="w-full border-neutral-300 text-neutral-300"
              />
              <Button
                isPrimary
                onClick={onBackToHome}
                title="Ke Halaman Utama"
                className="w-full"
              />
            </div>
          </Card>
        </div>
      </div>

      {isPreviewImage && (
        <Transition appear show={isPreviewImage} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsPreviewImage(false)}
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
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900"
                    >
                      <div>Preview</div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setIsPreviewImage(false)}
                      >
                        <CloseIcon />
                      </div>
                    </Dialog.Title>
                    <div className="mt-2 flex justify-center max-h-[600px]">
                      <img src={selectedImage} className="object-cover" />
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
