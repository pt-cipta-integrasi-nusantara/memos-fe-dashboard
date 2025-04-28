import { Fragment } from "react";
import { TTableColumn } from "../../components";
import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  MoreHorizIcon,
} from "../../components/iconsComponent";
import { Menu, Transition } from "@headlessui/react";

interface UnitPelayananColumnsProps {
  onUpdate: (data: UnitPelayanan) => void;
  onDelete: (data: UnitPelayanan) => void;
}

const UnitPelayananColumns = ({
  onUpdate,
  onDelete,
}: UnitPelayananColumnsProps) => {
  const columns: Array<TTableColumn<UnitPelayanan>> = [
    {
      id: "organization_structure_id",
      label: "Org Structure ID",
      setContent(data) {
        return <span>{data.organization_structure_id}</span>;
      },
    },
    {
      id: "display_name",
      label: "Display Name",
      setContent(data) {
        return <span>{data.display_name}</span>;
      },
    },
    {
      id: "short_name",
      label: "Nama Singkatan",
      setContent(data) {
        return <span>{data.short_name}</span>;
      },
    },
    {
      id: "is_primary_encounter",
      label: "Primary Encounter",
      align: "center",
      setContent(data) {
        return <span>{data.is_primary_encounter ? <CheckIcon /> : "-"}</span>;
      },
    },
    {
      id: "is_control_queue_management",
      label: "Control Queue Management",
      align: "center",
      setContent(data) {
        return (
          <div className="flex justify-center ">
            <span>
              {data.is_control_queue_management ? <CheckIcon /> : "-"}
            </span>
          </div>
        );
      },
    },
    {
      id: "is_control_bed_management",
      label: "Control Bed Management",
      align: "center",
      setContent(data) {
        return (
          <div className="flex justify-center">
            <span className="">
              {data.is_control_bed_management ? <CheckIcon /> : "-"}
            </span>
          </div>
        );
      },
    },
    {
      id: "is_using_job_order",
      label: "Using Job Order",
      align: "center",
      setContent(data) {
        return (
          <div className="flex justify-center">
            <span className="">
              {data.is_using_job_order ? <CheckIcon /> : "-"}
            </span>
          </div>
        );
      },
    },
    {
      id: "is_using_reservation",
      label: "Using Reservation",
      align: "center",
      setContent(data) {
        return (
          <div className="flex justify-center">
            <span>{data.is_using_reservation ? <CheckIcon /> : "-"}</span>
          </div>
        );
      },
    },
    {
      id: "entity_id",
      label: "Aksi",
      align: "right",
      setContent(data) {
        return (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="hover:bg-[#0000000a] active:bg-[#00000021] w-8 h-8 rounded-[50%] flex justify-center items-center">
              <MoreHorizIcon />
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
                    onClick={() => onUpdate(data)}
                  >
                    <EditIcon />
                    Edit
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div
                    className="px-4 py-2 hover:bg-primary-200 flex gap-x-3 items-center text-primary-500 cursor-pointer"
                    onClick={() => onDelete(data)}
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
  return columns;
};

export default UnitPelayananColumns;
