import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { Payment } from "./types";

async function deletePayment(paymentId: number) {
    await http<{ data: Payment }>(`payments/${paymentId}`, {
      method: 'DELETE',
    });
  }
  
  export function useDeletePayment(paymentId: number) {
    const queryClient = useQueryClient();
  
    return useMutation(
      (paymentId: number) => deletePayment(paymentId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['payment-list', paymentId]});
          
        },
        onError: (_error) => {
        //   const reason =
        //     error instanceof Error ? error.message : 'Something went wrong';
        },
      }
    );
  }
  