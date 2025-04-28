import { useState } from "react";
import { ContentLayout } from "../../components";
import { Button, Table } from "../../components/uiComponent";
import { TextField } from "../../components/uiComponent/textField";
import { FilterListIcon, SearchIcon } from "../../components/iconsComponent";
import { Dialog } from "../../components/uiComponent/dialog";
import { Toggle } from "../../components/uiComponent/toggle";
import {
  useUnitPelayananCreate,
  useUnitPelayananDelete,
  useUnitPelayananList,
  useUnitPelayananUpdate,
} from "../../services/use-unit-pelayanan";
import UnitPelayananColumns from "./unitPelayananColumns";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UnitPelayananDefaultValues, UnitPelayananSchema } from "../../schemas";
import toast from "react-hot-toast";
import useDebounce from "../../helpers/hooks/useDebounce";

const UnitPelayananList = () => {
  const [isFormDialog, setIsFormDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<UnitPelayanan>();
  const [searchParams, setSearchParams] = useSearchParams();
  const getAllParams = Object.fromEntries(searchParams.entries());
  const getSearch = useDebounce(getAllParams.search, 1000);

  const {
    data: unitPelayananList,
    isFetching,
    isLoading,
    refetch,
  } = useUnitPelayananList({ ...getAllParams, search: getSearch });

  const {
    page = 1,
    page_size = 0,
    total_data = 1,
    total_page = 1,
  } = unitPelayananList?.metadata ?? {};

  const {
    mutate: unitPelayananCreateMutation,
    isLoading: unitPelayananCreateLoading,
  } = useUnitPelayananCreate();

  const {
    mutate: unitPelayananUpdateMutation,
    isLoading: unitPelayananUpdateLoading,
  } = useUnitPelayananUpdate();

  const {
    mutate: unitPelayananDeleteMutation,
    isLoading: unitPelayananDeleteLoading,
  } = useUnitPelayananDelete();

  const {
    register,
    watch,
    setValue,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UnitPelayananForm>({
    resolver: zodResolver(UnitPelayananSchema),
    defaultValues: UnitPelayananDefaultValues,
  });

  const isUpdate = getValues("entity_id");

  const columns = UnitPelayananColumns({
    onUpdate: (data) => {
      reset(data);
      setIsFormDialog(true);
    },
    onDelete: (data) => {
      setDeleteDialog(data);
    },
  });

  const handleOnSubmit = handleSubmit((data) => {
    if (data?.entity_id) {
      unitPelayananUpdateMutation(data, {
        onSuccess: () => {
          toast.success("Unit Pelayanan Berasil di Ubah");
          refetch();
          setIsFormDialog(false);
        },
        onError: () => {
          toast.error("Terjadi kesalahan");
          setIsFormDialog(false);
        },
      });

      return;
    }
    unitPelayananCreateMutation(data, {
      onSuccess: () => {
        toast.success("Unit Pelayanan Berasil di Tambah");
        refetch();
        setIsFormDialog(false);
      },
      onError: () => {
        toast.error("Terjadi kesalahan");
        setIsFormDialog(false);
      },
    });
  });

  const handleOnDelete = () => {
    unitPelayananDeleteMutation(deleteDialog?.entity_id ?? "", {
      onSuccess: () => {
        toast.success("Unit Pelayanan Berasil di Hapus");
        refetch();
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
      title="Unit Pelayanan"
      actions={
        <div className="flex gap-x-4 items-center">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-[10px]" />
            <TextField
              placeholder="Cari Display Name..."
              className="pl-10 rounded-[99px]"
              onChange={(event) =>
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  search: event.target.value,
                })
              }
            />
          </div>

          <button className="rounded-[99px] space-x-2 border border-subtle px-4 py-2 flex">
            <FilterListIcon />
            <span className="text-default font-bold text-[14px]">Filter</span>
          </button>

          <Button
            title="Tambah Unit Pelayanan"
            className="text-white bg-primary-500 min-h-0"
            onClick={() => {
              reset(UnitPelayananDefaultValues);
              setIsFormDialog(true);
            }}
          />
        </div>
      }
    >
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1400px] w-full">
          <Table
            data={unitPelayananList?.data ?? []}
            columns={columns}
            isLoading={isLoading || isFetching}
            pagination={{
              currentPage: page,
              pageSize: page_size,
              totalData: total_data,
              totalPages: total_page,
              onPageChange: (pageNumber) => {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: String(pageNumber),
                });
              },
            }}
          />
        </div>
      </div>
      <Dialog
        className="max-w-xl"
        open={isFormDialog}
        onClose={() => setIsFormDialog(false)}
        title={!isUpdate ? "Tambah Unit Pelayanan" : "Ubah Unit Palayanan"}
        actionProps={{
          cancelButtonProps: {
            className: "w-full",
          },
          submitButtonProps: {
            isLoading: unitPelayananCreateLoading || unitPelayananUpdateLoading,
            label: !isUpdate ? "Tambahkan" : "Ubah",
            className: "w-full",
            onClick: handleOnSubmit,
          },
        }}
      >
        <div className="w-ful py-3 flex flex-col gap-y-6">
          <TextField
            {...register("display_name")}
            label="Display Name"
            required
            placeholder="Masukan Display Name"
            error={!!errors?.display_name}
            helperText={errors?.display_name?.message}
          />
          <TextField
            {...register("short_name")}
            label="Nama Singkatan"
            required
            placeholder="Masukan Nama Singkatan"
            error={!!errors?.short_name}
            helperText={errors?.short_name?.message}
          />
          <div className="flex gap-6">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Primary Encounter
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Toggle
                label={watch("is_primary_encounter") ? "Active" : "Inactive"}
                checked={watch("is_primary_encounter")}
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
                onChange={(event) => {
                  const { checked } = event.target;
                  setValue("is_primary_encounter", checked);
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Control Queue Management
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Toggle
                label={
                  watch("is_control_queue_management") ? "Active" : "Inactive"
                }
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
                checked={watch("is_control_queue_management")}
                onChange={(event) => {
                  const { checked } = event.target;
                  setValue("is_control_queue_management", checked);
                }}
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Control Bed Management
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Toggle
                label={
                  watch("is_control_bed_management") ? "Active" : "Inactive"
                }
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
                checked={watch("is_control_bed_management")}
                onChange={(event) => {
                  const { checked } = event.target;
                  setValue("is_control_bed_management", checked);
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Using Job Order
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Toggle
                label={watch("is_using_job_order") ? "Active" : "Inactive"}
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
                checked={watch("is_using_job_order")}
                onChange={(event) => {
                  const { checked } = event.target;
                  setValue("is_using_job_order", checked);
                }}
              />
            </div>
          </div>

          <div className="flex gap-6  mb-4">
            <div className="w-full flex flex-col gap-y-3">
              <label className="block text-[14px] font-medium text-[#31475E]">
                Using Reservation
                <span className="text-primary-500 ml-1">*</span>
              </label>
              <Toggle
                label={watch("is_using_reservation") ? "Active" : "Inactive"}
                labelProps={{
                  className: "text-[#ACB8C3]",
                }}
                checked={watch("is_using_reservation")}
                onChange={(event) => {
                  const { checked } = event.target;
                  setValue("is_using_reservation", checked);
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
            isLoading: unitPelayananDeleteLoading,
            onClick: handleOnDelete,
          },
        }}
      >
        <div className="w-ful py-8 flex flex-col">
          <h5 className="text-[20px] font-bold text-[#31475E] text-center">
            {`Apakah Anda yakin ingin menghapus unit pelayanan ‘${deleteDialog?.display_name}’?`}
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

export default UnitPelayananList;
