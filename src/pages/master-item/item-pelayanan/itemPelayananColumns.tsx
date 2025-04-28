import { Fragment } from "react";
import { TTableColumn } from "../../../components";
import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  MoreHorizIcon,
} from "../../../components/iconsComponent";
import { Chip } from "../../../components/uiComponent/chip";
import { Menu, Transition } from "@headlessui/react";
import { TColor } from "../../../components/uiComponent/chip/chip";

interface ItemPelayananColumnsProps {
  onUpdate: (data: ItemPelayanan) => void;
  onDelete: (data: ItemPelayanan) => void;
}

const ItemPelayananColumns = ({
  onUpdate,
  onDelete,
}: ItemPelayananColumnsProps) => {
  const columns: Array<TTableColumn<ItemPelayanan>> = [
    {
      id: "item_id",
      label: "ID",
      setContent(data) {
        return <span>{data.item_id || "-"}</span>;
      },
    },
    {
      id: "item_name",
      label: "Item Pelayanan",
      setContent(data) {
        return <span>{data.item_name}</span>;
      },
    },
    {
      id: "package",
      label: "Is Package",
      setContent(data) {
        return data.package?.[0] ? <CheckIcon /> : <span>-</span>;
      },
    },
    {
      id: "status",
      label: "Status",
      setContent(data) {
        const colorVariants: Record<string, TColor> = {
          active: "success",
          inactive: "error",
        };
        return <Chip value={data.status} color={colorVariants[data.status]} />;
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

export default ItemPelayananColumns;
