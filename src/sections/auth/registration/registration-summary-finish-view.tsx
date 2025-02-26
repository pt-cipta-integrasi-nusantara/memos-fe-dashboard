import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../components/ui";
import { useRegistrationFormStore } from "../../../stores/useRegistrationFormStore";
import { useNavigate } from "react-router-dom";

export function SummaryFinishContent() {
  const navigate = useNavigate();
  const { formData } = useRegistrationFormStore();

  const onClickToHome = () => {
    navigate("/");
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
              <img
                src="/assets/icons/registration-finish.svg"
                width={250}
                height={200}
                alt="finish"
                className="mx-auto"
              />
              <h2 className="font-bold text-[18px] lg:text-[30px]">
                Permintaan Berlangganan Telah Dikirim!
              </h2>
              <h3 className="mt-2 text-[14px] lg:text-base">
                Terima kasih! Kami telah menerima permintaan Anda.
              </h3>
            </div>
            <div className="mt-8 text-[14px]">
              <div id="identitas-diri" className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Detail</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Nama Pelanggan</span>
                  <span>{formData?.full_name}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Nama Klinik</span>
                  <span>{formData?.facility_name}</span>
                </div>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-4">
                  <span>Alamat Klinik</span>
                  <span>
                    {formData?.street_address} {formData?.detail_note} RT
                    {formData?.rt_no} RW{formData?.rw_no}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-[14px]">
              <span className="block font-bold">Langkah Selanjutnya</span>
              <span className="block mt-2">
                Tim kami, akan memverifikasi permintaan Anda. Tunggu email
                konfirmasi dalam 15 menit – 2 jam. Jika belum diterima, cek spam
                atau hubungi kami di 08979075890
              </span>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 w-full h-1 mt-8"></div>

            <div className="flex flex-col-reverse lg:flex-row  justify-between gap-4 mt-4">
              <Button
                onClick={onClickToHome}
                isClinix
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
