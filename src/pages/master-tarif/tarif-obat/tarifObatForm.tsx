import { TextField } from "../../../components/uiComponent/textField";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../../../components/uiComponent/dialog";
import { useState } from "react";

const TarifObatForm = () => {
  const [isUpdateConfirm, setIsUpdateConfirm] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setIsUpdateConfirm(true);
    console.log("submit");
  };
  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-full lg:w-[800px] flex flex-col gap-y-6">
        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6 bg-white">
          <h1 className="text-[20px] font-bold">Edit Tarif Obat</h1>
          <div className="border-b border-[#EAEDF1]" />

          <div className="flex gap-x-6">
            <div className="flex flex-col  w-1/2 gap-y-4">
              <TextField label="SKU" required />
              <TextField label="Nama Item" required />
              <TextField label="Satuan" required />
              <TextField label="Grup Dosis" required />
              <TextField label="Harga Terakhir" required />
              <TextField label="Harga Terendah" required />
              <TextField label="Harga Kustom" required />
            </div>
            <div className="flex w-1/2 flex-col  gap-y-4">
              <TextField label="Barcode" required />
              <TextField label="KFA93NO" required />
              <TextField label="Remarks" required />
              <TextField label="Kuantiti Dosis" required />
              <TextField label="Harga Tertinggi" required />
              <TextField label="Harga Rata-rata" required />
              <TextField label="GRUnitCostID" required />
            </div>
          </div>
        </div>

        <div className="rounded-lg w-full shadow-soft p-6 gap-x-4 flex justify-end bg-white">
          <Button
            title="Batal"
            onClick={() => navigate("/master-tarif/tarif-tindakan")}
          />
          <Button
            title="Simpan"
            className={"text-white bg-primary-500"}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <Dialog
        open={isUpdateConfirm}
        onClose={() => setIsUpdateConfirm(false)}
        actionProps={{
          cancelButtonProps: {
            className: "w-full",
          },
          submitButtonProps: {
            label: "Ya, Ubah Tarif",
            className: "w-full",
            onClick() {
              setIsUpdateConfirm(false);
            },
          },
        }}
      >
        <div className="w-ful py-8 flex flex-col">
          <h5 className="text-[20px] font-bold text-[#31475E] text-center">
            Apakah Anda yakin ingin mengubah tarif obat?
          </h5>
          <p className="text-[#677A8E] text-[16px] text-center">
            Klik “Ya, Tambahkan Tarif” untuk mengonfirmasi tindakan ini
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default TarifObatForm;
