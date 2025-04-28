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
import { cn } from "../../../utils/classnamesHelper";
export const tarifTindakanData = [
  {
    id: 1,
    grupPenjamin: "Umum",
    kelas: "KELAS I",
    grupPelayanan: "POLIKLINIK PENYAKIT DALAM",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 2100,
    validSince: "2020-04-30",
  },
  {
    id: 2,
    grupPenjamin: "Umum",
    kelas: "KELAS II",
    grupPelayanan: "POLIKLINIK PENYAKIT DALAM",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 10800,
    validSince: "2020-04-23",
  },
  {
    id: 3,
    grupPenjamin: "Umum",
    kelas: "KELAS III",
    grupPelayanan: "Rawat Inap",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 29800,
    validSince: "2020-05-26",
  },
  {
    id: 4,
    grupPenjamin: "Umum",
    kelas: "PERINATOLOGY",
    grupPelayanan: "Perinatology",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 600,
    validSince: "2020-06-17",
  },
  {
    id: 5,
    grupPenjamin: "Umum",
    kelas: "PBRT",
    grupPelayanan: "PBRT",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 1500,
    validSince: "2020-04-15",
  },
  {
    id: 6,
    grupPenjamin: "Umum",
    kelas: "HCU",
    grupPelayanan: "HCU",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 22300,
    validSince: "2020-06-05",
  },
  {
    id: 7,
    grupPenjamin: "PIHAK III",
    kelas: "VIP",
    grupPelayanan: "Rawat Inap",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 600,
    validSince: "2020-05-12",
  },
  {
    id: 8,
    grupPenjamin: "PIHAK III",
    kelas: "KELAS I",
    grupPelayanan: "Rawat Inap",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 4600,
    validSince: "2020-06-29",
  },
  {
    id: 9,
    grupPenjamin: "PIHAK III",
    kelas: "KELAS II",
    grupPelayanan: "Rawat Inap",
    itemPelayanan: "TARIF KAMAR DASAR",
    tarifPelayanan: 3900,
    validSince: "2020-09-01",
  },
];

const tarifBhpData = [
  {
    namaProduk: "Infus",
    quantity: 2,
  },
  {
    namaProduk: "Selang Infus",
    quantity: 1,
  },
];

const TarifTindakanList = () => {
  const navigate = useNavigate();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);
  const [tabList, setTabList] = useState<"tarif-bhp" | "jasa-medis">(
    "tarif-bhp"
  );
  const columns: Array<TTableColumn<(typeof tarifTindakanData)[number]>> = [
    {
      id: "grupPenjamin",
      label: "Grup Penjamin",
      setContent: (data) => <span>{data.grupPenjamin}</span>,
    },
    {
      id: "kelas",
      label: "Kelas",
      setContent: (data) => <span>{data.kelas}</span>,
    },
    {
      id: "grupPelayanan",
      label: "Grup Pelayanan",
      setContent: (data) => <span>{data.grupPelayanan}</span>,
    },
    {
      id: "itemPelayanan",
      label: "Item Pelayanan",
      setContent: (data) => <span>{data.itemPelayanan}</span>,
    },
    {
      id: "tarifPelayanan",
      label: "Tarif Pelayanan",
      setContent: (data) => (
        <span>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.tarifPelayanan)}
        </span>
      ),
    },
    {
      id: "validSince",
      label: "Valid Since",
      setContent: (data) => <span>{data.validSince}</span>,
    },
    {
      id: "grupPelayanan",
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
                    onClick={() => navigate("edit-id")}
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

  const columnsCollapse: Array<TTableColumn<(typeof tarifBhpData)[number]>> = [
    {
      id: "namaProduk",
      label: "Nama Produk",
      width: "30%",
      align: "left",
      setContent: (data) => (
        <span className="font-normal">{data.namaProduk}</span>
      ),
    },
    {
      id: "quantity",
      label: "Quantity",
      width: "70%",
      align: "left",
      setContent: (data) => (
        <span className="font-normal">{data.quantity}</span>
      ),
    },
  ];

  return (
    <ContentLayout
      title="Tarif Tindakan"
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
            title="Tambah Tarif Tindakan"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => navigate("create")}
          />
        </div>
      }
    >
      <Table
        data={tarifTindakanData}
        columns={columns}
        collapseContent={
          <div>
            <div className="bg-white flex ">
              <div
                onClick={() => setTabList("tarif-bhp")}
                className={cn(
                  "py-3 px-4 border-b-2 transition-all text-[16px] font-normal cursor-pointer",
                  {
                    "border-primary-500 text-primary-500 font-bold text-[16px]":
                      tabList === "tarif-bhp",
                  }
                )}
              >
                <span>Tarif BHP</span>
              </div>
              <div
                onClick={() => setTabList("jasa-medis")}
                className={cn(
                  "py-3 px-4 border-b-2 transition-all text-[16px] font-normal cursor-pointer",
                  {
                    "border-primary-500 text-primary-500 font-bold":
                      tabList === "jasa-medis",
                  }
                )}
              >
                <span>Jasa Medis</span>
              </div>
            </div>

            {tabList === "tarif-bhp" && (
              <div className="bg-white">
                <Table
                  data={tarifBhpData}
                  columns={columnsCollapse}
                  isLoading={false}
                />
              </div>
            )}
            {tabList === "jasa-medis" && (
              <div className="flex justify-start flex-col items-start">
                <span className="p-4 font-semibold">Tenaga Medis</span>
                <div className="bg-white w-full">
                  <p className="text-left p-4 font-normal">Team</p>
                </div>
              </div>
            )}
          </div>
        }
        isLoading={false}
        pagination={{
          pageSize: 10,
          totalData: 10,
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

export default TarifTindakanList;
