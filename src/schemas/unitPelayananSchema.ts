import { z } from "zod";

export const UnitPelayananDefaultValues: UnitPelayananForm = {
  entity_id: undefined,
  display_name: "",
  short_name: "",
  is_primary_encounter: false,
  is_control_queue_management: false,
  is_control_bed_management: false,
  is_using_job_order: false,
  is_using_reservation: false,
};

export const UnitPelayananSchema: z.ZodType<UnitPelayananForm> = z.object({
  entity_id: z.string().optional(),
  display_name: z
    .string({
      required_error: "Display Name tidak boleh kosong",
    })
    .min(1, "Nama tidak boleh kosong"),
  short_name: z
    .string({
      required_error: "Short Name tidak boleh kosong",
    })
    .min(1, "Nama tidak boleh kosong"),
  is_primary_encounter: z.boolean(),
  is_control_queue_management: z.boolean(),
  is_control_bed_management: z.boolean(),
  is_using_job_order: z.boolean(),
  is_using_reservation: z.boolean(),
});
