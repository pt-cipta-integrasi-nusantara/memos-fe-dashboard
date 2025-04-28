import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { SERVICE_BASE_URL } from "../../constants/constants";

async function fetchUnitPelayananList(params: Partial<UnitPelayananParams>) {
  const baseUrl = window.location.origin;
  const endpointUrl = new URL("/master/service-unit", baseUrl);
  const res = await http<Res<UnitPelayanan[], MetaDataSnake>>(
    endpointUrl.toString().replace(baseUrl, ""),
    {
      baseURL: SERVICE_BASE_URL,
      params: { ...params, field: "created_at", order: "DESC" },
    }
  );
  return res;
}

export function useUnitPelayananList(params: Partial<UnitPelayananParams>) {
  return useQuery(
    ["unit-pelayanan-list", params],
    () => fetchUnitPelayananList(params),
    {
      keepPreviousData: true,
    }
  );
}
