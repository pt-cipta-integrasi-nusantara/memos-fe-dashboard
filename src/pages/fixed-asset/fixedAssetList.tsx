import { ContentLayout } from "../../components";
import { Button, Table } from "../../components/uiComponent";
import { useNavigate } from "react-router-dom";

import { Dialog } from "../../components/uiComponent/dialog";
import { FilterListIcon, SearchIcon } from "../../components/iconsComponent";
import { useState } from "react";
import { TextField } from "../../components/uiComponent/textField";
import FixedAssetColumns, { fixedAssetData } from "./fixedAssetColumns";

const FixedAssetList = () => {
  const navigate = useNavigate();
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);

  const columns = FixedAssetColumns({
    onUpdate: () => navigate("12"),
    onDelete: () => setIsDeleteDialog(true),
  });
  return (
    <ContentLayout
      title="Fixed Asset"
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
            title="Tambah Asset"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => navigate("create")}
          />
        </div>
      }
    >
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1100px] w-full">
          <Table
            data={fixedAssetData}
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

export default FixedAssetList;
