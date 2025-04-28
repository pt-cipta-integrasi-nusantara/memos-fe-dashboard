import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { SERVICE_BASE_URL } from "../../constants/constants";

export function useUnitPelayananCreate() {
  return useMutation(async (payloads: UnitPelayananForm) => {
    return http<UnitPelayanan>("master/service-unit", {
      data: { ...payloads },
      baseURL: SERVICE_BASE_URL,
    });
  });
}
