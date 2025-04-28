import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { SERVICE_BASE_URL } from "../../constants/constants";

export function useUnitPelayananUpdate() {
  return useMutation(async (payloads: UnitPelayananForm) => {
    const { entity_id, ...finalPayloads } = payloads;
    return http<UnitPelayanan>(`master/service-unit/${entity_id}`, {
      method: "PUT",
      data: { ...finalPayloads },
      baseURL: SERVICE_BASE_URL,
    });
  });
}
