import React, { Fragment, useState } from "react";
import { ContentLayout } from "../../components";
import {
  Button,
  IconButton,
  Table,
  TTableColumn,
} from "../../components/uiComponent";
import { TextField } from "../../components/uiComponent/textField";
import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  FilterListIcon,
  MoreHorizIcon,
  SearchIcon,
} from "../../components/iconsComponent";
import { Dialog } from "../../components/uiComponent/dialog";
import { Checkbox } from "../../components/uiComponent/checkbox";
import { Toggle } from "../../components/uiComponent/toggle";
import { Menu, Transition } from "@headlessui/react";
import { Chip } from "../../components/uiComponent/chip";

const itemPelayananData = [
  { id: 93457, item: "Pasang Infus", isPackage: false, status: "Active" },
  {
    id: 10708,
    item: "Paket SC (4 Hari 3 Malam)",
    isPackage: true,
    status: "Active",
  },
  {
    id: 23340,
    item: "Paket Curretage DENGAN PENYULIT / EMERGENCY (ODC / Langsung Pulang)",
    isPackage: true,
    status: "Active",
  },
  {
    id: 39235,
    item: "Paket Curretage TANPA PENYULIT (2 Hari 1 Malam)",
    isPackage: true,
    status: "Active",
  },
  {
    id: 20796,
    item: "PAKET JAHIT ULANG SC (ONE DAY CARE)",
    isPackage: true,
    status: "Active",
  },
  {
    id: 50963,
    item: "Paket Curretage TANPA PENYULIT (2 Hari 1 Malam)",
    isPackage: true,
    status: "Active",
  },
  { id: 61391, item: "POLIKLINIK THT", isPackage: false, status: "Active" },
  { id: 45904, item: "IGD", isPackage: false, status: "Active" },
  { id: 3398, item: "IGD PONEK", isPackage: false, status: "Active" },
  { id: 4339, item: "RAWAT INAP", isPackage: false, status: "Active" },
];

const ItemPelayananList = () => {
  const [isFormDialog, setIsFormDialog] = useState(false);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const columns: Array<TTableColumn<(typeof itemPelayananData)[number]>> = [
    {
      id: "id",
      label: "ID",
      setContent(data) {
        return <span>{data.id}</span>;
      },
    },
    {
      id: "item",
      label: "Item Pelayanan",
      setContent(data) {
        return <span>{data.item}</span>;
      },
    },
    {
      id: "isPackage",
      label: "Is Package",
      setContent(data) {
        if (data.isPackage) return <CheckIcon />;

        return <span>-</span>;
      },
    },
    {
      id: "status",
      label: "Status",
      setContent(data) {
        return <Chip value={data.status} color={"success"} />;
      },
    },
    {
      id: "id",
      label: "Aksi",
      setContent(data) {
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
      title="Item Pelayanan"
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
            title="Tambah Item Pelayanan"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => setIsFormDialog(true)}
          />
        </div>
      }
    >
      <Table
        data={itemPelayananData}
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
        open={isFormDialog}
        onClose={() => setIsFormDialog(false)}
        title="Tambah Item Pelayanan"
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
        <div className="w-ful py-3 flex flex-col gap-y-6">
          <TextField
            label="Nama Item Pelayanan"
            required
            placeholder="Pasang Infus"
          />
          <div className="flex gap-6">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Is Package
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Checkbox
                label="Yes"
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Status
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Toggle
                label="Active"
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
              />
            </div>
          </div>
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
        <div className="w-ful py-8 flex flex-col">
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

export default ItemPelayananList;
