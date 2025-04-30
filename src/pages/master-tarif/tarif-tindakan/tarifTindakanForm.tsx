import { TextField } from "../../../components/uiComponent/textField";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Select } from "../../../components/uiComponent/select";

const TarifTindakanForm = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-full lg:w-[800px] flex flex-col gap-y-6">
        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6 bg-white">
          <h1 className="text-[20px] font-bold">Tambah Tarif Satuan</h1>
          <div className="border-b border-[#EAEDF1]" />
          <h6 className="text-[16px] font-bold">Data Pelayanan</h6>
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-4 w-full">
              <Select
                label="Grup Penjamin"
                required
                options={[]}
                placeholder="Pilih Grup Penjamin"
              />
              <Select
                label="Unit Pelayanan"
                required
                options={[]}
                placeholder="Pilih Unit Pelayanan"
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <Select
                label="Kelas"
                required
                options={[]}
                placeholder="Pilih Kelas"
              />
              <Select
                label="Item Pelayanan"
                required
                options={[]}
                placeholder="Pilih Item Pelayanan"
              />
            </div>
          </div>
          <h6 className="text-[16px] font-bold">BHP</h6>
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-4 w-full">
              <Select
                label="Nama Produk"
                required
                options={[]}
                placeholder="Pilih Nama Produk"
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <TextField
                label="Quantity"
                required
                placeholder="Masukkan Kuantiti"
              />
            </div>
          </div>
          <h6 className="text-[16px] font-bold">Jasa Medis</h6>
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-4 w-full">
              <Select
                label="Tenaga Medis"
                required
                options={[
                  {
                    label: "Single",
                    value: 12,
                  },
                  {
                    label: "Team",
                    value: 11,
                  },
                ]}
                getOptionLabel={(option) => option.label}
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <Select
                label="Eksekutor Utama"
                required
                options={[]}
                placeholder="Pilih Eksekutor Utama"
              />
            </div>
          </div>

          <h6 className="text-[16px] font-bold">Tarif</h6>
          <TextField
            label="Masukan Tarif"
            placeholder="0"
            containerProps={{ className: "w-[370px]" }}
          />
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
    </div>
  );
};

export default TarifTindakanForm;
