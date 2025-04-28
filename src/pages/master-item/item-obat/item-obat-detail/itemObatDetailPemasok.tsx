import { Fragment, useState } from "react";
import {
  Button,
  ContentLayout,
  IconButton,
  Table,
  TTableColumn,
} from "../../../../components";
import {
  DeleteIcon,
  EditIcon,
  FilterListIcon,
  MoreHorizIcon,
  SearchIcon,
} from "../../../../components/iconsComponent";
import { TextField } from "../../../../components/uiComponent/textField";
import { Dialog } from "../../../../components/uiComponent/dialog";
import { Menu, Transition } from "@headlessui/react";
import { Select } from "../../../../components/uiComponent/select";

const pemasokData = [
  {
    id: 1,
    fabricId: "20240909",
    pemasok: "PT Kalbe Farma Tbk",
    kuantitiPembelian: "DUS",
    unitPrice: "IDR 50.000 /DUS",
    quantityKonversi: "50.000 butir",
  },
  {
    id: 2,
    fabricId: "20240909",
    pemasok: "PT Kimia Farma Tbk",
    kuantitiPembelian: "DUS",
    unitPrice: "IDR 50.000 /DUS",
    quantityKonversi: "5.000 butir",
  },
  {
    id: 3,
    fabricId: "20240977",
    pemasok: "PT Bio Farma (Persero)",
    kuantitiPembelian: "DUS",
    unitPrice: "IDR 50.000 /DUS",
    quantityKonversi: "10.000 butir",
  },
  {
    id: 4,
    fabricId: "20240936",
    pemasok: "PT Sanbe Farma",
    kuantitiPembelian: "DUS",
    unitPrice: "IDR 50.000 /DUS",
    quantityKonversi: "3.000 butir",
  },
  {
    id: 5,
    fabricId: "20240916",
    pemasok: "PT Dexa Medica",
    kuantitiPembelian: "DUS",
    unitPrice: "IDR 50.000 /DUS",
    quantityKonversi: "1.000 butir",
  },
  {
    id: 6,
    fabricId: "20240995",
    pemasok: "PT Anugerah Pharmindo Lestari",
    kuantitiPembelian: "DUS",
    unitPrice: "IDR 50.000 /DUS",
    quantityKonversi: "0 butir",
  },
  {
    id: 7,
    fabricId: "20240916",
    pemasok: "PT Bina San Prima",
    kuantitiPembelian: "DUS",
    unitPrice: "IDR 50.000 /DUS",
    quantityKonversi: "2.000 butir",
  },
];

const ItemObatDetailPemasok = () => {
  const [isFormDialog, setIsFormDialog] = useState(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const columns: Array<TTableColumn<(typeof pemasokData)[number]>> = [
    {
      id: "fabricId",
      label: "Fabric ID",
      setContent: (data) => <span>{data.fabricId}</span>,
    },
    {
      id: "pemasok",
      label: "Pemasok",
      setContent: (data) => <span>{data.pemasok}</span>,
    },
    {
      id: "kuantitiPembelian",
      label: "Kuantiti Pembelian",
      setContent: (data) => <span>{data.kuantitiPembelian}</span>,
    },
    {
      id: "unitPrice",
      label: "Unit Price",
      setContent: (data) => <span>{data.unitPrice}</span>,
    },
    {
      id: "quantityKonversi",
      label: "Quantity Konversi",
      setContent: (data) => <span>{data.quantityKonversi}</span>,
    },
    {
      id: "id",
      label: "Aksi",
      align: "right",
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
                    onClick={() => setIsFormDialog(true)}
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
      actions={
        <div className="flex gap-x-4 items-center justify-between w-full">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-[10px]" />
            <TextField
              placeholder="Cari Item"
              className="pl-10 rounded-[99px]"
            />
          </div>
          <div className="flex gap-4 justify-end">
            <button className="rounded-[99px] space-x-2 border border-subtle px-4 py-2 flex">
              <FilterListIcon />
              <span className="text-default font-bold text-[14px]">Filter</span>
            </button>

            <Button
              title="Tambah Pemasok"
              className="text-white bg-primary-500 min-h-0"
              onClick={() => setIsFormDialog(true)}
            />
          </div>
        </div>
      }
    >
      <Table
        data={pemasokData}
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
      <Dialog
        open={isFormDialog}
        onClose={() => setIsFormDialog(false)}
        title="Tambah Pemasok"
        actionProps={{
          cancelButtonProps: {
            className: "w-full",
          },
          submitButtonProps: {
            label: "Tambahkan",
            className: "w-full",
            onClick() {
              setIsFormDialog(false);
            },
          },
        }}
      >
        <div className="w-full py-3 flex flex-col gap-y-4">
          <Select
            options={[]}
            label="Pemasok"
            required
            placeholder="Pilih Pemasok"
          />
          <Select
            options={[]}
            label="Kuantiti Pembelian"
            required
            placeholder="Pilih Kuantiti Pembelian"
          />
          <TextField label="Harga Pembelian" required placeholder="0" />
        </div>
      </Dialog>

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
        <div className="w-full py-8 flex flex-col">
          <h5 className="text-[20px] font-bold text-[#31475E] text-center">
            Apakah Anda yakin ingin menghapus item pelayanan ‘Pasang Infus’?
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

export default ItemObatDetailPemasok;
