import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StorePaymentParams {
    subscription_id?: number
    bank_account: {
      owner_name: string;
      account_number: number;
      bank_name: string;
    }
    pay_amount: number;
    pay_date: string;
    payment_proof: string;
}

export function useCreatePayment() {
    return useMutation(
      async (formData: StorePaymentParams) => {
        return http(`payments`, {
          data: {
            ...formData
          }
        },);
      },
    )
  }
  