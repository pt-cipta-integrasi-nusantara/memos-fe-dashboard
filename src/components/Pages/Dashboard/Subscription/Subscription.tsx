import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../Ui";
import { useMe } from "../../../../services/auth/use-me";
import { useNavigate } from "react-router-dom";

const subscriptionItems = [
  {
    id: 1,
    price: "3 Bulan – Rp297.000",
  },
  { id: 2, price: "6 Bulan – Rp534.600", discount: "-10%" },
  {
    id: 3,
    price: "1 Tahun – Rp950.400",
    discount: "-20%",
  },
];

export function SubscriptionContent() {
  const navigate = useNavigate();
  const { data: myProfile } = useMe();
  console.log(myProfile, "myProfile");
  const { register } = useForm<any>();

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isHideData, setIsHideData] = useState(Number(false));
  const onNextStep = () => {
    navigate("/dashboard/subscription/payment");
  };

  const onPreviousStep = () => {
    navigate("/");
  };

  const onChangeItem = (id: number) => {
    setSelectedItem(id);
  };

  const onToggleShowData = () => {
    setIsHideData((prev) => Number(!prev));
  };

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
            {subscriptionItems?.map((item) => (
              <div
                onClick={() => onChangeItem(item?.id)}
                className={`cursor-pointer p-4 rounded-[8px] shadow-md ${
                  selectedItem === item?.id
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

                    {selectedItem === item?.id && (
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
                    selectedItem === item?.id ? "text-primary-500" : ""
                  } font-bold mt-2`}
                >
                  {item?.price}
                </div>
              </div>
            ))}
          </div>
          {/* Content */}
          <div className="border-t-2 border-dashed border-neutral-250 w-full h-1"></div>
          <div className="mt-8 flex items-center gap-2">
            <input
              className="accent-primary-500 w-4 h-4"
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
                    value="131312312321"
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
                    value="KTP.png"
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
                    value="John Doe"
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
                    value="8900"
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
                    value="Laki-laki"
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
                    value="Sydney"
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
                    value="RT 09/RW 10, Klopo Sepuluh, Kokap, Lendah, Kulon Progo, D.I. Yogyakarta, Indonesia (55799)"
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
                    value="Dokter"
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
                    value="Umum"
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
                    value="947309247289"
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
                      value="09 Desember 2030"
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
                      value="STR.png"
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
                    value="Dokter John Doe"
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
                    value="Praktek Dokter John Doe"
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
                    value="Perorangan"
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
                    value="123123.png"
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
                    value="RT 09/RW 10, Klopo Sepuluh, Kokap, Lendah, Kulon Progo, D.I. Yogyakarta, Indonesia (55799)"
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
                {
                  subscriptionItems?.find((item) => item?.id === selectedItem)
                    ?.price
                }
              </span>
            </div>
          </div>
          <div className="border-t-2 border-dashed border-neutral-250 w-full h-1"></div>
          <Button
            onClick={onNextStep}
            isPrimary
            className="w-full mt-4"
            title="Lakukan Pembayaran"
          />
        </Card>
      </div>
    </div>
  );
}
