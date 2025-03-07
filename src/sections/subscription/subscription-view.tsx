import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../components/uiComponent";
import { useMe } from "../../services/auth/use-me";
import { useNavigate } from "react-router-dom";
import { usePlanList } from "../../services/plan/use-plan-list";
import { formatRupiah } from "../../helpers/format-currency";
import { Plan } from "../../services/plan/types";
import toast from "react-hot-toast";
import { useCreateSubscription } from "../../services/subscription/use-subscription-create";
import { useSubscriptionStore } from "../../stores/subscription/useSubscriptionStore";
import { formatDuration } from "../../helpers/format-duration";

export function SubscriptionContent() {
  const navigate = useNavigate();
  const { data: me } = useMe();
  const { data: planList } = usePlanList();
  const { setSubscriptionData } = useSubscriptionStore();
  const { mutate: submitSubscription } = useCreateSubscription();
  const { register } = useForm<any>();

  const [selectedItem, setSelectedItem] = useState<Plan | null>(null);
  const [isHideData, setIsHideData] = useState(Number(false));

  const onPreviousStep = () => {
    navigate("/");
  };

  const onChangeItem = (item: Plan) => {
    setSelectedItem(item);
  };

  const onToggleShowData = () => {
    setIsHideData((prev) => Number(!prev));
  };

  const onSubmitPlan = async () => {
    setSubscriptionData(selectedItem);
    submitSubscription(
      {
        plan_id: selectedItem?.id,
      },
      {
        onSuccess: (data) => {
          console.log(data, "datanya sub");
          setSubscriptionData((prev: any) => ({
            ...prev,
            id: data?.data?.id,
          }));
          navigate("/subscription/payment");
        },
        onError: (error: any) => {
          const reason = error?.message
            ? error?.message?.split("~")[0]
            : "Terjadi error, silakan coba lagi";
          toast.error(reason);
        },
      }
    );
  };

  const selectedPlan = planList?.find((item) => item?.id === selectedItem?.id);

  return (
    <div
      id="terms-condition"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[1200rem] mx-auto")}
    >
      <div>
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
              <h1 className="text-[24px] font-bold">Pilih Paket Langganan</h1>
            </div>
            {/* Heading */}
          </div>
          <div className="border-t-2 border-neutral-250 w-full h-1"></div>
          {/* Content */}
          <div className="flex flex-col lg:flex-row items-center gap-4 my-8">
            {planList?.map((item) => (
              <div
                onClick={() => onChangeItem(item)}
                className={`cursor-pointer p-4 rounded-[8px] shadow-md ${
                  selectedItem?.id === item?.id
                    ? "border border-2 border-primary-500"
                    : "border border-1 border-neutral-250"
                }  w-full`}
              >
                <div className="flex items-center space-between">
                  <div className="flex items-center justify-between w-full">
                    <img
                      src="/assets/logo/logo-clinix.png"
                      width={81}
                      height={24}
                      alt="logo-clinix"
                      className="cursor-pointer"
                    />

                    {selectedItem?.id === item?.id && (
                      <img
                        src="/assets/icons/ticked-checklist.svg"
                        width={20}
                        height={20}
                        alt="checklist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${
                    selectedItem?.id === item?.id ? "text-primary-500" : ""
                  } font-bold mt-2`}
                >
                  {formatDuration(item?.duration)} - {formatRupiah(item?.price)}
                </div>
              </div>
            ))}
          </div>
          {/* Content */}
          <div className="border-t-2 border-dashed border-neutral-250 w-full h-1"></div>
          <div className="mt-8 flex items-center gap-2">
            <input
              className="accent-green-500 w-4 h-4"
              id="show_identity"
              type="checkbox"
              value={isHideData}
              onChange={onToggleShowData}
            />

            <label htmlFor="show_identity" className="cursor-pointer">
              Tampilkan Detail Identitas Anda
            </label>
          </div>
          {isHideData ? (
            <div className="flex flex-col gap-4 mt-4">
              {/* Row 1 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] font-medium" htmlFor="nik">
                    NIK
                  </label>
                  <input
                    id="nik"
                    {...register("nik", { required: true })}
                    type="text"
                    value={me?.user?.identity_number}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="unggah_foto_ktp"
                  >
                    Unggah Foto KTP
                  </label>
                  <input
                    {...register("unggah_foto_ktp", { required: true })}
                    type="text"
                    className="text-link underline rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    placeholder="Unggah Foto KTP"
                    value={me?.user?.identity_photo}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] font-medium" htmlFor="fullname">
                    Nama Lengkap
                  </label>
                  <input
                    id="fullname"
                    {...register("fullname", { required: true })}
                    type="text"
                    value={me?.user?.full_name}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] font-medium" htmlFor="no_memos">
                    No. Memos
                  </label>
                  <input
                    id="nik"
                    {...register("no_memos", { required: true })}
                    type="text"
                    value={me?.user?.no_rm}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
              </div>
              {/* Row 3 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] font-medium" htmlFor="gender">
                    Jenis Kelamin
                  </label>
                  <input
                    id="gender"
                    {...register("gender", { required: true })}
                    type="text"
                    value={me?.user?.gender}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="birth_place"
                  >
                    Tempat Lahir
                  </label>
                  <input
                    id="birth_place"
                    {...register("birth_place", { required: true })}
                    type="text"
                    value={me?.user?.birth_place}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
              </div>
              {/* Row 4 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] font-medium" htmlFor="address">
                    Alamat
                  </label>
                  <input
                    id="address"
                    {...register("address", { required: true })}
                    type="text"
                    value={me?.user?.addresses[0]?.street_address}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="border-t-2 border-dashed border-neutral-250 w-full h-1"></div>

              {/* Row 5 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="profesion"
                  >
                    Projfesi/Jabatan
                  </label>
                  <input
                    id="profesion"
                    {...register("profesion", { required: true })}
                    type="text"
                    value={me?.user?.profession_id}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] font-medium" htmlFor="smf">
                    SMF
                  </label>
                  <input
                    id="smf"
                    {...register("smf", { required: true })}
                    type="text"
                    value={me?.user?.smf_id}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
              </div>
              {/* Row 6 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] font-medium" htmlFor="no_str">
                    No. STR Aktif
                  </label>
                  <input
                    id="no_str"
                    {...register("no_str", { required: true })}
                    type="text"
                    value={me?.user?.str_no}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 lg:w-full">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="expired_date"
                    >
                      Tanggal Habis Berlaku
                    </label>
                    <input
                      id="expired_date"
                      {...register("expired_date", { required: true })}
                      type="text"
                      value={me?.user?.str_expires_date}
                      className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="str_aktif"
                    >
                      Unggah STR Aktif
                    </label>
                    <input
                      {...register("str_aktif", { required: true })}
                      type="text"
                      className="text-link underline rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                      placeholder="Unggah Foto KTP"
                      value={me?.user?.str_photo}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-neutral-250 w-full h-1"></div>

              {/* Row 7 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="organisasi"
                  >
                    Organisasi
                  </label>
                  <input
                    id="organisasi"
                    {...register("organisasi", { required: true })}
                    type="text"
                    value={me?.user?.facility?.organization_name}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="nama_klinik"
                  >
                    Nama Klinik/Usaha
                  </label>
                  <input
                    id="nama_klinik"
                    {...register("nama_klinik", { required: true })}
                    type="text"
                    value={me?.user?.facility?.name}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
              </div>
              {/* Row 8 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="jenis_usaha"
                  >
                    Jenis Usaha
                  </label>
                  <input
                    id="jenis_usaha"
                    {...register("jenis_usaha", { required: true })}
                    type="text"
                    value={me?.user?.facility?.type}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="foto_klinik"
                  >
                    Unggah Foto Tempat Klinik/Usaha
                  </label>
                  <input
                    {...register("foto_klinik", { required: true })}
                    type="text"
                    className="text-link underline rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    placeholder="Unggah Foto Tempat Klinik/Usaha"
                    value={me?.user?.facility?.photo}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              {/* Row 9 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="alamat_usaha"
                  >
                    Alamat
                  </label>
                  <input
                    id="alamat_usaha"
                    {...register("alamat_usaha", { required: true })}
                    type="text"
                    value={me?.user?.facility?.address}
                    className="text-neutral-300 rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 focus:outline-none w-full"
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Card>
        <Card className="mt-8">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-4 gap-2">
            <h3 className="text-base font-bold">Paket Yang Dipilih</h3>
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo/logo-clinix.png"
                width={81}
                height={24}
                alt="logo-clinix"
                className="cursor-pointer"
              />
              <span className="font-bold text-primary-500 text-[20px]">
                {formatDuration(selectedPlan?.duration ?? "")} -{" "}
                {formatRupiah(selectedPlan?.price ?? 0)}
              </span>
            </div>
          </div>
          <div className="border-t-2 border-dashed border-neutral-250 w-full h-1"></div>
          <Button
            onClick={onSubmitPlan}
            isPrimary
            className="w-full mt-4"
            title="Lakukan Pembayaran"
          />
        </Card>
      </div>
    </div>
  );
}
