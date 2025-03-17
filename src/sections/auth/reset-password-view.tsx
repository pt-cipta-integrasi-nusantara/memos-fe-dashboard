import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../components/uiComponent";
import { useRegistrationFormStore } from "../../stores/registration/useRegistrationFormStore";

export function ResetPasswordContent() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const { resetFormData } = useRegistrationFormStore();
  const { register, handleSubmit, setValue, watch, formState } = useForm<any>();
  const form = useRef(null) as any;

  useEffect(() => {
    resetFormData();
  }, []);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      setIsSuccess(true);
    } catch (error: any) {}
    // TODO: login function
  };

  const onBackToHome = () => {
    navigate("/");
  };

  return (
    <div
      id="reset-password"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[60rem] mx-auto")}
    >
      <div className="lg:mx-36">
        {!isSuccess ? (
          <div>
            <form ref={form} onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <h2 className="font-bold text-[30px]">Atur Ulang Kata Sandi</h2>
                <h3 className="mt-2">Buat kata sandi baru untuk akunmu.</h3>
                <div className="flex flex-col gap-8 mt-6">
                  <div className="flex flex-col gap-4">
                    {/* Row 1 */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="w-full flex flex-col gap-2">
                        <label
                          className="text-[14px] font-medium"
                          htmlFor="name"
                        >
                          Kata Sandi
                        </label>
                        <div
                          className={`relative rounded-[8px] p-4 border ${
                            formState.errors.password
                              ? "border-primary-500"
                              : "border-neutral-100"
                          } flex items-center justify-between gap-2`}
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
                            }}
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

                        <span className="text-[13px] text-neutral-300">
                          Minimal 8 karakter, kombinasi huruf & angka
                        </span>
                        {formState?.errors?.password && (
                          <span className="text-primary-500 text-[13px]">
                            {formState?.errors?.password?.message as any}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Row 2 */}
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="w-full flex flex-col gap-2">
                        <label
                          className="text-[14px] font-medium"
                          htmlFor="confirm_new_password"
                        >
                          Konfirmasi Kata Sandi
                        </label>
                        <div
                          className={`relative rounded-[8px] p-4 border ${
                            formState.errors.confirm_new_password
                              ? "border-primary-500"
                              : "border-neutral-100"
                          } flex items-center justify-between gap-2`}
                        >
                          <input
                            id="confirm_new_password"
                            {...register("confirm_new_password", {
                              required: {
                                value: true,
                                message: "Konfirmasi kata sandi wajib diisi",
                              },
                              validate: (val: string) => {
                                if (watch("password") !== val) {
                                  return "Password tidak cocok";
                                }
                              },
                            })}
                            type={isHidePassword ? "password" : "text"}
                            className="focus:outline-none w-full"
                            placeholder="Masukkan Kata Sandi Baru Anda"
                            onChange={(e) => {
                              setValue("confirm_new_password", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
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

                        {formState?.errors?.confirm_new_password && (
                          <span className="text-primary-500 text-[13px]">
                            {
                              formState?.errors?.confirm_new_password
                                ?.message as any
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  isClinix
                  isPrimary
                  title="Simpan"
                  className="w-full mt-4 focus:outline-none"
                  type="submit"
                />
              </Card>
            </form>
            <div className="mt-8 flex flex-col justify-center items-center gap-3">
              <span>Kami terpercaya, mitra kami</span>
              <div className="flex items-center gap-8">
                <img
                  src="/assets/images/bpjs.png"
                  width={40.82}
                  height={40}
                  alt="bpjs"
                />
                <img
                  src="/assets/images/satu-sehat.png"
                  width={32.26}
                  height={40}
                  alt="satu-sehat"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Card>
              <div className="flex flex-col items-center gap-4 justify-center">
                <img
                  src="/assets/icons/success.svg"
                  width={250}
                  height={200}
                  alt="success"
                  className="mx-auto"
                />
                <div className="flex flex-col gap-1 items-center">
                  <h1 className="text-[24px] font-bold text-center">
                    Kata sandi berhasil diubah
                  </h1>
                  <p className="text-center">
                    Kamu sekarang bisa masuk dengan kata sandi baru
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  isPrimary
                  onClick={onBackToHome}
                  title="Masuk"
                  className="w-full"
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
