import { z } from "zod";

export const ItemPelayananDefaultValues: ItemPelayananForm = {
  entity_id: undefined,
  item_name: "",
  is_package: false,
  status: "inactive",
};

export const ItemPelayananSchema: z.ZodType<ItemPelayananForm> = z.object({
  entity_id: z.string().optional(),
  item_name: z
    .string({
      required_error: "Nama tidak boleh kosong",
    })
    .min(1, "Nama tidak boleh kosong"),
  is_package: z.boolean(),
  status: z.enum(["active", "inactive"]),
});
