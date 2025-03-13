import { useNavigate } from "react-router-dom";
import { useRegistrationFormStore } from "../../../stores/registration/useRegistrationFormStore";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { genders } from "../../../components/constants/constants";
import { uploadImage } from "../../../services/utils/uploadImage";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../components/uiComponent";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "../../../components/iconsComponent";
import { SearchBox } from "../../../components/uiComponent/searchBox";
import { useSearchDebounce } from "../../../helpers/hooks";

interface SelectProps {
  label: string;
  id: string;
}

export function IdentityForm() {
  const navigate = useNavigate();
  const { formData, setFormData } = useRegistrationFormStore();
  const { watch, register, handleSubmit, formState, setValue, control } =
    useForm<any>();
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

  const [searchProvinceTerm, setSearchProvinceTerm] = useSearchDebounce();
  const [searchCityTerm, setSearchCityTerm] = useSearchDebounce();
  const [searchDistrictTerm, setSearchDistrictTerm] = useSearchDebounce();
  const [searchVillageTerm, setSearchVillageTerm] = useSearchDebounce();

  const [isHidePassword, setIsHidePassword] = useState(true);

  useEffect(() => {
    if (formData?.gender) {
      setValue(
        "gender",
        genders?.find((item) => item?.id === formData["gender"]),
        { shouldValidate: true }
      );
    }
    if (formData?.province) {
      setValue(
        "province",
        provinceList?.find((item) => item?.id === formData["province"]),
        { shouldValidate: true }
      );
    }

    if (formData?.city) {
      setValue(
        "city",
        cityList?.find((item) => item?.id === formData["city"]),
        { shouldValidate: true }
      );
    }
    if (formData?.sub_district) {
      setValue(
        "sub_district",
        districtList?.find((item) => item?.id === formData["sub_district"]),
        { shouldValidate: true }
      );
    }
    if (formData?.village) {
      setValue(
        "village",
        villageList?.find((item) => item?.id === formData["village"]),
        { shouldValidate: true }
      );
    }
  }, []);

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

  useEffect(() => {
    if (provinceList?.length > 0 && formData?.province) {
      setValue(
        "province",
        provinceList?.find((item) => item?.id === formData["province"]),
        { shouldValidate: true }
      );
    }
  }, [provinceList]);

  useEffect(() => {
    if (cityList?.length > 0 && formData?.city) {
      setValue(
        "city",
        cityList?.find((item) => item?.id === formData["city"]),
        { shouldValidate: true }
      );
    }
  }, [cityList]);

  useEffect(() => {
    if (districtList?.length > 0 && formData?.sub_district) {
      setValue(
        "sub_district",
        districtList?.find((item) => item?.id === formData["sub_district"]),
        { shouldValidate: true }
      );
    }
  }, [districtList]);

  useEffect(() => {
    if (villageList?.length > 0 && formData?.village) {
      setValue(
        "village",
        villageList?.find((item) => item?.id === formData["village"]),
        { shouldValidate: true }
      );
    }
  }, [villageList]);

  const getProvinces = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
    )
      .then((response) => response.json())
      .then((provinces) => setProvinceList(provinces));
  };

  const getCities = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${
        watch("province")?.id
      }.json`
    )
      .then((response) => response.json())
      .then((regencies) => setCityList(regencies));
  };

  const getDistricts = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${
        watch("city")?.id
      }.json`
    )
      .then((response) => response.json())
      .then((districts) => setDistrictList(districts));
  };

  const getVillages = async () => {
    await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${
        watch("sub_district")?.id
      }.json`
    )
      .then((response) => response.json())
      .then((villages) => setVillageList(villages));
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (watch("province") || selectedProvince) {
      getCities();
    }
  }, [watch("province"), selectedProvince]);

  useEffect(() => {
    if (watch("city") || selectedCity) {
      getDistricts();
    }
  }, [watch("city"), selectedCity]);

  useEffect(() => {
    if (watch("sub_district") || selectedDistrict) {
      getVillages();
    }
  }, [watch("sub_district"), selectedDistrict]);

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
      setValue("identity_photo", file?.name, { shouldValidate: true });
      setFormData({
        identity_photo_name: file?.name,
      });
    }
  };

  const onSearchProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchProvinceTerm(value);
  };

  const onSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCityTerm(value);
  };

  const onSearchDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchDistrictTerm(value);
  };

  const onSearchVillage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchVillageTerm(value);
  };

  const onSubmit: SubmitHandler<any> = async () => {
    if (Object.keys(formState?.errors).length === 0) {
      navigate("/registration/step/3");
    }
  };

  console.log(formState.errors, "formstate");

  useEffect(() => {
    // resetFormData();
  }, []);

  console.log(watch(), "form value");
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
                    <div
                      className={`relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 ${
                        formState.errors?.identity_number
                          ? "border-primary-500"
                          : "border-neutral0100"
                      }`}
                    >
                      <input
                        id="identity_number"
                        {...register("identity_number", {
                          required: {
                            value: true,
                            message: "NIK wajib diisi",
                          },
                          minLength: {
                            value: 16,
                            message: "NIK harus berisi 16 karakter",
                          },
                          maxLength: {
                            value: 16,
                            message: "NIK harus berisi 16 karakter",
                          },
                        })}
                        type="number"
                        onChange={(e) => {
                          setValue("identity_number", e.target.value, {
                            shouldValidate: true,
                          });
                          setFormData({ identity_number: e.target.value });
                        }}
                        min={0}
                        className="focus:outline-none w-full"
                        placeholder="Masukkan NIK"
                        defaultValue={formData["identity_number"]}
                      />
                    </div>
                    {formState?.errors?.identity_number && (
                      <span className="text-primary-500">
                        {formState?.errors?.identity_number?.message as any}
                      </span>
                    )}
                    <span className="text-[13px] text-neutral-300">
                      Digunakan hanya untuk keperluan verifikasi
                    </span>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="identity_photo"
                    >
                      Unggah Foto KTP
                      <span className="text-warning">*</span>
                    </label>
                    <div
                      className={`relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 ${
                        formState.errors?.identity_photo
                          ? "border-primary-500"
                          : "border-neutral-100"
                      }`}
                    >
                      <input
                        {...register("identity_photo", {
                          required: {
                            value: true,
                            message: "Foto wajib diisi",
                          },
                        })}
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
                        id="identity_photo"
                        onChange={handleFotoKtpChange}
                      />
                      <label
                        htmlFor="identity_photo"
                        className="text-link cursor-pointer"
                      >
                        Unggah
                      </label>
                    </div>

                    {formState?.errors?.identity_photo && (
                      <span className="text-primary-500">
                        {formState?.errors?.identity_photo?.message as any}
                      </span>
                    )}
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
                      {...register("full_name", {
                        required: {
                          value: true,
                          message: "Nama lengkap wajib diisi",
                        },
                      })}
                      type="text"
                      className={`rounded-[8px] p-4 border focus:outline-none ${
                        formState?.errors?.full_name
                          ? "border-primary-500"
                          : "border-neutral-100"
                      }`}
                      placeholder="Masukkan Nama Lengkap"
                      onChange={(e) => {
                        setValue("full_name", e.target.value, {
                          shouldValidate: true,
                        });
                        setFormData({ full_name: e.target.value });
                      }}
                      defaultValue={formData["full_name"]}
                    />

                    {formState?.errors?.full_name && (
                      <span className="text-primary-500">
                        {formState?.errors?.full_name?.message as any}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-medium" htmlFor="gender">
                      Jenis Kelamin
                      <span className="text-warning">*</span>
                    </label>

                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={selectedGender}
                      rules={{
                        required: {
                          value: true,
                          message: "Jenis kelamin wajib diisi",
                        },
                      }}
                      render={({ field }) => (
                        <Listbox
                          value={field.value}
                          onChange={(val) => {
                            setFormData({ gender: val?.id });
                            setValue("gender", val, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <div className="relative">
                            <Listbox.Button
                              className={`border relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none ${
                                formState?.errors?.gender
                                  ? "border-primary-500"
                                  : "border-neutral-100"
                              }`}
                            >
                              <span className="block truncate">
                                {field.value ? (
                                  field.value.label
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
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
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
                      )}
                    />

                    {formState?.errors?.gender && (
                      <span className="text-primary-500">
                        {formState?.errors?.gender?.message as any}
                      </span>
                    )}
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
                      {...register("birth_place", {
                        required: {
                          value: true,
                          message: "Tempat lahir wajib diisi",
                        },
                      })}
                      type="text"
                      className={`rounded-[8px] p-4 border focus:outline-none ${
                        formState?.errors?.birth_place
                          ? "border-primary-500"
                          : "border-neutral-100"
                      }`}
                      placeholder="Masukkan Tempat Lahir"
                      onChange={(e) => {
                        setValue("birth_place", e.target.value, {
                          shouldValidate: true,
                        });
                        setFormData({ birth_place: e.target.value });
                      }}
                      defaultValue={formData["birth_place"]}
                    />

                    {formState?.errors?.birth_place && (
                      <span className="text-primary-500">
                        {formState?.errors?.birth_place?.message as any}
                      </span>
                    )}
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
                      {...register("birth_date", {
                        required: {
                          value: true,
                          message: "Tanggal lahir wajib diisi",
                        },
                      })}
                      type="date"
                      className={`rounded-[8px] p-4 border focus:outline-none ${
                        formState?.errors?.birth_date
                          ? "border-primary-500"
                          : "border-neutral-100"
                      }`}
                      placeholder="Masukkan Tanggal Lahir"
                      onChange={(e) => {
                        setValue("birth_date", e.target.value, {
                          shouldValidate: true,
                        });
                        setFormData({ birth_date: e.target.value });
                      }}
                      defaultValue={formData["birth_date"]}
                    />
                    {formState?.errors?.birth_date && (
                      <span className="text-primary-500">
                        {formState?.errors?.birth_date?.message as any}
                      </span>
                    )}
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
                    </label>
                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                      <span>+62</span>
                      <input
                        id="phone_number"
                        {...register("phone_number", {
                          pattern: {
                            value: /^8\d{10,14}$/,
                            message: "Pastikan format Nomor HP sesuai",
                          },
                        })}
                        type="number"
                        className="focus:outline-none w-full"
                        placeholder="Contoh : +62 8123456789"
                        min={0}
                        onChange={(e) => {
                          setValue("phone_number", e.target.value, {
                            shouldValidate: true,
                          });
                          setFormData({ phone_number: e.target.value });
                        }}
                        defaultValue={formData["phone_number"]}
                      />
                    </div>
                    {formState?.errors?.phone_number && (
                      <span className="text-primary-500">
                        {formState?.errors?.phone_number?.message as any}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="password"
                    >
                      Kata Sandi
                      <span className="text-warning">*</span>
                    </label>

                    <div
                      className={`relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2 ${
                        formState.errors?.password
                          ? "border-primary-500"
                          : "border-neutral0100"
                      }`}
                    >
                      <input
                        id="password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Kata sandi wajib diisi",
                          },
                          pattern: {
                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                            message:
                              "Password harus berisi huruf besar, huruf kecil, angka, dan minimal 8 karakter",
                          },
                        })}
                        type={isHidePassword ? "password" : "text"}
                        className="focus:outline-none w-full"
                        placeholder="Masukkan Kata Sandi"
                        onChange={(e) => {
                          setValue("password", e.target.value, {
                            shouldValidate: true,
                          });
                          setFormData({ password: e.target.value });
                        }}
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

                    {formState?.errors?.password && (
                      <span className="text-primary-500">
                        {formState?.errors?.password?.message as any}
                      </span>
                    )}
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

                    <Controller
                      name="province"
                      control={control}
                      defaultValue={selectedProvince}
                      rules={{
                        required: {
                          value: true,
                          message: "Provinsi wajib diisi",
                        },
                      }}
                      render={({ field }) => (
                        <Listbox
                          value={field.value}
                          onChange={(val) => {
                            setFormData({ province: val?.id });
                            setValue("province", val, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <div className="relative">
                            <Listbox.Button
                              className={`border relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none ${
                                formState?.errors?.province
                                  ? "border-primary-500"
                                  : "border-neutral-100"
                              }`}
                            >
                              {" "}
                              <span className="block truncate">
                                {field.value ? (
                                  field.value.name
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
                                <div className="px-8 my-2">
                                  <SearchBox onSearch={onSearchProvince} />
                                </div>
                                {provinceList
                                  ?.filter((item) =>
                                    item?.name
                                      .toLowerCase()
                                      .includes(
                                        searchProvinceTerm.toLowerCase()
                                      )
                                  )
                                  ?.map((province, idx) => (
                                    <Listbox.Option
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
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
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
                      )}
                    />

                    {formState?.errors?.province && (
                      <span className="text-primary-500">
                        {formState?.errors?.province?.message as any}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-medium" htmlFor="city">
                      Kota/Kabupaten <span className="text-warning">*</span>
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      defaultValue={selectedCity}
                      rules={{
                        required: {
                          value: true,
                          message: "Kota wajib diisi",
                        },
                      }}
                      render={({ field }) => (
                        <Listbox
                          value={field.value}
                          onChange={(val) => {
                            setFormData({ city: val?.id });
                            setValue("city", val, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <div className="relative">
                            <Listbox.Button
                              className={`border relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none ${
                                formState?.errors?.city
                                  ? "border-primary-500"
                                  : "border-neutral-100"
                              }`}
                            >
                              <span className="block truncate">
                                {field.value ? (
                                  field.value.name
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
                                <div className="px-8 my-2">
                                  <SearchBox onSearch={onSearchCity} />
                                </div>
                                {cityList
                                  ?.filter((item) =>
                                    item?.name
                                      .toLowerCase()
                                      .includes(searchCityTerm.toLowerCase())
                                  )
                                  ?.map((city, idx) => (
                                    <Listbox.Option
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
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
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
                      )}
                    />

                    {formState?.errors?.city && (
                      <span className="text-primary-500">
                        {formState?.errors?.city?.message as any}
                      </span>
                    )}
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
                    <Controller
                      name="sub_district"
                      control={control}
                      defaultValue={selectedDistrict}
                      rules={{
                        required: {
                          value: true,
                          message: "Kecamatan wajib diisi",
                        },
                      }}
                      render={({ field }) => (
                        <Listbox
                          value={field.value}
                          onChange={(val) => {
                            setFormData({ sub_district: val?.id });
                            setValue("sub_district", val, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <div className="relative">
                            <Listbox.Button
                              className={`border relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none ${
                                formState?.errors?.sub_district
                                  ? "border-primary-500"
                                  : "border-neutral-100"
                              }`}
                            >
                              <span className="block truncate">
                                {field.value ? (
                                  field.value.name
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
                                <div className="px-8 my-2">
                                  <SearchBox onSearch={onSearchDistrict} />
                                </div>
                                {districtList
                                  ?.filter((item) =>
                                    item?.name
                                      .toLowerCase()
                                      .includes(
                                        searchDistrictTerm.toLowerCase()
                                      )
                                  )
                                  ?.map((sub_district, idx) => (
                                    <Listbox.Option
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
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
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
                      )}
                    />

                    {formState?.errors?.sub_district && (
                      <span className="text-primary-500">
                        {formState?.errors?.sub_district?.message as any}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label
                      className="text-[14px] font-medium"
                      htmlFor="village"
                    >
                      Kelurahan <span className="text-warning">*</span>
                    </label>

                    <Controller
                      name="village"
                      control={control}
                      defaultValue={selectedVillage}
                      rules={{
                        required: {
                          value: true,
                          message: "Kelurahan wajib diisi",
                        },
                      }}
                      render={({ field }) => (
                        <Listbox
                          value={field.value}
                          onChange={(val) => {
                            setFormData({ village: val?.id });
                            setValue("village", val, {
                              shouldValidate: true,
                            });
                          }}
                        >
                          <div className="relative">
                            <Listbox.Button
                              className={`border relative w-full cursor-default rounded-md bg-white py-4 pl-4 pr-10 text-left focus:outline-none ${
                                formState?.errors?.village
                                  ? "border-primary-500"
                                  : "border-neutral-100"
                              }`}
                            >
                              <span className="block truncate">
                                {field.value ? (
                                  field.value.name
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
                                <div className="px-8 my-2">
                                  <SearchBox onSearch={onSearchVillage} />
                                </div>
                                {villageList
                                  ?.filter((item) =>
                                    item?.name
                                      .toLowerCase()
                                      .includes(searchVillageTerm.toLowerCase())
                                  )
                                  ?.map((village, idx) => (
                                    <Listbox.Option
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
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
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
                      )}
                    />

                    {formState?.errors?.village && (
                      <span className="text-primary-500">
                        {formState?.errors?.village?.message as any}
                      </span>
                    )}
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
                      {...register("street_address", {
                        required: {
                          value: true,
                          message: "Alamat wajib diisi",
                        },
                      })}
                      type="text"
                      className={`rounded-[8px] p-4 border focus:outline-none ${
                        formState?.errors?.street_address
                          ? "border-primary-500"
                          : "border-neutral-100"
                      }`}
                      placeholder="Masukkan Alamat"
                      onChange={(e) => {
                        setValue("street_address", e.target.value, {
                          shouldValidate: true,
                        });
                        setFormData({ street_address: e.target.value });
                      }}
                      defaultValue={formData["street_address"]}
                    />

                    {formState?.errors?.street_address && (
                      <span className="text-primary-500">
                        {formState?.errors?.street_address?.message as any}
                      </span>
                    )}
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
                        {...register("detail_note", { required: false })}
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
                        {...register("house_no")}
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
                      {...register("postal_code", {
                        required: {
                          value: true,
                          message: "Kode pos wajib diisi",
                        },
                      })}
                      type="text"
                      className={`rounded-[8px] p-4 border focus:outline-none ${
                        formState?.errors?.postal_code
                          ? "border-primary-500"
                          : "border-neutral-100"
                      }`}
                      placeholder="Masukkan Kode Pos"
                      onChange={(e) => {
                        setValue("postal_code", e.target.value, {
                          shouldValidate: true,
                        });
                        setFormData({ postal_code: e.target.value });
                      }}
                      defaultValue={formData["postal_code"]}
                    />
                    {formState?.errors?.postal_code && (
                      <span className="text-primary-500">
                        {formState?.errors?.postal_code?.message as any}
                      </span>
                    )}
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
                        {...register("rt_no", { required: false })}
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
                        {...register("rw_no", { required: false })}
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
                      {/* <span className="text-warning">*</span> */}
                    </label>
                    <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center gap-2">
                      <span>021</span>
                      <input
                        id="telp"
                        {...register("telp", { required: false })}
                        type="number"
                        min={0}
                        className="focus:outline-none"
                        placeholder="Masukkan No. Telp"
                        onChange={(e) => setFormData({ telp: e.target.value })}
                        defaultValue={formData["telp"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="mt-8">
            <Button
              type="submit"
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
