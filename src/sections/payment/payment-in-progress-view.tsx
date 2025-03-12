import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../components/uiComponent";
import { useNavigate } from "react-router-dom";
import { useSubscriptionStore } from "../../stores/subscription/useSubscriptionStore";
import { formatRupiah } from "../../helpers/format-currency";
import { useSubscriptionById } from "../../services/subscription/use-subscription-detail";

export function PaymentInProgressContent({ data }: { data: any }) {
  const { resetFormData, resetSubscriptionData } = useSubscriptionStore();
  const { data: subscription } = useSubscriptionById(data?.subscription_id);
  const navigate = useNavigate();
  const onBackToHome = () => {
    navigate("/");
    resetFormData();
    resetSubscriptionData();
  };

  // useEffect(() => {
  //   if (Object.keys(subscriptionData).length === 0) {
  //     navigate("/");
  //   }
  // }, []);

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
                src="/assets/images/pending-payment.png"
                width={250}
                height={200}
                alt="pending-payment"
              />
              <h1 className="text-[24px] font-bold">
                Pembayaran Sedang Diproses
              </h1>
              <p className="w-full lg:w-3/4 text-center">
                Terima kasih! Kami telah menerima konfirmasi pembayaran Anda.
                Tim kami akan segera memverifikasi transaksi Anda.{" "}
              </p>
            </div>
            <div className="mt-4">
              <h2 className="font-bold mb-4">
                Apa yang harus dilakukan selanjutnya?
              </h2>
              <ul className="list-disc ml-5">
                <li className="mt-2">
                  Cek email Anda, Kami akan mengirimkan pembaruan status
                  pembayaran.
                </li>
                <li className="mt-2">
                  Jangan lakukan transfer ulang. Jika terjadi kendala, hubungi
                  tim dukungan kami.
                </li>
                <li className="mt-2">
                  Jika belum mendapat konfirmasi dalam kurang dari 24 jam,
                  hubungi kami melalui 0897282929
                </li>
              </ul>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 w-full h-1 mt-8"></div>

            <div className="mt-8 text-[14px]">
              <div id="identitas-profesi" className="mt-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Detail Transaksi</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Paket Langganan</span>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/logo/logo-clinix.png"
                      width={81}
                      height={24}
                      alt="logo-clinix"
                      className="cursor-pointer"
                    />
                    <span className="font-bold text-primary-500 text-[20px]">
                      {data?.plan?.duration?.months} –{" "}
                      {formatRupiah(
                        data?.plan?.price ?? subscription?.plan?.price
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Tagihan Kepada</span>
                  <span>
                    {data?.payment?.bank_account?.owner_name ??
                      subscription?.payment?.bank_account?.owner_name}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Metode Pembayaran</span>
                  <span>Bank Transfer</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Nama Pemilik Rekening</span>
                  <span>
                    {data?.payment?.bank_account?.owner_name ??
                      subscription?.payment?.bank_account?.owner_name}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Nama Bank</span>
                  <span>
                    {data?.payment?.bank_account?.bank_name ??
                      subscription?.payment?.bank_account?.bank_name}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>No. Rekening</span>
                  <span>
                    {data?.payment?.bank_account?.account_number ??
                      subscription?.payment?.bank_account?.account_number}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Bukti Transfer</span>
                  <span className="underline text-link cursor-pointer">
                    <span>
                      {data?.payment?.payment_proof ??
                        subscription?.payment?.payment_proof}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center mt-4">
                  <span>Total Pembayaran</span>
                  <span className="text-[14px] font-bold">
                    {formatRupiah(
                      data?.payment?.pay_amount ??
                        subscription?.payment?.pay_amount
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 w-full h-1 mt-8"></div>

            <Button
              isPrimary
              onClick={onBackToHome}
              title="Ke Halaman Utama"
              className="w-full mt-4"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
