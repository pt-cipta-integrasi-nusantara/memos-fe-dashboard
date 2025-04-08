import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../components/uiComponent";
import { useRegistrationFormStore } from "../../../stores/registration/useRegistrationFormStore";
import { useRegister } from "../../../services/auth/use-registration";
import toast from "react-hot-toast";
import * as sessionService from "../../../utils/session";
import { useNavigate, useSearchParams } from "react-router-dom";
import { spesialisData } from "../../../components/constants/constants";
import { Dialog, Transition } from "@headlessui/react";

export function SummaryContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product = String(searchParams.get("product"));
  const { formData } = useRegistrationFormStore();
  const { mutate: registerAccount } = useRegister();
  const [isChecked, setIsChecked] = React.useState(false);
  const [isPreviewImage, setIsPreviewImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const isSameAddress = formData["isSameAddress"] === true;

  const onCheckAgreement = () => {
    setIsChecked((prev) => !prev);
  };

  const onClickToEdit = () => {
    if (product === "clinix") {
      navigate("/registration/step/2?product=clinix");
    } else {
      navigate("/registration/step/2");
    }
  };

  const onFinishRegistration = () => {
    const payload = {
      full_name: formData?.full_name,
      password: formData?.password,
      user: {
        gender: formData?.gender,
        birth_place: formData?.birth_place,
        birth_date: formData?.birth_date,
        identity_number: formData?.identity_number,
        identity_photo: formData?.identity_photo,
        phone_number: formData?.phone_number,
        profession_id: formData?.profession_id,
        str_no: formData?.str_no,
        expires_date: formData?.expires_date,
        str_photo: formData?.str_photo,
      },
      addresses: [
        {
          country: "1",
          province: formData?.province,
          city: formData?.city,
          sub_district: formData?.sub_district,
          village: formData?.village,
          street_address: formData?.street_address,
          postal_code: formData?.postal_code,
          phone_number: formData?.telp,
          detail_note: formData?.detail_note,
          house_no: Number(formData?.house_no),
          rt_no: Number(formData?.rt_no),
          rw_no: Number(formData?.rw_no),
          latitude: formData?.latitude,
          longitude: formData?.longitude,
        },
      ],
      facility: {
        name: formData?.facility_name,
        organization_name: formData?.facility_organization_name,
        photo: formData?.facility_photo,
        ref_address: {
          country: "1",
          province: isSameAddress
            ? formData?.province
            : formData?.facility_province,
          city: isSameAddress ? formData?.city : formData?.facility_city,
          sub_district: isSameAddress
            ? formData?.sub_district
            : formData?.facility_sub_district,
          village: isSameAddress
            ? formData?.village
            : formData?.facility_village,
          street_address: isSameAddress
            ? formData?.street_address
            : formData?.facility_street_address,
          postal_code: isSameAddress
            ? formData?.postal_code
            : formData?.facility_postal_code,
          phone_number: isSameAddress
            ? formData?.telp
            : formData?.facility_telp,
          detail_note: isSameAddress
            ? formData?.detail_note
            : formData?.facility_detail_note,
          house_no: isSameAddress
            ? Number(formData?.house_no)
            : Number(formData?.facility_house_no),
          rt_no: isSameAddress
            ? Number(formData?.rt_no)
            : Number(formData?.facility_rt_no),
          rw_no: isSameAddress
            ? Number(formData?.rw_no)
            : Number(formData?.facility_rt_no),
          latitude: isSameAddress
            ? formData?.latitude
            : formData?.facility_latitude,
          longitude: isSameAddress
            ? formData?.longitude
            : formData?.facility_longitude,
        },
      },
    };
    registerAccount(payload, {
      onSuccess: () => {
        sessionService.flushSession();
        if (product === "clinix") {
          navigate("/registration/summary/finish?product=clinix");
        } else {
          navigate("/registration/summary/finish");
        }
      },
      onError: (error: any) => {
        const reason = error?.message
          ? error?.message?.split("~")[0]
          : "Terjadi error, silakan coba lagi";
        toast.error(reason);
      },
    });
  };

  const onPreviewImage = (image: string) => {
    setIsPreviewImage(true);
    setSelectedImage(image);
  };

  return (
    <div id="summary" className={twMerge("mb-24 p-4", "max-w-[560px] mx-auto")}>
      <div>
        <div>
          <Card>
            <div className="text-center">
              <h2 className="font-bold text-[18px] lg:text-[25px]">
                Ringkasan Pendaftaran
              </h2>
              <h3 className="mt-2 text-[14px]">
                Pastikan semua data di bawah ini sudah benar sebelum
                melanjutkan:
              </h3>
            </div>
            <div className="mt-8 text-[14px]">
              {/* <table className="w-full">
                <tbody>
                  <tr className="pb-4">
                    <td>
                      <span className="font-bold">Identitas Diri</span>
                    </td>
                  </tr>
                  <tr className="pb-4">
                    <td>NIK</td>
                    <td className="text-right">7990890890</td>
                  </tr>
                </tbody>
              </table> */}
              <div id="identitas-diri" className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Identitas Diri</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>NIK</span>
                  <span>{formData?.identity_number}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Unggah KTP</span>
                  <span
                    className="cursor-pointer underline text-link"
                    onClick={() => onPreviewImage(formData?.identity_photo)}
                  >
                    {formData?.identity_photo_name}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Nama Lengkap</span>
                  <span>{formData?.full_name}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Jenis Kelamin</span>
                  <span>
                    {formData?.gender === "1" ? "Laki-laki" : "Perempuan"}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Tempat/Tanggal Lahir</span>
                  <span>
                    {formData?.birth_place}, {formData?.birth_date}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>No. HP</span>
                  <span>{formData?.phone_number}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Alamat</span>
                  <span className="w-1/2 text-right">
                    {formData?.street_address} {formData?.detail_note}
                    {", "}
                    {formData?.rt_no ? `RT ${formData?.rt_no}` : null}{" "}
                    {formData?.rw_no ? `RW ${formData?.rw_no}` : null}
                    {", "}
                    {formData?.sub_district_name}
                    {", "} {formData?.village_name}
                    {", "} {formData?.city_name}
                    {", "} {formData?.province_name}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 text-[14px]">
              <div id="identitas-profesi" className="mt-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Identitas Profesi</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>SMF</span>
                  <span>
                    {
                      spesialisData?.find(
                        (item) => item?.id === formData["smf_id"]
                      )?.label
                    }
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>No. STR Aktif</span>
                  <span>{formData?.str_no}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Unggah STR</span>
                  <span
                    className="cursor-pointer underline text-link"
                    onClick={() => onPreviewImage(formData?.str_photo)}
                  >
                    {formData?.str_photo_name}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Tanggal Habis Berlaku</span>
                  <span>{formData?.expires_date}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Organisasi</span>
                  <span>{formData?.facility_organization_name}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Nama Klinik</span>
                  <span>{formData?.facility_name}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Jenis Usaha</span>
                  <span>{formData?.facility_type}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Unggah Tempat Usaha</span>
                  <span
                    className="cursor-pointer underline text-link"
                    onClick={() => onPreviewImage(formData?.facility_photo)}
                  >
                    {formData?.facility_photo_name}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Alamat</span>
                  <span className="w-1/2 text-right">
                    {isSameAddress
                      ? formData?.street_address
                      : formData?.facility_street_address}{" "}
                    {isSameAddress
                      ? formData?.detail_note
                      : formData?.facility_detail_note}
                    {", "}
                    {isSameAddress
                      ? formData?.rt_no
                      : formData?.facility_rt_no
                      ? `RT ${
                          isSameAddress
                            ? formData?.rt_no
                            : formData?.facility_rt_no
                        }`
                      : null}{" "}
                    {isSameAddress
                      ? formData?.rw_no
                      : formData?.facility_rw_no
                      ? `RW ${
                          isSameAddress
                            ? formData?.rw_no
                            : formData?.facility_rw_no
                        }`
                      : null}
                    {", "}
                    {isSameAddress
                      ? formData?.sub_district_name
                      : formData?.facility_sub_district_name}
                    {", "}{" "}
                    {isSameAddress
                      ? formData?.village_name
                      : formData?.facility_village_name}
                    {", "}{" "}
                    {isSameAddress
                      ? formData?.city_name
                      : formData?.facility_city_name}
                    {", "}{" "}
                    {isSameAddress
                      ? formData?.province_name
                      : formData?.facility_province_name}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 w-full h-1 mt-8"></div>

            <div className="flex items-center gap-2 mt-6 text-[12px] lg:text-[14px]">
              <input
                className="accent-green-500 w-4 h-4"
                id="agreement"
                type="checkbox"
                onChange={onCheckAgreement}
              />

              <label htmlFor="agreement" className="cursor-pointer">
                Dengan melanjutkan, Anda menyetujui Pernyataan Privasi dan
                Ketentuan Layanan Memos. Setelah data Anda diterima, tim kami
                akan meninjaunya, dan Anda akan menerima email verifikasi
                segera.
              </label>
            </div>

            <div className="flex flex-col-reverse lg:flex-row  justify-between gap-4 mt-4">
              <Button
                isClinix={product === "clinix"}
                onClick={onClickToEdit}
                isPrimary={false}
                title="Edit Data"
                className="w-full text-base"
              />
              <Button
                isClinix={product === "clinix"}
                isDisabled={!isChecked}
                isPrimary
                onClick={onFinishRegistration}
                title="Kirim Permintaan Berlangganan"
                className="w-full text-base"
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
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        Preview
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
