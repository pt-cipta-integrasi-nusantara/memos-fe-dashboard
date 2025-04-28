import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { SERVICE_BASE_URL } from "../../../constants/constants";

export function useItemPelayananCreate() {
  return useMutation(async (payloads: ItemPelayananForm) => {
    return http<ItemPelayanan>("master/items", {
      data: {
        name: payloads.item_name,
        type_code: "ItemService",
        status: payloads.status,
        service: payloads,
      },
      baseURL: SERVICE_BASE_URL,
    });
  });
}
