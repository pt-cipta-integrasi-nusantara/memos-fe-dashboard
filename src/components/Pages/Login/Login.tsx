import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/auth/providers";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../Ui";

export function LoginContent() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isHidePassword, setIsHidePassword] = useState(true);

  const { register, handleSubmit, watch } = useForm<any>();
  const form = useRef() as any;

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    console.log(formData, "formlogin");
    try {
      await login(formData);
    } catch (error: any) {
      const reason = error?.message
        ? error?.message?.split("~")[0]
        : "Terjadi error, silakan coba lagi";
      toast.error(reason);
    }
    // TODO: login function
  };

  const onClickHome = () => {
    navigate("/");
  };

  const censoredEmail = watch("email");

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
                      />
                    </div>
                  </div>
                  {/* Row 1 */}
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[14px] font-medium" htmlFor="name">
                        Kata Sandi
                      </label>
                      <div className="relative rounded-[8px] p-4 border border-neutral-100 flex items-center justify-between gap-2">
                        <input
                          id="password"
                          {...register("password", { required: true })}
                          type={isHidePassword ? "password" : "text"}
                          className="focus:outline-none w-full"
                          placeholder="Masukkan Kata Sandi"
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
              </div>

              <p className="mt-2 text-[14px] underline text-link cursor-pointer">
                Lupa kata sandi?
              </p>

              <Button
                isClinix
                isPrimary
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
