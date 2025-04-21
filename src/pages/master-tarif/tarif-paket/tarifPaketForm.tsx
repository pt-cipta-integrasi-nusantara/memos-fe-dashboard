import { TextField } from "../../../components/uiComponent/textField";
import { Button, IconButton } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Select } from "../../../components/uiComponent/select";
import {
  AddCircleOutlineIcon,
  DeleteIcon,
} from "../../../components/iconsComponent";

const TarifPaketForm = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="w-full flex justify-center pb-6">
      <div className="w-full lg:w-[800px] flex flex-col gap-y-6">
        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6 bg-white">
          <h1 className="text-[20px] font-bold">Tambah Tarif Paket</h1>
          <div className="border-b border-[#EAEDF1]" />
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
                label="Nama Paket"
                required
                options={[]}
                placeholder="Pilih Nama Paket"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6 bg-white">
          <h1 className="text-[16px] font-bold">Tarif</h1>
          <div className="border-b border-[#EAEDF1]" />
          <div className="flex gap-x-4 items-center">
            <Select
              label="Item Pelayanan"
              className="w-[500px]"
              required
              options={[]}
              placeholder="Pilih Item Pelayanan"
            />
            <TextField
              label="Quantity"
              containerProps={{ className: "w-[300px]" }}
            />
            <TextField
              label="Tarif Pelayanan"
              containerProps={{ className: "w-[300px]" }}
            />
            <TextField
              label="Tarif Jasa Medis"
              containerProps={{ className: "w-[300px]" }}
            />
            <div className="mt-7">
              <IconButton>
                <DeleteIcon color="#677A8E" width="20" height="20" />
              </IconButton>
            </div>
          </div>
          <div>
            <Button
              title="Tambah Tarif"
              className=" border-none"
              icon={<AddCircleOutlineIcon />}
            />
          </div>
        </div>

        <div className="rounded-lg w-full shadow-soft p-6 flex flex-col gap-y-6 bg-white">
          <h1 className="text-[16px] font-bold">Diskon Paket</h1>
          <div className="border-b border-[#EAEDF1]" />
          <TextField
            label="Nominal Diskon"
            placeholder="0"
            containerProps={{ className: "w-[300px]" }}
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

export default TarifPaketForm;
