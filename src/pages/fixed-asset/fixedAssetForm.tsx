import { TextField } from "../../components/uiComponent/textField";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

const FixedAssetForm = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-full lg:w-[800px] flex flex-col gap-y-6">
        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6 bg-white">
          <h1 className="text-[20px] font-bold">Tambah Asset</h1>
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
                  label="Tanggal Pembelian"
                  required
                  placeholder="Masukkan Tanggal Pembelian"
                />
              </div>
              <div>
                <TextField
                  label="Nilai Buku"
                  required
                  placeholder="Masukkan Nilai Buku"
                />
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
                <TextField
                  label="Harga Pembelian"
                  required
                  placeholder="Masukkan Harga Pembelian"
                />
              </div>
              <div>
                <TextField
                  label="Status"
                  required
                  placeholder="Masukan Status"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg w-full shadow-soft p-6 gap-x-4 flex justify-end bg-white">
          <Button title="Batal" onClick={() => navigate("/fixed-asset")} />
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

export default FixedAssetForm;
