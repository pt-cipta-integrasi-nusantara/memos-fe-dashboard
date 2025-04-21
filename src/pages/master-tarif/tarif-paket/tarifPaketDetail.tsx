import { Button, ContentLayout } from "../../../components";
import { Table, TTableColumn } from "../../../components/uiComponent";
import { FilterListIcon, SearchIcon } from "../../../components/iconsComponent";
import { TextField } from "../../../components/uiComponent/textField";
import { useNavigate } from "react-router-dom";

const tarifPaketDetailData = [
  {
    id: 1,
    itemPelayanan: "Dokter Obsgyn (Operator)",
    quantity: "-",
    hargaTarifPelayanan: "IDR 3.105.000",
    totalTarifPelayanan: "IDR 3.105.000",
    tarifJasaMedis: "IDR 1.700.000",
    tarifJasaSarana: "Rp32.000",
  },
  {
    id: 2,
    itemPelayanan: "Visit dr. Obsgyn (3x)",
    quantity: "3",
    hargaTarifPelayanan: "IDR 180.000",
    totalTarifPelayanan: "IDR 540.000",
    tarifJasaMedis: "IDR 432.000",
    tarifJasaSarana: "Rp27.500",
  },
  {
    id: 3,
    itemPelayanan: "Perawatan luka SC o/ dokter obsgyn",
    quantity: "-",
    hargaTarifPelayanan: "IDR 70.000",
    totalTarifPelayanan: "IDR 70.000",
    tarifJasaMedis: "IDR 54.000",
    tarifJasaSarana: "Rp22.300",
  },
  {
    id: 4,
    itemPelayanan: "Dokter Anestesi",
    quantity: "-",
    hargaTarifPelayanan: "IDR 610.000",
    totalTarifPelayanan: "IDR 610.000",
    tarifJasaMedis: "IDR 560.000",
    tarifJasaSarana: "Rp13.400",
  },
  {
    id: 5,
    itemPelayanan: "Perawat Asisten OK",
    quantity: "-",
    hargaTarifPelayanan: "IDR 290.000",
    totalTarifPelayanan: "IDR 290.000",
    tarifJasaMedis: "IDR 270.000",
    tarifJasaSarana: "Rp18.750",
  },
  {
    id: 6,
    itemPelayanan: "Dokter Anak (Catch)",
    quantity: "-",
    hargaTarifPelayanan: "IDR 435.000",
    totalTarifPelayanan: "IDR 435.000",
    tarifJasaMedis: "IDR 360.000",
    tarifJasaSarana: "Rp10.800",
  },
  {
    id: 7,
    itemPelayanan: "Visit dr. Anak (3x)",
    quantity: "3",
    hargaTarifPelayanan: "IDR 180.000",
    totalTarifPelayanan: "IDR 540.000",
    tarifJasaMedis: "IDR 432.000",
    tarifJasaSarana: "Rp14.200",
  },
  {
    id: 8,
    itemPelayanan: "Konseling laktasi dokter anak",
    quantity: "-",
    hargaTarifPelayanan: "IDR 195.000",
    totalTarifPelayanan: "IDR 195.000",
    tarifJasaMedis: "IDR 144.000",
    tarifJasaSarana: "Rp7.200",
  },
  {
    id: 9,
    itemPelayanan: "Sewa Ruang OK",
    quantity: "-",
    hargaTarifPelayanan: "IDR 880.000",
    totalTarifPelayanan: "IDR 880.000",
    tarifJasaMedis: "-",
    tarifJasaSarana: "Rp600",
  },
];

const TarifPaketDetail = () => {
  const navigate = useNavigate();
  const columns: Array<TTableColumn<(typeof tarifPaketDetailData)[number]>> = [
    {
      id: "itemPelayanan",
      label: "Item Pelayanan",
      setContent: (data) => <span>{data.itemPelayanan}</span>,
    },
    {
      id: "quantity",
      label: "Quantity",
      setContent: (data) => (
        <span>{data.quantity !== null ? data.quantity : "-"}</span>
      ),
    },
    {
      id: "hargaTarifPelayanan",
      label: "Harga Tarif Pelayanan",
      setContent: (data) => <span>{data.hargaTarifPelayanan}</span>,
    },
    {
      id: "totalTarifPelayanan",
      label: "Total Tarif Pelayanan",
      setContent: (data) => <span>{data.totalTarifPelayanan}</span>,
    },
    {
      id: "tarifJasaMedis",
      label: "Tarif Jasa Medis",
      setContent: (data) => (
        <span>{data.tarifJasaMedis !== null ? data.tarifJasaMedis : "-"}</span>
      ),
    },
    {
      id: "tarifJasaSarana",
      label: "Tarif Jasa Sarana",
      setContent: (data) => <span>{data.tarifJasaSarana}</span>,
    },
  ];

  return (
    <ContentLayout
      title="Paket SC (4 Hari 3 Malam)"
      onBack={() => navigate("/master-tarif/tarif-paket")}
      actions={
        <div className="flex gap-x-4 items-center">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-[10px]" />
            <TextField
              placeholder="Cari Item"
              className="pl-10 rounded-[99px]"
            />
          </div>

          <button className="rounded-[99px] space-x-2 border border-subtle px-4 py-2 flex">
            <FilterListIcon />
            <span className="text-default font-bold text-[14px]">Filter</span>
          </button>

          <Button
            title="Edit Tarif Paket"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => navigate("/master-tarif/tarif-paket/12/edit")}
          />
        </div>
      }
    >
      <Table data={tarifPaketDetailData} columns={columns} isLoading={false} />
      <div className="flex w-full flex-col items-end border-b border-[#F3F5F7]">
        <div className="bg-[#E9F1FC] w-[27.5%] flex">
          <div className="py-5 px-2 w-[48%] flex justify-end">
            <span className="text-[14px] font-bold ">Subtotal</span>
          </div>
          <div className="py-5 px-2">
            <span className="text-[14px] font-bold">IDR 11.440.000</span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-end border-b border-[#F3F5F7]">
        <div className="bg-[#E9F1FC] w-[27.5%] flex">
          <div className="py-5 px-2 w-[48%] flex justify-end">
            <span className="text-[14px] font-bold ">Diskon RS</span>
          </div>
          <div className="py-5 px-2">
            <span className="text-[14px] font-bold">IDR 0</span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-end border-b border-[#F3F5F7]">
        <div className="bg-[#E9F1FC] w-[27.5%] flex">
          <div className="py-5 px-2 w-[48%] flex justify-end">
            <span className="text-[14px] font-bold ">Total Harga</span>
          </div>
          <div className="py-5 px-2">
            <span className="text-[14px] font-bold">IDR 11.440.000</span>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default TarifPaketDetail;
