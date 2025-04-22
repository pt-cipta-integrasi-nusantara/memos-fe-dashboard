import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../components/uiComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRegistrationFormStore } from "../../../stores/registration/useRegistrationFormStore";
import { useEffect } from "react";

export function SummaryFinishContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product = String(searchParams.get("product"));
  const onClickToHome = () => {
    navigate("/");
  };
  const { setCurrentStep } = useRegistrationFormStore();

  useEffect(() => {
    setCurrentStep("0");
  }, []);

  return (
    <div id="summary" className={twMerge("mb-24 p-4", "max-w-[560px] mx-auto")}>
      <div>
        <div>
          <Card>
            <div className="text-center">
              <img
                src={
                  product === "clinix"
                    ? "/assets/images/registration-finish.svg"
                    : "/assets/images/registration-done.png"
                }
                width={250}
                height={200}
                alt="finish"
                className="mx-auto"
              />
              <h2 className="font-bold text-[18px] lg:text-[20px] lg:text-[24px]">
                Pendaftaran Berhasil
              </h2>
              <h3 className="mt-2 text-[14px] lg:text-base">
                Tim manajemen di tempat Anda bekerja akan meninjau profil Anda
                sebelum Anda dapat mengakses workspace.
              </h3>
            </div>

            <div className="mt-8 text-[14px]">
              <span className="block font-bold">Langkah Selanjutnya</span>
              <span className="block mt-2">
                Anda akan menerima notifikasi setelah proses peninjauan selesai.
                Pastikan email Anda aktif untuk menerima pembaruan. Jika Anda
                belum menerima email konfirmasi setelah 2 jam, silakan periksa
                folder spam atau hubungi tim dukungan untuk bantuan lebih
                lanjut.
              </span>
            </div>

            <div className="flex flex-col-reverse lg:flex-row  justify-between gap-4 mt-12">
              <Button
                isClinix={product === "clinix"}
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
