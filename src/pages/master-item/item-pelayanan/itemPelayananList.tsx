import { useEffect, useState } from "react";
import { ContentLayout } from "../../../components";
import { Button, Table } from "../../../components/uiComponent";
import { TextField } from "../../../components/uiComponent/textField";
import { FilterListIcon, SearchIcon } from "../../../components/iconsComponent";
import { Dialog } from "../../../components/uiComponent/dialog";
import { Checkbox } from "../../../components/uiComponent/checkbox";
import { Toggle } from "../../../components/uiComponent/toggle";
import {
  useItemPelayananCreate,
  useItemPelayananDelete,
  useItemPelayananList,
} from "../../../services/master-items";
import ItemPelayananColumns from "./itemPelayananColumns";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ItemPelayananDefaultValues,
  ItemPelayananSchema,
} from "../../../schemas";
import { useItemPelayananUpdate } from "../../../services/master-items/item-pelayanan/use-item-pelayanan-update";
import toast from "react-hot-toast";
import useDebounce from "../../../helpers/hooks/useDebounce";

const ItemPelayananList = () => {
  const [isFormDialog, setIsFormDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<ItemPelayanan>();
  const [searchParams, setSearchParams] = useSearchParams();
  const getAllParams = Object.fromEntries(searchParams.entries());

  const getSearch = useDebounce(getAllParams.item_name, 1000);

  const {
    register,
    watch,
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemPelayananForm>({
    resolver: zodResolver(ItemPelayananSchema),
    defaultValues: ItemPelayananDefaultValues,
  });

  const {
    data: itemPelayananList,
    mutate: itemPelayananListMutation,
    isLoading: itemPelayananListLoading,
  } = useItemPelayananList();

  const {
    mutate: itemPelayananCreateMutation,
    isLoading: itemPelayananCreateLoading,
  } = useItemPelayananCreate();

  const {
    mutate: itemPelayananUpdateMutation,
    isLoading: itemPelayananUpdateLoading,
  } = useItemPelayananUpdate();

  const {
    mutate: itemPelayananDeleteMutation,
    isLoading: itemPelayananDeleteLoading,
  } = useItemPelayananDelete();

  const {
    page = 1,
    pageSize = 0,
    totalData = 1,
    totalPage = 1,
  } = itemPelayananList?.metadata ?? {};

  const isUpdate = getValues("entity_id");

  const columns = ItemPelayananColumns({
    onUpdate: (data) => {
      const getDataUpdate: ItemPelayananForm = {
        ...data,
        is_package: !!data.package[0],
      };
      reset(getDataUpdate);
      setIsFormDialog(true);
    },
    onDelete: (data) => setDeleteDialog(data),
  });

  const fetctItemPelayananList = () => {
    const { page, ...params } = getAllParams;
    const filter = Object.entries(params)?.map(([key, value]) => {
      return {
        field: key,
        operator: "contain",
        value,
      };
    });

    itemPelayananListMutation({
      filter,
      pagination: {
        page: Number(page ?? 1),
        pageSize: 10,
      },
    });
  };
  useEffect(fetctItemPelayananList, [getSearch, getAllParams.page]);

  const handleOnSubmit = handleSubmit((data) => {
    if (data?.entity_id) {
      itemPelayananUpdateMutation(data, {
        onSuccess: () => {
          toast.success("Item Pelayanan Berasil di Ubah");
          fetctItemPelayananList();
          setIsFormDialog(false);
        },
        onError: () => {
          toast.error("Terjadi kesalahan");
          setIsFormDialog(false);
        },
      });

      return;
    }
    itemPelayananCreateMutation(data, {
      onSuccess: () => {
        toast.success("Item Pelayanan Berasil di Tambah");
        fetctItemPelayananList();
        setIsFormDialog(false);
      },
      onError: () => {
        toast.error("Terjadi kesalahan");
        setIsFormDialog(false);
      },
    });
  });

  const handleOnClose = () => {
    setIsFormDialog(false);
  };

  const handleOnDelete = () => {
    itemPelayananDeleteMutation(deleteDialog?.entity_id ?? "", {
      onSuccess: () => {
        toast.success("Item Pelayanan Berasil di Hapus");
        fetctItemPelayananList();
        setDeleteDialog(undefined);
      },
      onError: () => {
        toast.error("Terjadi kesalahan");
        setDeleteDialog(undefined);
      },
    });
  };
  return (
    <ContentLayout
      title="Item Pelayanan"
      actions={
        <div className="flex gap-x-4 items-center">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-[10px]" />
            <TextField
              placeholder="Cari Item Pelayanan..."
              className="pl-10 rounded-[99px]"
              onChange={(event) =>
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  item_name: event.target.value,
                })
              }
            />
          </div>

          <button className="rounded-[99px] space-x-2 border border-subtle px-4 py-2 flex active:ring-primary-500 active:ring-1 transition-all">
            <FilterListIcon />
            <span className="text-default font-bold text-[14px]">Filter</span>
          </button>

          <Button
            title="Tambah Item Pelayanan"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => {
              reset(ItemPelayananDefaultValues);
              setIsFormDialog(true);
            }}
          />
        </div>
      }
    >
      <Table
        data={itemPelayananList?.data ?? []}
        columns={columns}
        isLoading={itemPelayananListLoading}
        pagination={{
          currentPage: page,
          pageSize,
          totalData,
          totalPages: totalPage,
          onPageChange: (pageNumber) => {
            setSearchParams({
              ...Object.fromEntries(searchParams),
              page: String(pageNumber),
            });
          },
        }}
      />
      <Dialog
        open={isFormDialog}
        onClose={handleOnClose}
        title={!isUpdate ? "Tambah Item Pelayanan" : "Ubah Item Pelayanan"}
        actionProps={{
          cancelButtonProps: {
            className: "w-full",
          },
          submitButtonProps: {
            isLoading: itemPelayananCreateLoading || itemPelayananUpdateLoading,
            label: !isUpdate ? "Tambahkan" : "Ubah",
            className: "w-full",
            onClick: handleOnSubmit,
          },
        }}
      >
        <div className="w-ful py-3 flex flex-col gap-y-6">
          <TextField
            {...register("item_name")}
            label="Nama Item Pelayanan"
            required
            placeholder="Pasang Infus"
            error={!!errors?.item_name}
            helperText={errors?.item_name?.message}
          />
          <div className="flex gap-6">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Is Package
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Checkbox
                label={watch("is_package") ? "Yes" : "No"}
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
                checked={watch("is_package")}
                onChange={(event) =>
                  setValue("is_package", event.target.checked)
                }
              />
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Status
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Toggle
                label={watch("status") === "active" ? "Active" : "Inactive"}
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
                checked={watch("status") === "active"}
                onChange={(event) => {
                  const { checked } = event.target;
                  const value = checked ? "active" : "inactive";
                  setValue("status", value);
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(undefined)}
        actionProps={{
          cancelButtonProps: {
            className: "w-full",
          },
          submitButtonProps: {
            label: "Hapus",
            className: "w-full",
            isLoading: itemPelayananDeleteLoading,
            onClick: handleOnDelete,
          },
        }}
      >
        <div className="w-ful py-8 flex flex-col">
          <h5 className="text-[20px] font-bold text-[#31475E] text-center">
            {`Apakah Anda yakin ingin menghapus item pelayanan ‘${deleteDialog?.item_name}’?`}
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
