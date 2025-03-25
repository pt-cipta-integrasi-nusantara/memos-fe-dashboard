import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import * as sessionService from "../../utils/session";
import { Button, Card } from "../../components/uiComponent";
import { useRegistrationFormStore } from "../../stores/registration/useRegistrationFormStore";
import Countdown from "../../helpers/countdown";
import PinInput from "../../components/uiComponent/pinInput";
import { Dialog, Transition } from "@headlessui/react";
import {
  useRequestAuthCode,
  useVerifyAuthCode,
} from "../../services/auth/use-registration";

export function ForgotPasswordContent() {
  const navigate = useNavigate();
  const { mutate: requestAuthCode } = useRequestAuthCode();
  const { mutate: verifyAuthCode } = useVerifyAuthCode();
  const [initialTime, setInitialTime] = useState(150);
  const [isShowOTPModal, setIsShowOTPModal] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const { resetFormData } = useRegistrationFormStore();
  const { register, handleSubmit, watch } = useForm<any>();
  const form = useRef(null) as any;
  const censoredEmail = watch("email");

  useEffect(() => {
    resetFormData();
  }, []);

  const onVerifyAuthCode = (pin: string) => {
    verifyAuthCode(
      {
        contact_type: "email",
        contact_value: watch("email"),
        token_type: "password_reset",
        token: pin,
      },
      {
        onSuccess: (data) => {
          const { token } = data?.data;
          sessionService.setSession(token);
          setTimeout(() => {
            navigate("/reset-password");
          }, 1000);
        },
        onError: (error: any) => {
          const reason = error?.message
            ? error?.message?.split("~")[0]
            : "Terjadi error, silakan coba lagi";
          toast.error(reason);
        },
      }
    );
  };

  const onClickRequestAuthCode = () => {
    requestAuthCode(
      {
        contact_type: "email",
        contact_value: watch("email"),
        token_type: "password_reset",
      },
      {
        onSuccess: () => {
          setIsRequested(true);
        },
        onError: (error: any) => {
          const reason = error?.message
            ? error?.message?.split("~")[0]
            : "Terjadi error, silakan coba lagi";
          toast.error(reason);
        },
      }
    );
  };
  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      setInitialTime(150);
      setIsShowOTPModal(true);
      setIsRequested(true);
      await requestAuthCode({
        contact_type: "email",
        contact_value: formData?.email,
        token_type: "password_reset",
      });
    } catch (error: any) {
      console.log(error?.message);
      const reason = error?.message
        ? error?.message?.split("~")[0]
        : "Terjadi error, silakan coba lagi";
      toast.error(reason);
    }
    // TODO: login function
  };

  return (
    <div
      id="signup"
      className={twMerge(
        "min-h-screen mb-24 p-4 lg:p-16",
        "max-w-[60rem] mx-auto"
      )}
    >
      <div className="lg:mx-36">
        <div>
          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <h2 className="font-bold text-[30px]">Lupa Kata Sandi</h2>
              <h3 className="mt-2">
                Masukkan Email Anda untuk mengirimkan kode OTP
              </h3>
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
                        className="rounded-md p-[10px] text-[14px] border border-neutral-100 focus:outline-none"
                        placeholder="Masukkan Email Anda"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                isPrimary
                title="Masuk"
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
      </div>

      {isShowOTPModal && (
        <Transition appear show={isShowOTPModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsShowOTPModal(false)}
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
                        <img
                          onClick={() => setIsShowOTPModal(false)}
                          src="/assets/icons/arrow-back.svg"
                          alt="back"
                          width={24}
                          height={24}
                          className="cursor-pointer"
                        />
                        Lupa Kata Sandi
                      </div>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Kami telah mengirim pesan berisi kode verifikasi ke
                        alamat email : {censoredEmail}
                      </p>
                    </div>
                    <PinInput length={6} onComplete={onVerifyAuthCode} />
                    <div className="mt-8">
                      <Countdown
                        initialTime={initialTime}
                        onClickRequestAuthCode={onClickRequestAuthCode}
                        isRequested={isRequested}
                        setIsRequested={setIsRequested}
                      />
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
