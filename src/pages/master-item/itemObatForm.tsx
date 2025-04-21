import React from "react";
import { TextField } from "../../components/uiComponent/textField";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

const ItemObatForm = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-[800px] flex flex-col gap-y-6">
        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6">
          <h1 className="text-[20px] font-bold">Tambah Item Obat</h1>
          <div className="border-b border-[#EAEDF1]" />
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-4 w-full">
              <div>
                <TextField label="SKU" required />
              </div>
              <div>
                <TextField label="Nama Item" required />
              </div>
              <div>
                <TextField label="Satuan" required />
              </div>
              <div>
                <TextField label="Group Dosis" required />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <div>
                <TextField label="Barcode" required />
              </div>
              <div>
                <TextField label="KFA93NO" required />
              </div>
              <div>
                <TextField label="Remarks" required />
              </div>
              <div>
                <TextField label="Kuantiti Dosis" required />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg w-full shadow-soft p-6 gap-x-4 flex justify-end">
          <Button
            title="Batal"
            onClick={() => navigate("/master-item/item-obat")}
          />
          <Button
            title="Simpan"
            className={"text-white bg-primary-500"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemObatForm;
