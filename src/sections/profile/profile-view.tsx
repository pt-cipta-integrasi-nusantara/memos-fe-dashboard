import {
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  ChevronRightColorIcon,
  GearIcon,
  LogoutIcon,
  PlusWhiteIcon,
  ProfileHomeIcon,
  ProfileIcon,
  ProfileMenuIcon,
  WorkIcon,
} from "../../components/iconsComponent";
import { Button } from "../../components/uiComponent";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../utils/auth/providers";
import { useMe } from "../../services/auth/use-me";
import dayjs from "dayjs";

interface AccountContainerProps {
  form: any;
  handleSubmit: UseFormHandleSubmit<any, undefined>;
  onSubmit: SubmitHandler<any>;
  register: UseFormRegister<any>;
}

function ProfileContainer() {
  return (
    <div className="mt-6 text-[14px]">
      <div id="identitas-diri" className="mt-4">
        <div className="flex items-center">
          <span className="font-bold">Identitas Diri</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Nama Lengkap</span>
          <span>Tony Molly</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Jenis Kelamin</span>
          <span>Perempuan</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Status Pernikahan</span>
          <span>M (Married)</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Tinggi & Berat Badan</span>
          <span>175 cm & 65 kg</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Agama</span>
          <span>Islam</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Kewarganegaraan</span>
          <span>Indonesia</span>
        </div>
      </div>

      <div id="kartu-identitas" className="mt-8">
        <div className="flex items-center">
          <span className="font-bold">Kartu Identitas</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">NIK</span>
          <span>140909894843134</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">No KK</span>
          <span>140909894843134</span>
        </div>
      </div>

      <div id="kontak" className="mt-8">
        <div className="flex items-center">
          <span className="font-bold">Kontak</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">No Handphone</span>
          <span>081299878393</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Email</span>
          <span>william.saputra02@gmail.com</span>
        </div>
      </div>

      <div id="bahasa" className="mt-8">
        <div className="flex items-center">
          <span className="font-bold">Bahasa</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Bahasa 1</span>
          <div className="flex items-center gap-2">
            <span>Indonesia</span>
            <div className="bg-[#EFFBF3] rounded-full px-2 py-1 text-[#31B057]">
              Aktif
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Bahasa 2</span>
          <div className="flex items-center gap-2">
            <span>Inggris</span>
            <div className="bg-[#EFFBF3] rounded-full px-2 py-1 text-[#31B057]">
              Aktif
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Bahasa 3</span>
          <div className="flex items-center gap-2">
            <span>Spanyol</span>
            <div className="bg-[#EFFBF3] rounded-full px-2 py-1 text-[#31B057]">
              Aktif
            </div>
          </div>
        </div>
      </div>

      <div id="alamat" className="mt-8">
        <div className="flex items-center">
          <span className="font-bold">Alamat</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Alamat 1</span>
          <span>
            Jl. Surabaya No. 123, RT.08/RW.07, Kel. Kandangan, Kec. Benowo, Kota
            Surabaya 60182 Indonesia.
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Alamat 1</span>
          <span>
            Jl. Surabaya No. 123, RT.08/RW.07, Kel. Kandangan, Kec. Benowo, Kota
            Surabaya 60182 Indonesia.
          </span>
        </div>
      </div>

      <div id="alamat" className="mt-8">
        <div className="flex items-center">
          <span className="font-bold">Legalitas</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Tanda Tangan</span>
          <div>
            <span className="underline text-link">tonymollyttd.png</span>
            <span className="italic text-neutral-300 ml-3">
              terakhir diperbarui: 09 Mei 2024 | 09:00 WIB
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center mt-4">
          <span className="w-[15%]">Nama Terang</span>
          <span>Dr. Tony Molly</span>
        </div>
      </div>

      <Button
        className="flex-none w-40 mt-8 h-0"
        isPrimary
        title="Edit Profil"
        icon={<PlusWhiteIcon />}
      />
    </div>
  );
}

