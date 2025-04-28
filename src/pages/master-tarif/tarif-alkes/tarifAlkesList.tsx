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
import Chip, { TColor } from "../../../components/uiComponent/chip/chip";
const tarifAlkesData = [
  {
    id: 1,
    sku: "100001",
    barcode: "142830617896",
    namaItem: "Stetoskop",
    kategori: "Diagnostik",
    merek: "Littmann",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Aktif",
    hargaTerakhir: "Rp8.750",
    hargaTertinggi: "Rp8.750",
    hargaTerendah: "Rp8.750",
    hargaRataRata: "Rp8.750",
    hargaKustom: "Rp8.750",
    grUnitCostId: "Rp8.750",
  },
  {
    id: 2,
    sku: "100002",
    barcode: "544900012398",
    namaItem: "Tensimeter",
    kategori: "Diagnostik",
    merek: "Omron",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "20 Oct 2024",
    status: "Dalam Perbaikan",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
  },
  {
    id: 3,
    sku: "100003",
    barcode: "748930029845",
    namaItem: "Termometer digital",
    kategori: "Diagnostik",
    merek: "Microlife",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Tidak Digunakan",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
  },
  {
    id: 4,
    sku: "100004",
    barcode: "616950030547",
    namaItem: "Infus set",
    kategori: "Terapi",
    merek: "OneMed",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "20 Oct 2024",
    status: "Success",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
  },
  {
    id: 5,
    sku: "100005",
    barcode: "938294461379",
    namaItem: "Monitor pasien",
    kategori: "Monitoring",
    merek: "Philips",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "17 Oct 2024",
    status: "Success",
    hargaTerakhir: "Rp4.600",
    hargaTertinggi: "Rp4.600",
    hargaTerendah: "Rp4.600",
    hargaRataRata: "Rp4.600",
    hargaKustom: "Rp4.600",
    grUnitCostId: "Rp4.600",
  },
  {
    id: 6,
    sku: "100006",
    barcode: "836185327691",
    namaItem: "Pulse oximeter",
    kategori: "Diagnostik",
    merek: "Beurer",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "18 Oct 2024",
    status: "Success",
    hargaTerakhir: "Rp32.000",
    hargaTertinggi: "Rp32.000",
    hargaTerendah: "Rp32.000",
    hargaRataRata: "Rp32.000",
    hargaKustom: "Rp32.000",
    grUnitCostId: "Rp32.000",
  },
  {
    id: 7,
    sku: "100007",
    barcode: "462884026385",
    namaItem: "Nebulizer",
    kategori: "Terapi Pernapasan",
    merek: "Omron",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Success",
    hargaTerakhir: "Rp600",
    hargaTertinggi: "Rp600",
    hargaTerendah: "Rp600",
    hargaRataRata: "Rp600",
    hargaKustom: "Rp600",
    grUnitCostId: "Rp600",
  },
  {
    id: 8,
    sku: "100008",
    barcode: "726384471893",
    namaItem: "Elektrokardiogram",
    kategori: "Diagnostik",
    merek: "GE Healthcare",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Success",
    hargaTerakhir: "-",
    hargaTertinggi: "-",
    hargaTerendah: "-",
    hargaRataRata: "-",
    hargaKustom: "-",
    grUnitCostId: "-",
  },
  {
    id: 9,
    sku: "100009",
    barcode: "192883001874",
    namaItem: "Defibrillator",
    kategori: "Gawat Darurat",
    merek: "Zoll",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "17 Oct 2024",
    status: "Success",
    hargaTerakhir: "Rp10.800",
    hargaTertinggi: "Rp10.800",
    hargaTerendah: "Rp10.800",
    hargaRataRata: "Rp10.800",
    hargaKustom: "Rp10.800",
    grUnitCostId: "Rp10.800",
  },
  {
    id: 10,
    sku: "100010",
    barcode: "858600045631",
    namaItem: "Tempat tidur pasien elektrik",
    kategori: "Perawatan",
    merek: "Hill-Rom",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "20 Oct 2024",
    status: "Success",
    hargaTerakhir: "Rp27.500",
    hargaTertinggi: "Rp27.500",
    hargaTerendah: "Rp27.500",
    hargaRataRata: "Rp27.500",
    hargaKustom: "Rp27.500",
    grUnitCostId: "Rp27.500",
  },
];

const TarifAlkesList = () => {
  const navigate = useNavigate();

  const columns: Array<TTableColumn<(typeof tarifAlkesData)[number]>> = [
    {
      id: "sku",
      label: "SKU",
      setContent: (data) => <span>{data.sku}</span>,
    },
    {
      id: "barcode",
      label: "Barcode",
      setContent: (data) => <span>{data.barcode}</span>,
    },
    {
      id: "namaItem",
      label: "Nama Item",
      setContent: (data) => <span>{data.namaItem}</span>,
    },
    {
      id: "kategori",
      label: "Kategori",
      setContent: (data) => <span>{data.kategori}</span>,
    },
    {
      id: "merek",
      label: "Merek",
      setContent: (data) => <span>{data.merek}</span>,
    },
    {
      id: "lokasi",
      label: "Lokasi",
      setContent: (data) => <span>{data.lokasi}</span>,
    },
    {
      id: "tahunPembelian",
      label: "Tahun Pembelian",
      setContent: (data) => <span>{data.tahunPembelian}</span>,
    },
    {
      id: "status",
      label: "Status",
      setContent(data) {
        const colorVariants: Record<string, TColor> = {
          Aktif: "success",
          "Dalam Perbaikan": "info",
          "Tidak Digunakan": "warning",
          Success: "success",
        };
        return <Chip value={data.status} color={colorVariants[data.status]} />;
      },
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
      id: "id",
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
      title="Tarif Alat Kesehatan"
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
        <div className="min-w-[1900px] w-full">
          <Table
            data={tarifAlkesData}
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

export default TarifAlkesList;
