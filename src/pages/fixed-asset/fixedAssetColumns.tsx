import { Fragment } from "react";
import { TTableColumn } from "../../components";
import {
  DeleteIcon,
  EditIcon,
  MoreHorizIcon,
} from "../../components/iconsComponent";
import { Menu, Transition } from "@headlessui/react";

export const fixedAssetData = [
  {
    id: "FA-001",
    barcode: "192883001874",
    namaAsset: "Monitor Jantung (EKG)",
    kategori: "Elektronik",
    tanggalPembelian: "2023-08-10",
    hargaPembelian: "IDR 15.000.000",
    nilaiBuku: "IDR 10.000.000",
    status: "Aktif",
  },
  {
    id: "FA-002",
    barcode: "142830617896",
    namaAsset: "Monitor Jantung (EKG)",
    kategori: "Elektronik",
    tanggalPembelian: "2023-03-25",
    hargaPembelian: "IDR 2.000.000",
    nilaiBuku: "IDR 1.500.000",
    status: "Aktif",
  },
  {
    id: "FA-003",
    barcode: "616950030547",
    namaAsset: "Ventilator",
    kategori: "Elektronik",
    tanggalPembelian: "2022-12-01",
    hargaPembelian: "IDR 3.000.000",
    nilaiBuku: "IDR 2.500.000",
    status: "Tidak Digunakan",
  },
  {
    id: "FA-004",
    barcode: "836185327691",
    namaAsset: "Kursi Roda",
    kategori: "Elektronik",
    tanggalPembelian: "2022-07-20",
    hargaPembelian: "IDR 5.000.000",
    nilaiBuku: "IDR 4.500.000",
    status: "Dijual",
  },
  {
    id: "FA-005",
    barcode: "462884026385",
    namaAsset: "Gurney (Tandu)",
    kategori: "Furniture",
    tanggalPembelian: "2022-01-01",
    hargaPembelian: "IDR 3.500.000",
    nilaiBuku: "IDR 3.000.000",
    status: "Dipensiunkan",
  },
  {
    id: "FA-006",
    barcode: "748930029845",
    namaAsset: "Tempat Tidur Medis",
    kategori: "Elektronik",
    tanggalPembelian: "2021-09-05",
    hargaPembelian: "IDR 8.000.000",
    nilaiBuku: "IDR 7.000.000",
    status: "Dipinjamkan",
  },
  {
    id: "FA-007",
    barcode: "544900012398",
    namaAsset: "Alat Pemantau Tekanan Darah",
    kategori: "Elektronik",
    tanggalPembelian: "2021-06-15",
    hargaPembelian: "IDR 10.000.000",
    nilaiBuku: "IDR 9.000.000",
    status: "Hilang",
  },
  {
    id: "FA-008",
    barcode: "858600045631",
    namaAsset: "Komputer untuk Rekam Medis",
    kategori: "Elektronik",
    tanggalPembelian: "2021-05-30",
    hargaPembelian: "IDR 25.000.000",
    nilaiBuku: "IDR 23.000.000",
    status: "Rusak Total",
  },
  {
    id: "FA-009",
    barcode: "938294461379",
    namaAsset: "Alat Resusitasi (Ambu Bag)",
    kategori: "Furniture",
    tanggalPembelian: "2020-11-15",
    hargaPembelian: "IDR 1.500.000",
    nilaiBuku: "IDR 1.200.000",
    status: "Aktif",
  },
  {
    id: "FA-010",
    barcode: "726384471893",
    namaAsset: "Lampu Bedah",
    kategori: "Elektronik",
    tanggalPembelian: "2020-03-10",
    hargaPembelian: "IDR 7.000.000",
    nilaiBuku: "IDR 6.000.000",
    status: "Disewakan",
  },
];

interface FixedAssetColumnsProps {
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const FixedAssetColumns = ({ onUpdate, onDelete }: FixedAssetColumnsProps) => {
  const columns: Array<TTableColumn<(typeof fixedAssetData)[number]>> = [
    {
      id: "id",
      label: "ID",
      setContent(data) {
        return <span>{data.id}</span>;
      },
    },
    {
      id: "barcode",
      label: "Barcode",
      setContent(data) {
        return <span>{data.barcode}</span>;
      },
    },
    {
      id: "namaAsset",
      label: "Nama Asset",
      setContent(data) {
        return <span>{data.namaAsset}</span>;
      },
    },
    {
      id: "kategori",
      label: "Kategori",
      setContent(data) {
        return <span>{data.kategori}</span>;
      },
    },
    {
      id: "tanggalPembelian",
      label: "Tanggal Pembelian",
      setContent(data) {
        return <span>{data.tanggalPembelian}</span>;
      },
    },
    {
      id: "hargaPembelian",
      label: "Harga Pembelian",
      setContent(data) {
        return <span>{data.hargaPembelian}</span>;
      },
    },
    {
      id: "nilaiBuku",
      label: "Nilai Buku",
      setContent(data) {
        return <span>{data.nilaiBuku}</span>;
      },
    },
    {
      id: "status",
      label: "Status",
      setContent(data) {
        return <span>{data.status}</span>;
      },
    },

    {
      id: "id",
      label: "Aksi",
      align: "right",
      setContent(data) {
        return (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="hover:bg-[#0000000a] active:bg-[#00000021] w-8 h-8 rounded-[50%] flex justify-center items-center">
              <MoreHorizIcon />
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
                    onClick={() => onUpdate(data.id)}
                  >
                    <EditIcon />
                    Edit
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    className="px-4 py-2 hover:bg-primary-200 flex gap-x-3 items-center text-primary-500 cursor-pointer"
                    onClick={() => onDelete(data.id)}
                  >
                    <DeleteIcon />
                    Delete
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        );
      },
    },
  ];
  return columns;
};

export default FixedAssetColumns;
