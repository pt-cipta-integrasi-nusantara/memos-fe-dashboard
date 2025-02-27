import { useNavigate } from "react-router-dom";
import { useRegistrationFormStore } from "../../../stores/registration/useRegistrationFormStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { genders } from "../../../components/constants/constants";
import { uploadImage } from "../../../services/utils/uploadImage";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../components/uiComponent";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "../../../components/iconsComponent";

interface SelectProps {
  label: string;
  id: string;
}

export function IdentityForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRegistrationFormStore();
  const { register, handleSubmit } = useForm<any>();
  const form = useRef(null) as any;
  const [selectedGender, setSelectedGender] = useState<SelectProps>();

  // Wilayah
  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [villageList, setVillageList] = useState<any[]>([]);

  // Selected Wilayah
  const [selectedProvince, setSelectedProvince] = useState<
    Omit<SelectProps, "label"> & { name: string }
  >();
  const [selectedCity, setSelectedCity] = useState<
    Omit<SelectProps, "label"> & { name: string; province_id: number }
  >();
  const [selectedDistrict, setSelectedDistrict] = useState<
    Omit<SelectProps, "label"> & { name: string; city_id: number }
  >();
  const [selectedVillage, setSelectedVillage] = useState<
    Omit<SelectProps, "label"> & { name: string; district_id: number }
  >();

  const [isHidePassword, setIsHidePassword] = useState(true);

  useEffect(() => {
    setSelectedGender(genders?.find((item) => item?.id === formData["gender"]));
    setSelectedProvince(
      provinceList?.find((item: any) => item?.id === formData["province"])
    );
    setSelectedCity(
      cityList?.find((item: any) => item?.id === formData["city"])
    );
    setSelectedDistrict(
      districtList?.find((item: any) => item?.id === formData["sub_district"])
    );
    setSelectedVillage(
      villageList?.find((item: any) => item?.id === formData["village"])
    );
  });

  const getProvinces = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
    )
      .then((response) => response.json())
      .then((provinces) => setProvinceList(provinces));
  };

  const getCities = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince?.id}.json`
    )
      .then((response) => response.json())
      .then((regencies) => setCityList(regencies));
  };

  const getDistricts = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCity?.id}.json`
    )
      .then((response) => response.json())
      .then((districts) => setDistrictList(districts));
  };

  const getVillages = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict?.id}.json`
    )
      .then((response) => response.json())
      .then((villages) => setVillageList(villages));
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getCities();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      getDistricts();
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      getVillages();
    }
  }, [selectedDistrict]);

  const onNextStep = () => {
    navigate("/registration/step/3");
  };

  const onPreviousStep = () => {
    navigate("/registration/step/1");
  };

  const handleFotoKtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const imageData = new FormData();
      imageData.append("file", file as unknown as File);
      uploadImage(imageData).then((res) => {
        const { file_url } = res;
        setFormData({
          identity_photo: file_url,
        });
      });
      setFormData({
        identity_photo_name: file?.name,
      });
    }
  };

  const onSubmit: SubmitHandler<any> = async () => {
    // TODO Submit handler
  };

  // useEffect(() => {
  //   resetFormData();
  // }, []);

  console.log(formData, "formData");

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
                <h1 className="text-[24px] font-bold">Identitas Diri</h1>
                <span className="text-[14px] text-neutral-300">
                  Langkah 2 dari 3
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
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="identity_number"
                    >
                      NIK
                      <span className="text-warning">*</span>
                    </label>
                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                      <input
                        id="identity_number"
                        {...register("identity_number", { required: true })}
                        type="text"
                        className="focus:outline-none w-full"
                        placeholder="Masukkan NIK"
                        onChange={(e) =>
                          setFormData({ identity_number: e.target.value })
                        }
                        defaultValue={formData["identity_number"]}
                      />
                      <div className="text-link cursor-pointer">Verifikasi</div>
                    </div>
                    <span className="text-[13px] text-neutral-300">
                      Digunakan hanya untuk keperluan verifikasi
                    </span>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="unggah_foto_ktp"
                    >
                      Unggah Foto KTP
                      <span className="text-warning">*</span>
                    </label>
                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                      <input
                        {...register("unggah_foto_ktp", { required: true })}
                        type="text"
                        className="focus:outline-none w-full"
                        placeholder="Unggah Foto KTP"
                        value={formData?.identity_photo_name}
                        readOnly
                      />
                      {/* {fotoKtp?.name} */}
                      <input
                        type="file"
                        hidden
                        id="unggah_foto_ktp"
                        onChange={handleFotoKtpChange}
                      />
                      <label
                        htmlFor="unggah_foto_ktp"
                        className="text-link cursor-pointer"
                      >
                        Unggah
                      </label>
                    </div>
                    <span className="text-[13px] text-neutral-300">
                      Digunakan hanya untuk keperluan verifikasi
                    </span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="full_name"
                    >
                      Nama Lengkap
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="full_name"
                      {...register("full_name", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan Nama Lengkap"
                      onChange={(e) =>
                        setFormData({ full_name: e.target.value })
                      }
                      defaultValue={formData["full_name"]}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-medium" htmlFor="gender">
                      Jenis Kelamin
                      <span className="text-warning">*</span>
                    </label>

                    <Listbox
                      value={selectedGender}
                      onChange={setSelectedGender}
                    >
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedGender ? (
                              selectedGender?.label
                            ) : (
                              <span className="text-neutral-400">
                                Pilih Jenis Kelamin
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
                            {genders.map((gender, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  setFormData({ gender: gender?.id });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={gender}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {gender?.label}
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

                {/* Row 3 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="birth_place"
                    >
                      Tempat Lahir
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="birth_place"
                      {...register("birth_place", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan Tempat Lahir"
                      onChange={(e) =>
                        setFormData({ birth_place: e.target.value })
                      }
                      defaultValue={formData["birth_place"]}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="birth_date"
                    >
                      Tanggal Lahir
                      <span className="text-warning">*</span>
                    </label>

                    <input
                      id="birth_date"
                      {...register("birth_date", { required: true })}
                      type="date"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan Tanggal Lahir"
                      onChange={(e) =>
                        setFormData({ birth_date: e.target.value })
                      }
                      defaultValue={formData["birth_date"]}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="phone_number"
                    >
                      No. HP
                      <span className="text-warning">*</span>
                    </label>
                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                      <span>+62</span>
                      <input
                        id="phone_number"
                        {...register("phone_number", { required: true })}
                        type="text"
                        className="focus:outline-none"
                        placeholder="Masukkan No. HP"
                        onChange={(e) =>
                          setFormData({ phone_number: e.target.value })
                        }
                        defaultValue={formData["phone_number"]}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="password"
                    >
                      Kata Sandi
                      <span className="text-warning">*</span>
                    </label>

                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center justify-between gap-2">
                      <input
                        id="password"
                        {...register("password", { required: true })}
                        type={isHidePassword ? "password" : "text"}
                        className="focus:outline-none"
                        placeholder="Masukkan Kata Sandi"
                        onChange={(e) =>
                          setFormData({ password: e.target.value })
                        }
                        defaultValue={formData["password"]}
                      />

                      <img
                        onClick={() => setIsHidePassword(!isHidePassword)}
                        src="/assets/icons/eye.svg"
                        alt="showhidepassword"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-dashed border-neutral-400 w-full h-1"></div>

              {/* Bottom fields */}
              <div className="flex flex-col gap-4">
                {/* Row 5 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="province"
                    >
                      Provinsi <span className="text-warning">*</span>
                    </label>

                    <Listbox
                      value={selectedProvince}
                      onChange={setSelectedProvince}
                    >
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedProvince ? (
                              selectedProvince?.name
                            ) : (
                              <span className="text-neutral-400">
                                Masukkan Provinsi
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
                            {provinceList.map((province, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  setFormData({ province: province?.id });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={province}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {province?.name}
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
                    <label className="text-[14px] font-medium" htmlFor="city">
                      Kota/Kabupaten <span className="text-warning">*</span>
                    </label>

                    <Listbox value={selectedCity} onChange={setSelectedCity}>
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedCity ? (
                              selectedCity?.name
                            ) : (
                              <span className="text-neutral-400">
                                Masukkan Kota/Kabupaten
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
                            {cityList.map((city, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  setFormData({ city: city?.id });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={city}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {city?.name}
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

                {/* Row 6 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="district"
                    >
                      Kecamatan <span className="text-warning">*</span>
                    </label>

                    <Listbox
                      value={selectedDistrict}
                      onChange={setSelectedDistrict}
                    >
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedDistrict ? (
                              selectedDistrict?.name
                            ) : (
                              <span className="text-neutral-400">
                                Masukkan Kecamatan
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
                            {districtList.map((sub_district, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  setFormData({
                                    sub_district: sub_district?.id,
                                  });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={sub_district}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {sub_district?.name}
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
                      htmlFor="village"
                    >
                      Kelurahan <span className="text-warning">*</span>
                    </label>

                    <Listbox
                      value={selectedVillage}
                      onChange={setSelectedVillage}
                    >
                      <div className="relative">
                        <Listbox.Button className="border border-neutral-100 relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none">
                          <span className="block truncate">
                            {selectedVillage ? (
                              selectedVillage?.name
                            ) : (
                              <span className="text-neutral-400">
                                Masukkan Kelurahan
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
                            {villageList.map((village, idx) => (
                              <Listbox.Option
                                onClick={() => {
                                  setFormData({ village: village?.id });
                                }}
                                key={idx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? "bg-green-100" : ""
                                  }`
                                }
                                value={village}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {village?.name}
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

                {/* Row 7 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="street_address"
                    >
                      Alamat
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="street_address"
                      {...register("street_address", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan Alamat"
                      onChange={(e) =>
                        setFormData({ street_address: e.target.value })
                      }
                      defaultValue={formData["street_address"]}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2 lg:w-full">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        className="text-[14px] font-medium"
                        htmlFor="detail_note"
                      >
                        Detail Alamat (Optional){" "}
                      </label>
                      <input
                        id="detail_note"
                        {...register("detail_note", { required: true })}
                        type="text"
                        className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                        placeholder="Detail Alamat, No. Lantai"
                        onChange={(e) =>
                          setFormData({ detail_note: e.target.value })
                        }
                        defaultValue={formData["detail_note"]}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label
                        className="text-[14px] font-medium"
                        htmlFor="house_no"
                      >
                        No. Rumah (Optional){" "}
                      </label>
                      <input
                        id="house_no"
                        {...register("house_no", { required: true })}
                        type="text"
                        className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                        placeholder="No. Rumah"
                        onChange={(e) =>
                          setFormData({ house_no: e.target.value })
                        }
                        defaultValue={formData["house_no"]}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 8 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-2 lg:w-full">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="postal_code"
                    >
                      Kode Pos
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="postal_code"
                      {...register("postal_code", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Masukkan Kode Pos"
                      onChange={(e) =>
                        setFormData({ postal_code: e.target.value })
                      }
                      defaultValue={formData["postal_code"]}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2 lg:w-full">
                    <div className="w-full flex flex-col gap-2">
                      <label
                        className="text-[14px] font-medium"
                        htmlFor="rt_no"
                      >
                        RT
                      </label>
                      <input
                        id="rt_no"
                        {...register("rt_no", { required: true })}
                        type="text"
                        className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                        placeholder="Masukkan RT"
                        onChange={(e) => setFormData({ rt_no: e.target.value })}
                        defaultValue={formData["rt_no"]}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label
                        className="text-[14px] font-medium"
                        htmlFor="rw_no"
                      >
                        RW
                      </label>
                      <input
                        id="rw_no"
                        {...register("rw_no", { required: true })}
                        type="text"
                        className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                        placeholder="Masukkan RW"
                        onChange={(e) => setFormData({ rw_no: e.target.value })}
                        defaultValue={formData["rw_no"]}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 9 */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-medium" htmlFor="telp">
                      No. Telp
                      <span className="text-warning">*</span>
                    </label>
                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                      <span>021</span>
                      <input
                        id="telp"
                        {...register("telp", { required: true })}
                        type="text"
                        className="focus:outline-none"
                        placeholder="Masukkan No. Telp"
                        onChange={(e) => setFormData({ telp: e.target.value })}
                        defaultValue={formData["telp"]}
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="pinpoint"
                    >
                      Pinpoint (Optional)
                      <span className="text-warning">*</span>
                    </label>
                    <input
                      id="pinpoint"
                      {...register("pinpoint", { required: true })}
                      type="text"
                      className="rounded-[8px] p-4 border border-neutral-100 focus:outline-none"
                      placeholder="Pinpoint"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="mt-8">
            <Button
              onClick={onNextStep}
              isClinix
              isPrimary
              className="w-full"
              title="Selanjutnya"
            />
          </Card>
        </form>
      </div>
    </div>
  );
}
