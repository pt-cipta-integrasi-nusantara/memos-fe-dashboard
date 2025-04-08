import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button, Card } from "../../../components/uiComponent";

export function TermsConditionContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product = String(searchParams.get("product"));
  const [isAgree, setIsAgree] = useState(false);
  const onNextStep = () => {
    navigate("/registration/step/2");
  };

  const onPreviousStep = () => {
    navigate("/");
  };

  const onCheckAgree = () => {
    setIsAgree((prev) => !prev);
  };

  return (
    <div
      id="terms-condition"
      className={twMerge("mb-24 p-4 lg:p-16", "max-w-[1200rem] mx-auto")}
    >
      <div className="lg:mx-36">
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
              <h1 className="text-[24px] font-bold">Syarat & Ketentuan</h1>
              <span className="text-[14px] text-neutral-300">
                Langkah 1 dari 3
              </span>
            </div>
            {/* Heading */}
          </div>
          {/* Content */}
          <div className="mt-8 text-[14px]" id="content-terms-condition">
            <h2 className="font-bold text-[16px]">
              Syarat & Ketentuan Penggunaan Data Pribadi Clinix
            </h2>
            <p className="mt-4">
              Dengan menggunakan layanan kami, Anda menyetujui pengumpulan,
              penggunaan, dan perlindungan data pribadi sesuai dengan kebijakan
              berikut:
            </p>
            <div className="mt-4">
              <h3 className="font-bold">1. Pengumpulan Data Pribadi</h3>
              <p>
                Kami mengumpulkan data berikut untuk menyediakan layanan yang
                optimal:
              </p>
              <ul className="list-disc list-inside ml-2">
                <li>
                  Informasi Pribadi: Nama, alamat email, nomor telepon, dan data
                  identitas lainnya.
                </li>
                <li>
                  Data Kesehatan: Riwayat medis, catatan aktivitas fisik, pola
                  makan, serta informasi lain yang relevan.
                </li>
                <li>
                  Data Usaha (jika berlaku): Nama perusahaan, jenis usaha,
                  laporan keuangan, dan informasi lain yang berkaitan dengan
                  bisnis Anda.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">2. Penggunaan Data</h3>
              <p>Data yang dikumpulkan digunakan untuk:</p>
              <ul className="list-disc list-inside ml-2">
                <li>
                  Memberikan layanan pencatatan kesehatan dan analisis bisnis
                  secara akurat.
                </li>
                <li>
                  Meningkatkan fitur aplikasi berdasarkan pola penggunaan.
                </li>
                <li>
                  Menghubungi pengguna untuk pemberitahuan penting atau dukungan
                  pelanggan.
                </li>
                <li>Mematuhi peraturan dan hukum yang berlaku.</li>
              </ul>
              <p>
                Kami tidak akan menjual atau membagikan data Anda kepada pihak
                ketiga tanpa izin kecuali diwajibkan oleh hukum.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">3. Keamanan Data</h3>
              <p>
                Kami menerapkan enkripsi dan langkah-langkah keamanan untuk
                melindungi data Anda dari akses tidak sah, kebocoran, atau
                penyalahgunaan. Namun, Anda juga bertanggung jawab untuk menjaga
                kerahasiaan akun dan kata sandi Anda.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">4. Hak Pengguna</h3>
              <p>Anda memiliki hak untuk:</p>
              <ul className="list-disc list-inside ml-2">
                <li>
                  Mengakses, memperbarui, atau menghapus data pribadi Anda kapan
                  saja.
                </li>
                <li>
                  Menarik persetujuan penggunaan data tertentu dengan
                  menghubungi layanan pelanggan kami.
                </li>
                <li>
                  Mengajukan keluhan jika merasa data Anda disalahgunakan.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">5. Penyimpanan dan Penghapusan Data</h3>
              <ul className="list-disc list-inside ml-2">
                <li>
                  Data Anda akan disimpan selama akun Anda aktif atau selama
                  diperlukan untuk keperluan layanan.
                </li>
                <li>
                  Jika Anda ingin menghapus akun, kami akan menghapus data dalam
                  jangka waktu [misalnya, 30 hari] sesuai kebijakan kami,
                  kecuali diwajibkan untuk disimpan berdasarkan regulasi
                  tertentu.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">6. Perubahan Kebijakan</h3>
              <p>
                Kami dapat memperbarui syarat & ketentuan ini dari waktu ke
                waktu. Perubahan akan diberitahukan melalui aplikasi atau email.
                Penggunaan layanan setelah perubahan berarti Anda menerima
                ketentuan yang diperbarui.
              </p>
            </div>
            <p className="mt-6">
              Dengan menggunakan layanan ini, Anda menyetujui syarat & ketentuan
              di atas.
            </p>
          </div>
          {/* Content */}
        </Card>
        <Card className="mt-8">
          <div className="flex items-center gap-2">
            <input
              className="accent-green-500 w-4 h-4"
              id="aggreement"
              type="checkbox"
              onChange={onCheckAgree}
            />

            <label htmlFor="aggreement" className="cursor-pointer">
              Menyetujui semua syarat & ketentuan yang berlaku
            </label>
          </div>
          <Button
            onClick={onNextStep}
            isPrimary
            isClinix={product === "clinix"}
            className="w-full mt-4"
            title="Selanjutnya"
            isDisabled={!isAgree}
          />
        </Card>
      </div>
    </div>
  );
}
