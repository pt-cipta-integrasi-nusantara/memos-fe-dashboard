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

const tarifPaketData = [
  {
    id: 1,
    grupPenjamin: "Umum",
    kelas: "VIP",
    unitPelayanan: "Rawat Inap",
    paket: "Paket SC (4 Hari 3 Malam)",
    hargaTotal: "IDR 11.440.000",
    validSince: "05-09-2020",
  },
  {
    id: 2,
    grupPenjamin: "Umum",
    kelas: "KELAS I",
    unitPelayanan: "Rawat Inap",
    paket: "PAKET SC (4 Hari 3 Malam) Emergency",
    hargaTotal: "IDR 12.100.000",
    validSince: "30-04-2020",
  },
  {
    id: 3,
    grupPenjamin: "Umum",
    kelas: "KELAS II",
    unitPelayanan: "Rawat Inap",
    paket: "Paket PSP (2 Hari 1 Malam)",
    hargaTotal: "IDR 5.170.000",
    validSince: "23-04-2020",
  },
  {
    id: 4,
    grupPenjamin: "Umum",
    kelas: "KELAS III",
    unitPelayanan: "Rawat Inap",
    paket: "Paket Curretage TANPA PENYULIT (ODC / Langsung Pulang)",
    hargaTotal: "IDR 4.235.000",
    validSince: "26-05-2020",
  },
  {
    id: 5,
    grupPenjamin: "Umum",
    kelas: "PERINATOLOGY",
    unitPelayanan: "Rawat Inap",
    paket:
      "Paket Curretage DENGAN PENYULIT / EMERGENCY (ODC / Langsung Pulang)",
    hargaTotal: "IDR 4.620.000",
    validSince: "17-06-2020",
  },
  {
    id: 6,
    grupPenjamin: "Umum",
    kelas: "PBRT",
    unitPelayanan: "Rawat Inap",
    paket: "Paket Curretage TANPA PENYULIT (2 Hari 1 Malam)",
    hargaTotal: "IDR 5.060.000",
    validSince: "15-04-2020",
  },
  {
    id: 7,
    grupPenjamin: "Umum",
    kelas: "HCU",
    unitPelayanan: "Rawat Inap",
    paket: "PAKET JAHIT ULANG SC (ONE DAY CARE)",
    hargaTotal: "IDR 4.950.000",
    validSince: "05-06-2020",
  },
  {
    id: 8,
    grupPenjamin: "PIHAK III",
    kelas: "VIP",
    unitPelayanan: "Rawat Inap",
    paket: "Paket Manual Plasenta (ODC / Langsung Pulang) Pakai Anestesi",
    hargaTotal: "IDR 3.724.000",
    validSince: "12-05-2020",
  },
  {
    id: 9,
    grupPenjamin: "PIHAK III",
    kelas: "KELAS I",
    unitPelayanan: "Rawat Inap",
    paket: "Paket Curretage TANPA PENYULIT (2 Hari 1 Malam)",
    hargaTotal: "IDR 5.983.000",
    validSince: "29-06-2020",
  },
  {
    id: 10,
    grupPenjamin: "PIHAK III",
    kelas: "KELAS II",
    unitPelayanan: "Rawat Inap",
    paket: "Paket Curretage TANPA PENYULIT (ODC / Langsung Pulang)",
    hargaTotal: "IDR 2.788.000",
    validSince: "01-09-2020",
  },
];

const TarifPaketList = () => {
  const navigate = useNavigate();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);

  const columns: Array<TTableColumn<(typeof tarifPaketData)[number]>> = [
    {
      id: "grupPenjamin",
      label: "Grup Penjamin",
      setContent: (data) => (
        <span onClick={() => navigate("12")} className="cursor-pointer">
          {data.grupPenjamin}
        </span>
      ),
    },
    {
      id: "kelas",
      label: "Kelas",
      setContent: (data) => (
        <span onClick={() => navigate("12")} className="cursor-pointer">
          {data.kelas}
        </span>
      ),
    },
    {
      id: "unitPelayanan",
      label: "Unit Pelayanan",
      setContent: (data) => (
        <span onClick={() => navigate("12")} className="cursor-pointer">
          {data.unitPelayanan}
        </span>
      ),
    },
    {
      id: "paket",
      label: "Paket",
      setContent: (data) => (
        <span onClick={() => navigate("12")} className="cursor-pointer">
          {data.paket}
        </span>
      ),
    },
    {
      id: "hargaTotal",
      label: "Harga Total",
      setContent: (data) => (
        <span onClick={() => navigate("12")} className="cursor-pointer">
          {data.hargaTotal}
        </span>
      ),
    },
    {
      id: "validSince",
      label: "Valid Since",
      setContent: (data) => (
        <span onClick={() => navigate("12")} className="cursor-pointer">
          {data.validSince}
        </span>
      ),
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
      title="Tarif Paket"
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
            title="Tambah Tarif Paket"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => navigate("create")}
          />
        </div>
      }
    >
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1100px] w-full">
          <Table
            data={tarifPaketData}
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
            Apakah Anda yakin ingin menghapus tarif pelayanan?
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

export default TarifPaketList;
