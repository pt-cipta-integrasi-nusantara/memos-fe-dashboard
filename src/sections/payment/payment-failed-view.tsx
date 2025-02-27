import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../components/uiComponent";
import { useNavigate } from "react-router-dom";

export function PaymentFailedContent() {
  const navigate = useNavigate();

  const onBackToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div
      id="summary"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[80rem] mx-auto")}
    >
      <div className="lg:mx-36">
        <div>
          <Card>
            <div className="flex flex-col items-center gap-4 justify-center">
              <img
                src="/assets/images/failed-payment.png"
                width={250}
                height={200}
                alt="failed-payment"
              />
              <h1 className="text-[24px] font-bold">Pembayaran Gagal!</h1>
              <p className="text-center">
                Maaf, kami tidak dapat memproses pembayaran Anda.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="font-bold mb-4">Kemungkinan penyebab</h2>
              <ul className="list-disc ml-5">
                <li className="mt-2">
                  Transfer belum diterima atau jumlah tidak sesuai
                </li>
                <li className="mt-2">Bukti pembayaran tidak valid</li>
                <li className="mt-2">Batas waktu pembayaran telah berakhir</li>
              </ul>
            </div>

            <div className="border-t-2 border-dashed border-neutral-400 w-full h-1 mt-8"></div>

            <div className="flex flex-col-reverse md:flex-row  justify-between gap-4 mt-8">
              <Button
                title="Hubungi Kami"
                className="w-full border-neutral-300 text-neutral-300"
              />
              <Button
                isPrimary
                onClick={onBackToHome}
                title="Konfirmasi Ulang"
                className="w-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
