import { Fragment } from "react";
import { ContentLayout } from "../../../components";
import {
  IconButton,
  Table,
  TTableColumn,
} from "../../../components/uiComponent";
import {
  EditIcon,
  FilterListIcon,
  MoreHorizIcon,
  SearchIcon,
} from "../../../components/iconsComponent";
import { TextField } from "../../../components/uiComponent/textField";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

const tarifObatData = [
  {
    sku: "100001",
    barcodeNo: "142830617896",
    namaItem: "Paracetamol 500 mg",
    kfa93no: "20240981",
    satuan: "Tablet",
    kuantitiDosis: "500 mg",
    grupDosis: "mg",
    hargaTerakhir: "Rp8.750",
    hargaTertinggi: "Rp8.750",
    hargaTerendah: "Rp8.750",
    hargaRataRata: "Rp8.750",
    hargaKustom: "Rp8.750",
    grUnitCostId: "Rp8.750",
    remarks: "ALP-OTT-ADI-001",
  },
  {
    sku: "100002",
    barcodeNo: "544900012398",
    namaItem: "Ibuprofen 400 mg",
    kfa93no: "20240909",
    satuan: "Tablet",
    kuantitiDosis: "400 mg",
    grupDosis: "mg",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
    remarks: "-",
  },
  {
    sku: "100003",
    barcodeNo: "748930029845",
    namaItem: "Amoxicillin 500 mg",
    kfa93no: "20240977",
    satuan: "Kapsul",
    kuantitiDosis: "500 mg",
    grupDosis: "mg",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
    remarks: "-",
  },
  {
    sku: "100004",
    barcodeNo: "616950030547",
    namaItem: "Omeprazole 20 mg",
    kfa93no: "20240936",
    satuan: "Kapsul",
    kuantitiDosis: "20 mg",
    grupDosis: "mg",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
    remarks: "-",
  },
  {
    sku: "100005",
    barcodeNo: "938294461379",
    namaItem: "Salbutamol 2 mg",
    kfa93no: "20240916",
    satuan: "Tablet",
    kuantitiDosis: "2 mg",
    grupDosis: "mg",
    hargaTerakhir: "Rp4.600",
    hargaTertinggi: "Rp4.600",
    hargaTerendah: "Rp4.600",
    hargaRataRata: "Rp4.600",
    hargaKustom: "Rp4.600",
    grUnitCostId: "Rp4.600",
    remarks: "ALB-IND-ADI-001",
  },
  {
    sku: "100006",
    barcodeNo: "836185327691",
    namaItem: "Captopril 25 mg",
    kfa93no: "20240995",
    satuan: "Tablet",
    kuantitiDosis: "25 mg",
    grupDosis: "mg",
    hargaTerakhir: "Rp32.000",
    hargaTertinggi: "Rp32.000",
    hargaTerendah: "Rp32.000",
    hargaRataRata: "Rp32.000",
    hargaKustom: "Rp32.000",
    grUnitCostId: "Rp32.000",
    remarks: "0468/VIII/18",
  },
  {
    sku: "100007",
    barcodeNo: "462884026385",
    namaItem: "Ranitidine 150 mg",
    kfa93no: "20240916",
    satuan: "Tablet",
    kuantitiDosis: "150 mg",
    grupDosis: "mg",
    hargaTerakhir: "Rp600",
    hargaTertinggi: "Rp600",
    hargaTerendah: "Rp600",
    hargaRataRata: "Rp600",
    hargaKustom: "Rp600",
    grUnitCostId: "Rp600",
    remarks: "ACY-IND-ADI-002",
  },
  {
    sku: "100008",
    barcodeNo: "726384471893",
    namaItem: "Ceftriaxone 1 g",
    kfa93no: "20240927",
    satuan: "Vial (Injeksi)",
    kuantitiDosis: "1 g",
    grupDosis: "g",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
    remarks: "-",
  },
  {
    sku: "100009",
    barcodeNo: "192883001874",
    namaItem: "Diazepam 5 mg",
    kfa93no: "20251209",
    satuan: "Tablet",
    kuantitiDosis: "5 mg",
    grupDosis: "mg",
    hargaTerakhir: "Rp10.800",
    hargaTertinggi: "Rp10.800",
    hargaTerendah: "Rp10.800",
    hargaRataRata: "Rp10.800",
    hargaKustom: "Rp10.800",
    grUnitCostId: "Rp10.800",
    remarks: "ALI-TAK-KAR-001",
  },
  {
    sku: "100010",
    barcodeNo: "858600045631",
    namaItem: "Metformin 500 mg",
    kfa93no: "20251209",
    satuan: "Tablet",
    kuantitiDosis: "500 mg",
    grupDosis: "mg",
    hargaTerakhir: "Rp27.500",
    hargaTertinggi: "Rp27.500",
    hargaTerendah: "Rp27.500",
    hargaRataRata: "Rp27.500",
    hargaKustom: "Rp27.500",
    grUnitCostId: "Rp27.500",
    remarks: "AMA-KAR-KAR",
  },
];

