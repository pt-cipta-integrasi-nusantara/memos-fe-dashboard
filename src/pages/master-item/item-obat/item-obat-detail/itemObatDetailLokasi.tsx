import { ContentLayout, Table, TTableColumn } from "../../../../components";
import {
  FilterListIcon,
  SearchIcon,
} from "../../../../components/iconsComponent";
import { TextField } from "../../../../components/uiComponent/textField";

const lokasiObatData = [
  {
    lokasi: "Ruang Farmasi",
    satuan: "Dua",
    jumlah: 36,
    kuantitiKonversi: "50.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang UGD",
    satuan: "Dus",
    jumlah: 40,
    kuantitiKonversi: "5.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang Rawat Inap",
    satuan: "Box",
    jumlah: 12,
    kuantitiKonversi: "10.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang Poliklinik",
    satuan: "Dus",
    jumlah: 2,
    kuantitiKonversi: "3.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang Radiologi",
    satuan: "Dus",
    jumlah: 23,
    kuantitiKonversi: "1.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang Laboratorium",
    satuan: "Box",
    jumlah: 9,
    kuantitiKonversi: "0 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang Operasi",
    satuan: "Dus",
    jumlah: 19,
    kuantitiKonversi: "2.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang ICU",
    satuan: "Dus",
    jumlah: 3,
    kuantitiKonversi: "4.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang Bersalin",
    satuan: "Dus",
    jumlah: 5,
    kuantitiKonversi: "2.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
  {
    lokasi: "Ruang Rehabilitasi Medis",
    satuan: "Dus",
    jumlah: 8,
    kuantitiKonversi: "1.000 butir",
    tanggalKadaluarsa: "31/12/2024 - 30/12/2027",
  },
];

const lokasiObatDetailData = [
  {
    batch: "98380",
    tanggalKadaluarsa: "01/08/2027",
    statusKadaluarsa: "Masih Lama",
    kuantitiTersimpan: "5 Dus",
    kuantitiKonversi: "7.200 Tablet",
  },
  {
    batch: "78380",
    tanggalKadaluarsa: "15/02/2025",
    statusKadaluarsa: "Hampir Kadaluarsa",
    kuantitiTersimpan: "2 Box",
    kuantitiKonversi: "120 Tablet",
  },
  {
    batch: "68380",
    tanggalKadaluarsa: "31/12/2024",
    statusKadaluarsa: "Kadaluarsa",
    kuantitiTersimpan: "1 Strip",
    kuantitiKonversi: "12 Tablet",
  },
];

const ItemObatDetailLokasi = () => {
  const columns: Array<TTableColumn<(typeof lokasiObatData)[number]>> = [
    {
      id: "lokasi",
      label: "Lokasi",
      setContent: (data) => <span>{data.lokasi}</span>,
    },
    {
      id: "satuan",
      label: "Satuan Penyimpanan",
      setContent: (data) => <span>{data.satuan}</span>,
    },
    {
      id: "jumlah",
      label: "Jumlah",
      setContent: (data) => <span>{data.jumlah.toLocaleString()}</span>,
    },
    {
      id: "kuantitiKonversi",
      label: "Kuantiti Konversi",
      setContent: (data) => <span>{data.kuantitiKonversi}</span>,
    },
    {
      id: "tanggalKadaluarsa",
      label: "Tanggal Kadaluarsa",
      setContent: (data) => <span>{data.tanggalKadaluarsa}</span>,
    },
  ];

  const columnsCollapse: Array<
    TTableColumn<(typeof lokasiObatDetailData)[number]>
  > = [
    {
      id: "batch",
      label: "No. Batch/Log",
      setContent: (data) => <span>{data.batch}</span>,
    },
    {
      id: "tanggalKadaluarsa",
      label: "Tanggal Kadaluarsa",
      setContent: (data) => <span>{data.tanggalKadaluarsa}</span>,
    },
    {
      id: "statusKadaluarsa",
      label: "Status Kadaluarsa",
      setContent: (data) => {
        let color = "text-gray-700";
        if (data.statusKadaluarsa === "Kadaluarsa") color = "text-red-600";
        else if (data.statusKadaluarsa === "Hampir Kadaluarsa")
          color = "text-yellow-600";
        else if (data.statusKadaluarsa === "Masih Lama")
          color = "text-green-600";

        return <span className={color}>{data.statusKadaluarsa}</span>;
      },
    },
    {
      id: "kuantitiTersimpan",
      label: "Kuantiti Tersimpan",
      setContent: (data) => <span>{data.kuantitiTersimpan}</span>,
    },
    {
      id: "kuantitiKonversi",
      label: "Kuantiti Konversi",
      setContent: (data) => <span>{data.kuantitiKonversi}</span>,
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

          <button className="rounded-[99px] space-x-2 border border-subtle px-4 py-2 flex">
            <FilterListIcon />
            <span className="text-default font-bold text-[14px]">Filter</span>
          </button>
        </div>
      }
    >
      <Table
        data={lokasiObatData}
        columns={columns}
        isLoading={false}
        collapseContent={
          <Table
            className="bg-white"
            columns={columnsCollapse}
            data={lokasiObatDetailData}
            isLoading={false}
          />
        }
        pagination={{
          currentPage: 1,
          totalPages: 10,
          onPageChange: (pageNumber) => {
            console.log(pageNumber);
          },
        }}
      />
    </ContentLayout>
  );
};

export default ItemObatDetailLokasi;
