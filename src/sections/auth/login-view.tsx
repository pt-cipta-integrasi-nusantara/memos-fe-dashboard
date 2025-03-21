import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth/providers";
import { createRef, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../components/uiComponent";
import { useRegistrationFormStore } from "../../stores/registration/useRegistrationFormStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id"; // Import Indonesian locale

dayjs.extend(relativeTime);
dayjs.locale("id"); // Set locale to Indonesian

export function LoginContent() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const { resetFormData } = useRegistrationFormStore();
  const { register, handleSubmit, setValue } = useForm<any>();
  const lastLogin = localStorage.getItem("last_login");
  const form = useRef(null) as any;
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const recaptchaRef = createRef<any>();

  const onChange = (token: string | null) => {
    if (token !== null) {
      setIsCaptchaDone(true);
    } else {
      setIsCaptchaDone(false);
    }
  };

  useEffect(() => {
    resetFormData();
  }, []);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    recaptchaRef?.current?.reset();

    try {
      await login(formData);
    } catch (error: any) {
      console.log(error?.message);
      const reason = error?.message
        ? error?.message?.split("~")[0]
        : "Terjadi error, silakan coba lagi";
      if (
        error?.message ===
        "crypto/bcrypt: hashedPassword is not the hash of the given password ~ undefined"
      ) {
        setIsWrongPassword(true);
      } else {
        toast.error(reason);
      }
    }
    // TODO: login function
  };

  const onClickResetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      id="signup"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[60rem] mx-auto")}
    >
      <div className="lg:mx-36">
        <div>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <h2 className="font-bold text-[30px]">Login</h2>
              <h3 className="mt-2">Masukkan data Anda untuk login</h3>

              <div className="flex flex-col gap-8 mt-6">
                <div className="flex flex-col gap-4">
                  {/* Row 1 */}
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[14px] font-medium" htmlFor="name">
                        Email
                      </label>
                      <input
                        id="email"
                        {...register("email", { required: true })}
                        type="email"
                        className="rounded-md p-4 border border-neutral-100 focus:outline-none"
                        placeholder="Masukkan Email Anda"
                        // autoComplete="off"
                        autoCorrect="off"
                      />
                      {lastLogin && (
                        <span className="block text-sm text-neutral-300">
                          Aktifitas terakhir email ini{" "}
                          {dayjs(lastLogin).fromNow(true)} yang lalu
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Row 1 */}
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[14px] font-medium" htmlFor="name">
                        Kata Sandi
                      </label>
                      <div
                        className={`relative rounded-[8px] p-4 border ${
                          isWrongPassword
                            ? "border-primary-500"
                            : "border-neutral-100"
                        } flex items-center justify-between gap-2`}
                      >
                        <input
                          id="password"
                          {...register("password", { required: true })}
                          type={isHidePassword ? "password" : "text"}
                          className="focus:outline-none w-full"
                          placeholder="Masukkan Kata Sandi"
                          onChange={(e) => {
                            setIsWrongPassword(false);
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

                      {isWrongPassword && (
                        <span className="text-primary-500">
                          Kata sandi salah
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p
                onClick={onClickResetPassword}
                className="mt-2 text-[14px] underline text-link cursor-pointer"
              >
                Lupa kata sandi?
              </p>
              {/* <div className="my-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdeYPsqAAAAAIuCPajsLD0jK9vMGRwMjxqAomu4"
                  onChange={onChange}
                />
              </div> */}
              <Button
                isPrimary
                disabled={!isCaptchaDone}
                title="Masuk"
                className="w-full mt-4 focus:outline-none"
                type="submit"
              />
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-auto border-t border-neutral-200" />
                <span className="text-neutral-300">Atau</span>
                <div className="flex-auto border-t border-neutral-200" />
              </div>
              <button className="mt-4 rounded-[10px] py-4 w-full border border-neutral-200 flex items-center gap-3 justify-center">
                <img
                  src="/assets/icons/google.svg"
                  width={20}
                  height={20}
                  alt="google"
                />
                Daftar dengan Google
              </button>
              <div
                onClick={() => navigate("/")}
                className="mt-4 text-center cursor-pointer"
              >
                <span>
                  Belum memiliki akun?{" "}
                  <span className="underline text-[#037EFF]">Daftar</span>
                </span>
              </div>
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
      </div>
    </div>
  );
}
