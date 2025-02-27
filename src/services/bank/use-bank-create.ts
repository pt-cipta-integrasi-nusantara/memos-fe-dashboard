import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StoreBankParams {
  owner_name: string;
  account_number: number;
  bank_name: string;
}

export function useCreateBank() {
    return useMutation(
      async (formData: StoreBankParams) => {
        return http(`bank-accounts`, {
          data: {
            ...formData
          }
        },);
      },
    )
  }
  