import React from "react";
import { TextField } from "../../components/uiComponent/textField";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

const ItemAlatKesehatanForm = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full lg:w-[800px] flex flex-col gap-y-6">
        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6">
          <h1 className="text-[20px] font-bold">Tambah Alat Kesehatan</h1>
          <div className="border-b border-[#EAEDF1]" />
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-4 w-full">
              <div>
                <TextField
                  label="SKU"
                  required
                  placeholder="Masukkan No. SKU"
                />
              </div>
              <div>
                <TextField
                  label="Nama Item"
                  required
                  placeholder="Masukkan Nama Item"
                />
              </div>
              <div>
                <TextField
                  label="Merek"
                  required
                  placeholder="Masukkan Merek"
                />
              </div>
              <div>
                <TextField label="Tahun Pembelian" />
              </div>
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <div>
                <TextField
                  label="Barcode"
                  required
                  placeholder="Masukkan No. Barcode"
                />
              </div>
              <div>
                <TextField
                  label="Kategori"
                  required
                  placeholder="Masukkan Kategori"
                />
              </div>
              <div>
                <TextField label="Lokasi" required placeholder="Pilih Lokasi" />
              </div>
              <div>
                <TextField label="Status" required placeholder="Pilih Status" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg w-full shadow-soft p-6 gap-x-4 flex justify-end">
          <Button
            title="Batal"
            onClick={() => navigate("/master-item/item-alat-kesehatan")}
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

export default ItemAlatKesehatanForm;
