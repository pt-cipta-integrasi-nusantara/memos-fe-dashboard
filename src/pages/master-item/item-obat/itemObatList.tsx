import { Fragment, useState } from "react";
import { Button, ContentLayout } from "../../../components";
import {
  IconButton,
  Table,
  TTableColumn,
} from "../../../components/uiComponent";
import {
  DeleteIcon,
  EditIcon,
  FilterListIcon,
  MoreHorizIcon,
  SearchIcon,
} from "../../../components/iconsComponent";
import { TextField } from "../../../components/uiComponent/textField";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "../../../components/uiComponent/dialog";

const itemObatData = [
  {
    itemObat: 100001,
    barcode: "142830617896",
    namaItem: "Paracetamol 500 mg",
    sku: "20240981",
    satuan: "Tablet",
    kuantitiDosis: "500 mg",
    grupDosis: "mg",
    remarks: "ALP-OTT-ADI-001",
  },
  {
    itemObat: 100002,
    barcode: "544900012398",
    namaItem: "Ibuprofen 400 mg",
    sku: "20240909",
    satuan: "Tablet",
    kuantitiDosis: "400 mg",
    grupDosis: "mg",
    remarks: "ALL-HEX-ADI-001",
  },
  {
    itemObat: 100003,
    barcode: "748930029845",
    namaItem: "Amoxicillin 500 mg",
    sku: "20240977",
    satuan: "Kapsul",
    kuantitiDosis: "500 mg",
    grupDosis: "mg",
    remarks: "ALL-IND-ADI-001",
  },
  {
    itemObat: 100004,
    barcode: "616950030547",
    namaItem: "Omeprazole 20 mg",
    sku: "20240936",
    satuan: "Kapsul",
    kuantitiDosis: "20 mg",
    grupDosis: "mg",
    remarks: "ACE-NOV-ADI-001",
  },
  {
    itemObat: 100005,
    barcode: "938294461379",
    namaItem: "Salbutamol 2 mg",
    sku: "20240916",
    satuan: "Tablet",
    kuantitiDosis: "2 mg",
    grupDosis: "mg",
    remarks: "ALB-IND-ADI-001",
  },
  {
    itemObat: 100006,
    barcode: "836185327691",
    namaItem: "Captopril 25 mg",
    sku: "20240995",
    satuan: "Tablet",
    kuantitiDosis: "25 mg",
    grupDosis: "mg",
    remarks: "0468/VIII/18",
  },
  {
    itemObat: 100007,
    barcode: "462884026385",
    namaItem: "Ranitidine 150 mg",
    sku: "20240916",
    satuan: "Tablet",
    kuantitiDosis: "150 mg",
    grupDosis: "mg",
    remarks: "ACY-IND-ADI-002",
  },
  {
    itemObat: 100008,
    barcode: "726384471893",
    namaItem: "Ceftriaxone 1 g",
    sku: "20240927",
    satuan: "Vial (Injeksi)",
    kuantitiDosis: "1 g",
    grupDosis: "g",
    remarks: "ALP-OGB-ADI-001",
  },
  {
    itemObat: 100009,
    barcode: "192883001874",
    namaItem: "Diazepam 5 mg",
    sku: "20251209",
    satuan: "Tablet",
    kuantitiDosis: "5 mg",
    grupDosis: "mg",
    remarks: "ALI-TAK-KAR-001",
  },
  {
    itemObat: 100010,
    barcode: "858600045631",
    namaItem: "Metformin 500 mg",
    sku: "20251209",
    satuan: "Tablet",
    kuantitiDosis: "500 mg",
    grupDosis: "mg",
    remarks: "AMA-KAR-KAR",
  },
];

const ItemObatList = () => {
  const navigate = useNavigate();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const columns: Array<TTableColumn<(typeof itemObatData)[number]>> = [
    {
      id: "sku",
      label: "SKU",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.itemObat}
        </span>
      ),
    },

    {
      id: "barcode",
      label: "Barcode",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.barcode}
        </span>
      ),
    },
    {
      id: "namaItem",
      label: "Nama Item",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.namaItem}
        </span>
      ),
    },
    {
      id: "sku",
      label: "KFA93NO",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.sku}
        </span>
      ),
    },
    {
      id: "satuan",
      label: "Satuan",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.satuan}
        </span>
      ),
    },
    {
      id: "kuantitiDosis",
      label: "Kuantiti Dosis",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.kuantitiDosis}
        </span>
      ),
    },
    {
      id: "grupDosis",
      label: "Grup Dosis",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.grupDosis}
        </span>
      ),
    },
    {
      id: "remarks",
      label: "Remarks",
      setContent: (data) => (
        <span
          className="cursor-pointer"
          onClick={() => navigate(`${data.itemObat}/lokasi`)}
        >
          {data.remarks}
        </span>
      ),
    },
    {
      id: "itemObat",
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
      title="Item Obat"
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
      <Table
        data={itemObatData}
        columns={columns}
        isLoading={false}
        pagination={{
          currentPage: 1,
          totalPages: 10,
          onPageChange: (pageNumber) => {
            console.log(pageNumber);
          },
        }}
      />

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
            Apakah Anda yakin ingin menghapus item ‘Paracetamol 500 mg’?
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

export default ItemObatList;
