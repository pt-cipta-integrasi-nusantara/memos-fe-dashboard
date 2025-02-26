import { Dialog, Listbox, Transition } from "@headlessui/react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { TFunction } from "i18next";
import Image from "next/image";
import { Button, Card } from "../../../Ui";
import { useRegistrationFormStore } from "../../../../stores/useRegistrationFormStore";
import { useRegister } from "../../../../services/auth/use-registration";
import toast from "react-hot-toast";
import * as sessionService from "../../../../utils/session";

interface SummaryContentProps {
  t: TFunction<"common", undefined>;
}

export function SummaryContent({ t }: SummaryContentProps) {
  const router = useRouter();
  const { formData } = useRegistrationFormStore();
  const { mutate: registerAccount } = useRegister();
  const [isChecked, setIsChecked] = React.useState(false);

  const onCheckAgreement = () => {
    setIsChecked((prev) => !prev);
  };

  const onClickToEdit = () => {
    router.push("/registration/step/2");
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
      },
    };
    registerAccount(payload, {
      onSuccess: () => {
        sessionService.flushSession();
        router.push("/registration/summary/finish");
      },
      onError: (error: any) => {
        const reason = error?.message
          ? error?.message?.split("~")[0]
          : "Terjadi error, silakan coba lagi";
        toast.error(reason);
      },
    });
  };

  return (
    <div
      id="summary"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[80rem] mx-auto")}
    >
      <div className="lg:mx-36">
        <div>
          <Card>
            <div className="text-center">
              <h2 className="font-bold text-[18px] lg:text-[30px]">
                Ringkasan Pendaftaran
              </h2>
              <h3 className="mt-2 text-[14px] lg:text-base">
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
                  <span className="underline text-link">
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
                  <span>
                    {formData?.street_address} {formData?.detail_note} RT
                    {formData?.rt_no} RW{formData?.rw_no}
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
                  <span>{formData?.smf_id}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>No. STR Aktif</span>
                  <span>{formData?.str_no}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Unggah STR</span>
                  <span className="underline text-link">
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
                  <span className="underline text-link">
                    {formData?.facility_photo_name}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Alamat</span>
                  <span>
                    {formData?.street_address} {formData?.detail_note} RT
                    {formData?.rt_no} RW{formData?.rw_no}
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
                onClick={onClickToEdit}
                isClinix
                isPrimary={false}
                title="Edit Data"
                className="w-full"
              />
              <Button
                isDisabled={!isChecked}
                isClinix
                isPrimary
                onClick={onFinishRegistration}
                title="Kirim Permintaan Berlangganan"
                className="w-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
