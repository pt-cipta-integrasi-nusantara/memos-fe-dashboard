interface UnitPelayananParams {
  page: string;
  search: string;
}
interface UnitPelayanan {
  entity_id: string;
  facility_id: number;
  organization_id: number | null;
  site_id: number | null;
  organization_structure_id: number;
  display_name: string;
  short_name: string;
  is_primary_encounter: boolean;
  is_control_queue_management: boolean;
  is_control_bed_management: boolean;
  is_using_job_order: boolean;
  is_using_reservation: boolean;
  notes_id: string;
}

interface UnitPelayananForm
  extends Pick<
    UnitPelayanan,
    | "display_name"
    | "short_name"
    | "is_primary_encounter"
    | "is_control_queue_management"
    | "is_control_bed_management"
    | "is_using_job_order"
    | "is_using_reservation"
  > {
  entity_id?: string;
}
