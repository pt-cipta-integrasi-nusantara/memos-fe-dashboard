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

interface SummaryFinishRegistrationContentProps {
  t: TFunction<"common", undefined>;
}

export function SummaryFinishRegistrationContent({
  t,
}: SummaryFinishRegistrationContentProps) {
  const router = useRouter();
  const onClickToHome = () => {
    router.push("/");
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
              <Image
                src="/assets/icons/registration-finish-2.svg"
                width={250}
                height={200}
                alt="finish"
                className="mx-auto"
              />
              <h2 className="font-bold text-[18px] lg:text-[30px]">
                Pendaftaran Berhasil
              </h2>
              <h3 className="mt-2 text-[14px] lg:text-base max-w-[80%] text-center mx-auto">
                Tim manajemen di tempat Anda bekerja akan meninjau profil Anda
                sebelum Anda dapat mengakses workspace.{" "}
              </h3>
            </div>

            <div className="mt-8 text-[14px]">
              <span className="block">Langkah Selanjutnya</span>
              <span className="block mt-2">
                Tim kami, akan memverifikasi permintaan Anda. Tunggu email
                konfirmasi dalam 15 menit – 2 jam. Jika belum diterima, cek spam
                atau hubungi kami di 08979075890
              </span>
            </div>

            <div className="mt-8 flex flex-col-reverse lg:flex-row  justify-between gap-4 mt-4">
              <Button
                onClick={onClickToHome}
                isPrimary
                title="Ke Halaman Utama"
                className="w-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
