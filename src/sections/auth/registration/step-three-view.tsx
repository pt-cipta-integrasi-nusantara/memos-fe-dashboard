import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import {
  BASE_URL_STORAGE,
  businesses,
  profesions,
  spesialisData,
} from "../../../components/constants/constants";
import { uploadImage } from "../../../services/utils/uploadImage";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../components/ui";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "../../../components/icons";
import { useNavigate } from "react-router-dom";
import { useRegistrationFormStore } from "../../../stores/useRegistrationFormStore";

interface SelectProps {
  label: string;
  id: string;
}
interface ProfesionProps {
  label: string;
  id: number;
}
export function ProfesionForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRegistrationFormStore();
  const { register, handleSubmit } = useForm<any>();
  const form = useRef(null) as any;
  const [selectedProfesion, setSelectedProfesion] = useState<ProfesionProps>();
  const [selectedSpesialis, setSelectedSpesialis] = useState<ProfesionProps>();
  const [selectedBusiness, setSelectedBusiness] = useState<SelectProps>();

  useEffect(() => {
    setSelectedProfesion(
      profesions?.find((item) => item?.id === formData["profession_id"])
    );
    setSelectedSpesialis(
      spesialisData?.find((item) => item?.id === formData["smf_id"])
    );
    setSelectedBusiness(
      businesses?.find((item) => item?.id === formData["facility_type"])
    );
  }, []);

  const onNextStep = () => {
    navigate("/registration/summary");
  };

  const onPreviousStep = () => {
    navigate("/registration/step/2");
  };

  const handleSTRNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const imageData = new FormData();
      imageData.append("file", file as unknown as File);
      uploadImage(imageData).then((res) => {
        setFormData({
          str_photo: `${BASE_URL_STORAGE}${res}`,
        });
      });
      setFormData({
        str_photo_name: file?.name,
      });
    }
  };

  const handleFileFotoUsahaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const imageData = new FormData();
      imageData.append("file", file as unknown as File);
      uploadImage(imageData).then((res) => {
        setFormData({
          facility_photo: `${BASE_URL_STORAGE}${res}`,
        });
      });

      setFormData({
        facility_photo_name: file?.name,
      });
    }
  };

  const onSubmit: SubmitHandler<any> = async () => {
    // TODO SUBMIT HANDLER
  };

  console.log(formData, "formdata");

  return (
    <div
      id="terms-condition"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[1200rem] mx-auto")}
    >
      <div className="lg:mx-36">
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <div className="flex items-center gap-4 mb-2">
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
                <h1 className="text-[24px] font-bold">Identitas Profesi</h1>
                <span className="text-[14px] text-neutral-300">
                  Langkah 3 dari 3
                </span>
              </div>
              {/* Heading */}
            </div>
            <div className="border border-t border-neutral-200 w-full mt-2" />
            <div className="flex flex-col gap-8 mt-6">
              {/* Top fields */}
              <div className="flex flex-col gap-4">
                {/* Row 1 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-medium" htmlFor="gender">
                      Profesi/Jabatan
                      <span className="text-warning">*</span>
                    </label>

                    <Listbox
                      value={selectedProfesion}
                      onChange={setSelectedProfesion}
                    >
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedProfesion ? (
                              selectedProfesion?.label
                            ) : (
                              <span className="text-neutral-400">
                                Pilih Profesi/Jabatan
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
                            {profesions.map((profesion, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  setFormData({ profession_id: profesion?.id });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={profesion}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {profesion?.label}
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
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-medium" htmlFor="gender">
                      SMF
                      <span className="text-warning">*</span>
                    </label>

                    <Listbox
                      value={selectedSpesialis}
                      onChange={setSelectedSpesialis}
                    >
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedSpesialis ? (
                              selectedSpesialis?.label
                            ) : (
                              <span className="text-neutral-400">
                                Pilih Spesialis
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
                            {spesialisData.map((spesialis, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  setFormData({ smf_id: spesialis?.id });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={spesialis}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {spesialis?.label}
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
                </div>

                {/* Row 2 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-2 lg:w-full">
                    <label className="text-[14px] font-medium" htmlFor="str_no">
                      No. STR Aktif
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="str_no"
                      {...register("str_no", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan No. STR"
                      onChange={(e) => setFormData({ str_no: e.target.value })}
                      defaultValue={formData["str_no"]}
                    />

                    <span className="text-[13px] text-neutral-300">
                      Digunakan hanya untuk keperluan verifikasi
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2 lg:w-full">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        className="text-[14px] font-medium"
                        htmlFor="expires_date"
                      >
                        Tanggal Habis Berlaku
                        <span className="text-warning">*</span>
                      </label>

                      <input
                        id="expires_date"
                        {...register("expires_date", { required: true })}
                        type="date"
                        className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                        placeholder="Tanggal Habis Berlaku"
                        onChange={(e) =>
                          setFormData({ expires_date: e.target.value })
                        }
                        defaultValue={formData["expires_date"]}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label
                        className="text-[14px] font-medium"
                        htmlFor="no_str_file"
                      >
                        Unggah STR Aktif
                        <span className="text-warning">*</span>
                      </label>

                      <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                        <div
                          className={`w-full ${
                            formData?.str_photo_name
                              ? "text-black"
                              : "text-neutral-400"
                          }`}
                        >
                          {formData?.str_photo_name ?? "Unggah No. STR"}
                        </div>
                        <input
                          type="file"
                          hidden
                          id="no_str_file"
                          onChange={handleSTRNoChange}
                        />
                        <label
                          htmlFor="no_str_file"
                          className="text-link cursor-pointer"
                        >
                          Unggah
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-dashed border-neutral-400 w-full h-1"></div>

              {/* Bottom fields */}

              {/* Row 4 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex flex-col gap-2 lg:w-full">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="facility_organization_name"
                  >
                    Organisasi
                    <span className="text-warning">*</span>
                  </label>
                  <input
                    id="facility_organization_name"
                    {...register("facility_organization_name", {
                      required: true,
                    })}
                    type="text"
                    className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                    placeholder="Masukkan nama organisasi"
                    onChange={(e) =>
                      setFormData({
                        facility_organization_name: e.target.value,
                      })
                    }
                    defaultValue={formData["facility_organization_name"]}
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="facility_name"
                  >
                    Nama Klinik/Usaha
                    <span className="text-warning">*</span>
                  </label>
                  <input
                    id="facility_name"
                    {...register("facility_name", { required: true })}
                    type="text"
                    className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                    placeholder="Masukkan nama klinik/usaha"
                    onChange={(e) =>
                      setFormData({ facility_name: e.target.value })
                    }
                    defaultValue={formData["facility_name"]}
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex flex-col gap-2 lg:w-full">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="organization"
                  >
                    Jenis Usaha
                    <span className="text-warning">*</span>
                  </label>

                  <Listbox
                    value={selectedBusiness}
                    onChange={setSelectedBusiness}
                  >
                    <div className="relative">
                      <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                        <span className="block truncate">
                          {selectedBusiness ? (
                            selectedBusiness?.label
                          ) : (
                            <span className="text-neutral-400">
                              Pilih Jenis Usaha
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
                          {businesses.map((business, idx) => (
                            <Listbox.Option
                              onClick={() => {
                                setFormData({ facility_type: business?.id });
                              }}
                              key={idx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? "bg-green-100" : ""
                                }`
                              }
                              value={business}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {business?.label}
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
                <div className="w-full flex flex-col gap-2">
                  <label
                    className="text-[14px] font-medium"
                    htmlFor="no_str_file"
                  >
                    Unggah Foto Tempat Klinik/Usaha (Opsional)
                  </label>

                  <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                    <div
                      className={`w-full ${
                        formData?.facility_photo_name
                          ? "text-black"
                          : "text-neutral-400"
                      }`}
                    >
                      {formData?.facility_photo_name ??
                        "Unggah Foto Tempat Praktek"}
                    </div>
                    <input
                      type="file"
                      hidden
                      id="foto_usaha"
                      onChange={handleFileFotoUsahaChange}
                    />
                    <label
                      htmlFor="foto_usaha"
                      className="text-link cursor-pointer"
                    >
                      Unggah
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  className="accent-green-500 w-4 h-4"
                  id="same_address"
                  type="checkbox"
                />

                <label htmlFor="same_address" className="cursor-pointer">
                  Alamat sama dengan alamat pribadi
                </label>
              </div>
            </div>
          </Card>
          <Card className="mt-8">
            <Button
              onClick={onNextStep}
              isClinix
              isPrimary
              className="w-full"
              title="Simpan"
            />
          </Card>
        </form>
      </div>
    </div>
  );
}
