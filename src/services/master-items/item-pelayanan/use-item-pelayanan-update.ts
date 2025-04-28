import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { SERVICE_BASE_URL } from "../../../constants/constants";

export function useItemPelayananUpdate() {
  return useMutation(async (payloads: ItemPelayananForm) => {
    const { entity_id, ...finalPayloads } = payloads;
    return http<ItemPelayanan>(`master/items/${entity_id}`, {
      method: "PUT",
      data: {
        name: finalPayloads.item_name,
        type_code: "ItemService",
        status: finalPayloads.status,
        service: {
          ...finalPayloads,
        },
      },
      baseURL: SERVICE_BASE_URL,
    });
  });
}
