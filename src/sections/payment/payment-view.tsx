import { Listbox, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../components/uiComponent";
import { ArrowDownIcon } from "../../components/iconsComponent";
import { bankList } from "../../components/constants/constants";
import { useNavigate } from "react-router-dom";
import { useSubscriptionStore } from "../../stores/subscription/useSubscriptionStore";
import { formatRupiah } from "../../helpers/format-currency";
import { useMe } from "../../services/auth/use-me";
import { uploadImage } from "../../services/utils/uploadImage";
import { useCreatePayment } from "../../services/payment/use-payment-create";
import dayjs from "dayjs";
import { formatDuration } from "../../helpers/format-duration";
import { useSubscriptionById } from "../../services/subscription/use-subscription-detail";

interface BankAccountProps {
  bank_name: string;
}

export function PaymentContent({ data }: { data?: any }) {
  const { subscriptionData, formData, setFormData, setSubscriptionData } =
    useSubscriptionStore();
  const { mutate: createPayment } = useCreatePayment();
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { register, handleSubmit } = useForm<any>();
  const [selectedBank, setSelectedBank] = useState<BankAccountProps>();
  const form = useRef(null) as any;

  useEffect(() => {
    if (data) {
      setSubscriptionData({
        price: data?.plan?.price,
      });
    }
  }, [data]);

  const onPreviousStep = () => {
    navigate("//subscription");
  };

  const handleFotoBuktiBayar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const imageData = new FormData();
      imageData.append("file", file as unknown as File);
      uploadImage(imageData).then((res) => {
        const { file_url } = res;
        setFormData({
          payment_proof: file_url,
        });
      });
      setFormData({
        payment_proof_name: file?.name,
      });
    }
  };

  useEffect(() => {
    setSelectedBank(
      bankList?.find(
        (item) => item?.bank_name === formData?.bankAccount?.bank_name
      )
    );
  }, []);

  const onSubmit: SubmitHandler<any> = async () => {
    const payload = {
      subscription_id: subscriptionData?.id,
      bank_account: {
        owner_name: formData?.owner_name,
        account_number: formData?.account_number,
        bank_name: formData?.bankAccount?.bank_name,
      },
      pay_amount: subscriptionData?.price,
      pay_date: dayjs().format("YYYY-MM-DD"),
      payment_proof: formData?.payment_proof,
    };

    console.log(payload, "payload");
    createPayment(payload, {
      onSuccess: (data) => {
        setSubscriptionData({
          pay_date: data?.data?.pay_date,
        });
        if (data?.data?.status === "Pending") {
          navigate("/subscription/payment/pending");
        } else {
          navigate("/subscription/payment/success");
        }
      },
      onError: () => {
        navigate("/subscription/payment/failed");
      },
    });
    // TODO Submit handler
  };

  return (
    <div
      id="summary"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[80rem] mx-auto")}
    >
      <div className="lg:mx-36">
        <div>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <div className="flex items-center gap-4 mb-4">
                <img
                  onClick={onPreviousStep}
                  src="/assets/icons/arrow-back.svg"
                  alt="back"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                {/* Heading */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-[24px] font-bold">Detail Pembayaran</h1>
                </div>
                {/* Heading */}
              </div>
              <div className="border-t-2 border-neutral-250 w-full h-1"></div>
              <div className="p-4 bg-[#E9F1FC] text-link rounded-[8px] mt-6">
                Silakan melakukan transfer sebelum 24 Februari 2025, 23:59 WIB
                untuk menghindari pembatalan otomatis.
              </div>
              <div className="mt-6 text-[14px]">
                <div id="identitas-diri" className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Instruksi Transfer</span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                    <span>Transfer ke</span>
                    <span>BCA</span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                    <span>Nomor Rekening</span>
                    <span>1234-5678-9890</span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                    <span>Nama Penerima</span>
                    <span>PT Cipta Integrasi Nusantara</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-[14px]">
                <div id="identitas-profesi" className="mt-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Detail Transaksi</span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
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
                        {subscriptionData?.duration
                          ? formatDuration(subscriptionData?.duration ?? "")
                          : ""}{" "}
                        {data?.plan?.duration?.Months} Months –{" "}
                        {formatRupiah(subscriptionData?.price)}
                      </span>
                      <span className="text-primary-500 underline cursor-pointer">
                        Ubah
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                    <span>Tagihan Kepada</span>
                    <span>{me?.full_name}</span>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                    <span>Metode Pembayaran</span>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="border-t-2 border-neutral-250 w-full h-1 mt-4"></div>

                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-2">
                    <span>Subtotal</span>
                    <span className="text-[12px]">
                      {formatRupiah(subscriptionData?.price)}
                    </span>
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-2">
                    <span>Total</span>
                    <span className="text-[14px] font-bold">
                      {formatRupiah(subscriptionData?.price)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-dashed border-neutral-400 w-full h-1 mt-8"></div>
              <div className="mt-8 text-[14px]">
                <div id="identitas-profesi" className="mt-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Detail Transfer</span>
                  </div>
                  <div className="w-full flex flex-col gap-2 mt-4">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="fullname"
                    >
                      Nama Lengkap
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="fullname"
                      {...register("fullname", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan Nama Lengkap"
                      onChange={(e) =>
                        setFormData({ owner_name: e.target.value })
                      }
                      defaultValue={formData["owner_name"]}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-2 mt-4">
                    <label className="text-[14px] font-medium" htmlFor="gender">
                      Nama Bank
                      <span className="text-warning">*</span>
                    </label>

                    <Listbox value={selectedBank} onChange={setSelectedBank}>
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedBank ? (
                              <>{selectedBank?.bank_name}</>
                            ) : (
                              <span className="text-neutral-400">
                                Pilih Nama Bank
                              </span>
                            )}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ArrowDownIcon />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {bankList.map((bank, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  console.log("bank clicked");
                                  setFormData({ bankAccount: bank });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={bank}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {bank?.bank_name}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  <div className="w-full flex flex-col gap-2 mt-4">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="no_rekening"
                    >
                      Nomor Rekening
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="no_rekening"
                      {...register("no_rekening", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan Nomor Rekening"
                      onChange={(e) =>
                        setFormData({ account_number: e.target.value })
                      }
                      defaultValue={formData?.account_number}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-2 mt-4">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="bukti_transfer"
                    >
                      Unggah Bukti Transfer
                      <span className="text-warning">*</span>
                    </label>
                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                      <input
                        {...register("bukti_transfer", { required: true })}
                        type="text"
                        className="focus:outline-none w-full"
                        placeholder="Unggah Bukti Transfer"
                        value={formData?.payment_proof_name}
                        readOnly
                      />
                      <input
                        type="file"
                        hidden
                        id="bukti_transfer"
                        onChange={handleFotoBuktiBayar}
                      />
                      <label
                        htmlFor="bukti_transfer"
                        className="text-link cursor-pointer"
                      >
                        Unggah
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="mt-8">
              <p>
                Jika Anda telah melakukan pembayaran, klik tombol di bawah ini
                untuk konfirmasi.
              </p>
              <div className="flex flex-col-reverse lg:flex-row  justify-between gap-4 mt-4">
                <Button
                  title="Ke Halaman Utama"
                  className="w-full border-neutral-300 text-neutral-300"
                />
                <Button
                  isPrimary
                  type="submit"
                  title="Konfirmasi Pembayaran"
                  className="w-full"
                />
              </div>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
