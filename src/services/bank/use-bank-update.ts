import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StoreBankParams {
  owner_name: string;
  account_number: number;
  bank_name: string;
}

export function useUpdateBank() {
    return useMutation(
      async (formData: StoreBankParams & {id: number}) => {
        const {id, ...form} = formData
        return http(`bank-accounts/${id}`, {
          method: "PUT",
          data: {
            ...form
          }
        },);
      },
    )
  }
  