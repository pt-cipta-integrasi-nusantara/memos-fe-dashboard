interface ItemPelayananParams {
  filter?: {
    field: string;
    operator: string;
    value: string;
  }[];
  pagination: {
    page: number;
    pageSize: number;
  };
}

interface ItemPelayanan {
  entity_id: string;
  item_id: string;
  item_name: string;
  status: "active" | "inactive";
  package: (unknown | null)[];
}

interface ItemPelayananForm
  extends Pick<ItemPelayanan, "item_name" | "status"> {
  entity_id?: string;
  is_package: boolean;
}