const TarifObatList = () => {
  const navigate = useNavigate();

  const columns: Array<TTableColumn<(typeof tarifObatData)[number]>> = [
    { id: "sku", label: "SKU", setContent: (data) => <span>{data.sku}</span> },
    {
      id: "barcodeNo",
      label: "BarcodeNo",
      setContent: (data) => <span>{data.barcodeNo}</span>,
    },
    {
      id: "namaItem",
      label: "Nama Item",
      setContent: (data) => <span>{data.namaItem}</span>,
    },
    {
      id: "kfa93no",
      label: "KFA93NO",
      setContent: (data) => <span>{data.kfa93no}</span>,
    },
    {
      id: "satuan",
      label: "Satuan",
      setContent: (data) => <span>{data.satuan}</span>,
    },
    {
      id: "kuantitiDosis",
      label: "Kuantiti Dosis",
      setContent: (data) => <span>{data.kuantitiDosis}</span>,
    },
    {
      id: "grupDosis",
      label: "Grup Dosis",
      setContent: (data) => <span>{data.grupDosis}</span>,
    },
    {
      id: "hargaTerakhir",
      label: "Harga Terakhir",
      setContent: (data) => <span>{data.hargaTerakhir}</span>,
    },
    {
      id: "hargaTertinggi",
      label: "Harga Tertinggi",
      setContent: (data) => <span>{data.hargaTertinggi}</span>,
    },
    {
      id: "hargaTerendah",
      label: "Harga Terendah",
      setContent: (data) => <span>{data.hargaTerendah}</span>,
    },
    {
      id: "hargaRataRata",
      label: "Harga Rata-rata",
      setContent: (data) => <span>{data.hargaRataRata}</span>,
    },
    {
      id: "hargaKustom",
      label: "Harga Kustom",
      setContent: (data) => <span>{data.hargaKustom}</span>,
    },
    {
      id: "grUnitCostId",
      label: "GRUnitCostID",
      setContent: (data) => <span>{data.grUnitCostId}</span>,
    },
    {
      id: "remarks",
      label: "Remarks",
      setContent: (data) => <span>{data.remarks}</span>,
    },

    {
      id: "grUnitCostId",
      label: "Aksi",
      setContent() {
        return (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-30">
                <Menu.Item>
                  <div
                    className="px-4 py-2 hover:bg-primary-200 flex gap-x-3 items-center cursor-pointer"
                    onClick={() => navigate("12/edit")}
                  >
                    <EditIcon />
                    Edit
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        );
      },
    },
  ];

  return (
    <ContentLayout
      title="Tarif Obat"
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
        </div>
      }
    >
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1600px] w-full">
          <Table
            data={tarifObatData}
            columns={columns}
            isLoading={false}
            pagination={{
              currentPage: 1,
              totalPages: 10,
              pageSize: 10,
              totalData: 10,
              onPageChange: (pageNumber) => {
                console.log(pageNumber);
              },
            }}
          />
        </div>
      </div>
    </ContentLayout>
  );
};

export default TarifObatList;
