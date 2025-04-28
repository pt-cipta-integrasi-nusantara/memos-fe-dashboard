import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { SERVICE_BASE_URL } from "../../constants/constants";

export function useUnitPelayananDelete() {
  return useMutation((id: string) => {
    return http(`master/service-unit/${id}`, {
      method: "DELETE",
      baseURL: SERVICE_BASE_URL,
    });
  });
}
