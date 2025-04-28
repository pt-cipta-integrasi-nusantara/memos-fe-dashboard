import { ContentLayout } from "../../../components";
import {
  Button,
  IconButton,
  Table,
  TTableColumn,
} from "../../../components/uiComponent";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "../../../components/uiComponent/dialog";
import {
  DeleteIcon,
  EditIcon,
  FilterListIcon,
  MoreHorizIcon,
  SearchIcon,
} from "../../../components/iconsComponent";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { TextField } from "../../../components/uiComponent/textField";
import { Chip } from "../../../components/uiComponent/chip";
import { TColor } from "../../../components/uiComponent/chip/chip";

const itemAlatKesehatanData = [
  {
    sku: "100001",
    barcode: "142830617896",
    namaItem: "Stetoskop",
    kategori: "Diagnostik",
    merek: "Littmann",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Aktif",
  },
  {
    sku: "100002",
    barcode: "544900012398",
    namaItem: "Tensimeter",
    kategori: "Diagnostik",
    merek: "Omron",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "20 Oct 2024",
    status: "Dalam Perbaikan",
  },
  {
    sku: "100003",
    barcode: "748930029845",
    namaItem: "Termometer digital",
    kategori: "Diagnostik",
    merek: "Microlife",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Tidak Digunakan",
  },
  {
    sku: "100004",
    barcode: "616950030547",
    namaItem: "Infus set",
    kategori: "Terapi",
    merek: "OneMed",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "20 Oct 2024",
    status: "Success",
  },
  {
    sku: "100005",
    barcode: "938294461379",
    namaItem: "Monitor pasien",
    kategori: "Monitoring",
    merek: "Philips",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "17 Oct 2024",
    status: "Success",
  },
  {
    sku: "100006",
    barcode: "836185327691",
    namaItem: "Pulse oximeter",
    kategori: "Diagnostik",
    merek: "Beurer",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "18 Oct 2024",
    status: "Success",
  },
  {
    sku: "100007",
    barcode: "462884026385",
    namaItem: "Nebulizer",
    kategori: "Terapi Pernapasan",
    merek: "Omron",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Success",
  },
  {
    sku: "100008",
    barcode: "726384471893",
    namaItem: "Elektrokardiogram",
    kategori: "Diagnostik",
    merek: "GE Healthcare",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "19 Oct 2024",
    status: "Success",
  },
  {
    sku: "100009",
    barcode: "192883001874",
    namaItem: "Defibrillator",
    kategori: "Gawat Darurat",
    merek: "Zoll",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "17 Oct 2024",
    status: "Success",
  },
  {
    sku: "100010",
    barcode: "858600045631",
    namaItem: "Tempat tidur pasien elektrik",
    kategori: "Perawatan",
    merek: "Hill-Rom",
    lokasi: "Bedah, Dept, +12 Lainnya",
    tahunPembelian: "20 Oct 2024",
    status: "Success",
  },
];

const ItemAlatKesehatanList = () => {
  const navigate = useNavigate();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const columns: Array<TTableColumn<(typeof itemAlatKesehatanData)[number]>> = [
    { id: "sku", label: "SKU", setContent: (data) => <span>{data.sku}</span> },
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
      id: "sku",
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
                    onClick={() => navigate("12")}
                  >
                    <EditIcon />
                    Edit
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    className="px-4 py-2 hover:bg-primary-200 flex gap-x-3 items-center text-primary-500 cursor-pointer"
                    onClick={() => setIsDeleteDialog(true)}
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

  return (
    <ContentLayout
      title="Item Alat Kesehatan"
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
            title="Tambah Item"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => navigate("create")}
          />
        </div>
      }
    >
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1100px] w-full">
          <Table
            data={itemAlatKesehatanData}
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

      <Dialog
        open={isDeleteDialog}
        onClose={() => setIsDeleteDialog(false)}
        actionProps={{
          cancelButtonProps: {
            className: "w-full",
          },
          submitButtonProps: {
            label: "Hapus",
            className: "w-full",
            onClick() {
              setIsDeleteDialog(false);
            },
          },
        }}
      >
        <div className="w-ful py-8 flex flex-col">
          <h5 className="text-[20px] font-bold text-[#31475E] text-center">
            Apakah Anda yakin ingin menghapus item ‘Termometer digital’?
          </h5>
          <p className="text-[#677A8E] text-[16px] text-center">
            Klik 'Hapus' untuk mengonfirmasi tindakan ini. Perubahan tidak dapat
            dibatalkan.
          </p>
        </div>
      </Dialog>
    </ContentLayout>
  );
};

export default ItemAlatKesehatanList;
