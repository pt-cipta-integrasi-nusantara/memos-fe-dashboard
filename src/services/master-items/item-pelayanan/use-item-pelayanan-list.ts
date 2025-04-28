import { useMutation } from "@tanstack/react-query";
import { http } from "../../../utils/http";
import { SERVICE_BASE_URL } from "../../../constants/constants";

export function useItemPelayananList() {
  return useMutation(async (payload: ItemPelayananParams) => {
    return http<Res<ItemPelayanan[], MetaDataCamel>>("master/items/filter", {
      data: {
        ...payload,
        filter: payload?.filter?.filter((value) => !!value.value),
        sort: [
          {
            field: "created_at",
            order: "DESC",
          },
        ],
      },
      baseURL: SERVICE_BASE_URL,
    });
  });
}