function AccountContainer({
  form,
  handleSubmit,
  onSubmit,
  register,
}: AccountContainerProps) {
  return (
    <div id="akun">
      <span>Foto Profil {"(Optional)"}</span>

      <img
        className="mt-4"
        src="/assets/images/dummy-ava-2.png"
        width={56}
        height={56}
        alt="ava"
      />
      <span className="block mt-4">No. Memos: 48188</span>
      <form className="mt-8" ref={form} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <label className="text-[14px] font-medium" htmlFor="username">
              Username
              <span className="text-warning">*</span>
            </label>
            <input
              id="username"
              {...register("username", { required: true })}
              type="text"
              className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
              placeholder="Masukkan Username"
              defaultValue="Dr. Tony Molly"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-[14px] font-medium" htmlFor="username">
              Email
              <span className="text-warning">*</span>
            </label>
            <input
              id="email"
              {...register("email", { required: true })}
              type="email"
              className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
              placeholder="Masukkan Email"
              defaultValue="tonymolly@gmail.com"
            />
          </div>
          <div onClick={() => {}}>
            <span className="text-primary-500">Ubah Password</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export function ProfileContent() {
  const { logout } = useAuth();
  const { register, handleSubmit } = useForm<any>();
  const { data: me } = useMe();
  const [openedSection, setOpenedSection] = useState("profile");
  const form = useRef(null) as any;

  const onClickMenu = (path: string) => {
    setOpenedSection(path);
  };

  const onSubmit: SubmitHandler<any> = async () => {
    // TODO Submit handler
  };

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div id="profile" className={twMerge("max-w-full mx-auto")}>
      <div className="flex">
        <div className="w-full lg:w-1/4 h-screen border-r border-neutral-250 p-4 lg:p-8 mb-[8rem] md:mb-[6rem]">
          <div className="flex items-center gap-5">
            <ProfileHomeIcon className="w-[16px] h-[16px]" />
            <ChevronRightColorIcon
              className={`"w-[14px] h-[14px] ${
                openedSection === "" ? "text-primary-500" : ""
              }`}
            />
            <span>{me?.account?.full_name}</span>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <img
              src="/assets/images/dummy-ava-2.png"
              width={88}
              height={88}
              alt="ava"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-[24px] font-bold">
                {me?.account?.full_name}
              </h1>
              <span>No. Memos: {me?.account?.memos_id}</span>
              <div className="flex items-center gap-1">
                <div className="bg-[#FFE5ED] rounded-full px-4 py-1 text-[#E40044]">
                  {me?.account?.user?.gender === "1"
                    ? "Laki-laki"
                    : "Perempuan"}
                </div>
                <div className="bg-neutral-200 rounded-full px-4 py-1 text-neutral-300">
                  {dayjs().diff(dayjs(me?.account?.user?.birth_date), "year")}{" "}
                  Tahun
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 mt-6 border-neutral-250 w-full h-1"></div>

          <div className="flex flex-col gap-6 mt-8">
            {/* Akun */}
            <div
              onClick={() => onClickMenu("account")}
              className="flex flex-col gap-2 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ProfileIcon
                    className={`"w-[14px] h-[14px] ${
                      openedSection === "account" ? "text-primary-500" : ""
                    }`}
                  />
                  <span
                    className={`font-bold ${
                      openedSection === "account" ? "text-primary-500" : ""
                    }`}
                  >
                    Akun
                  </span>
                </div>
                <ChevronRightColorIcon
                  className={`w-[12px] h-[12px] ${
                    openedSection === "account" ? "text-primary-500" : ""
                  }`}
                />
              </div>
              <span className="text-neutral-300">
                Kelola informasi utama yang digunakan untuk masuk ke akun Anda
              </span>
            </div>

            {/* Profil */}
            <div
              onClick={() => onClickMenu("my-profile")}
              className="flex flex-col gap-2 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ProfileMenuIcon
                    className={`"w-[14px] h-[14px] ${
                      openedSection === "my-profile" ? "text-primary-500" : ""
                    }`}
                  />
                  <span
                    className={`font-bold ${
                      openedSection === "my-profile" ? "text-primary-500" : ""
                    }`}
                  >
                    Profil
                  </span>
                </div>
                <ChevronRightColorIcon
                  className={`w-[12px] h-[12px] ${
                    openedSection === "my-profile" ? "text-primary-500" : ""
                  }`}
                />
              </div>
              <span className="text-neutral-300">
                Identitas diri, kontak, alamat, bahasa, keluarga, dan kartu
                identitas untuk keperluan verifikasi.
              </span>
            </div>

            {/* Informasi Profesional */}
            <div
              onClick={() => onClickMenu("professional-information")}
              className="flex flex-col gap-2 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <WorkIcon
                    className={`"w-[14px] h-[14px] ${
                      openedSection === "professional-information"
                        ? "text-primary-500"
                        : ""
                    }`}
                  />
                  <span
                    className={`font-bold ${
                      openedSection === "professional-information"
                        ? "text-primary-500"
                        : ""
                    }`}
                  >
                    Informasi Profesional
                  </span>
                </div>
                <ChevronRightColorIcon
                  className={`w-[12px] h-[12px] ${
                    openedSection === "professional-information"
                      ? "text-primary-500"
                      : ""
                  }`}
                />
              </div>
              <span className="text-neutral-300">
                Informasi profesional mencakup latar belakang pekerjaan dan
                pendidikan untuk mendukung koneksi atau layanan
              </span>
            </div>
          </div>
          <div className="border-t-2 mt-6 border-neutral-250 w-full h-1"></div>

          <div
            onClick={() => onClickMenu("settings")}
            className="flex flex-col gap-2 cursor-pointer mt-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GearIcon
                  className={`"w-[14px] h-[14px] ${
                    openedSection === "settings" ? "text-primary-500" : ""
                  }`}
                />
                <span
                  className={`font-bold ${
                    openedSection === "settings" ? "text-primary-500" : ""
                  }`}
                >
                  Pengaturan
                </span>
              </div>
              <ChevronRightColorIcon
                className={`w-[12px] h-[12px] ${
                  openedSection === "settings" ? "text-primary-500" : ""
                }`}
              />
            </div>
          </div>

          <div className="border-t-2 mt-6 border-neutral-250 w-full h-1"></div>

          <div
            onClick={handleLogout}
            className="flex flex-col gap-2 cursor-pointer mt-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LogoutIcon
                  className={`"w-[14px] h-[14px] ${
                    openedSection === "" ? "text-primary-500" : ""
                  }`}
                />
                <span className="font-bold">Keluar</span>
              </div>
              <ChevronRightColorIcon
                className={`w-[12px] h-[12px] ${
                  openedSection === "" ? "text-primary-500" : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-auto flex-auto p-4 lg:p-8">
          {openedSection === "account" && (
            <AccountContainer
              form={form}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
            />
          )}
          {openedSection === "my-profile" && <ProfileContainer />}
        </div>
      </div>
      ={" "}
    </div>
  );
}
