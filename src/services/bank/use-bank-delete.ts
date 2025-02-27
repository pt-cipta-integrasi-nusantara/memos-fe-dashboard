import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { Bank } from "./types";

async function deleteBank(bankId: number) {
    await http<{ data: Bank }>(`bank-accounts/${bankId}`, {
      method: 'DELETE',
    });
  }
  
  export function useDeleteBank(bankId: number) {
    const queryClient = useQueryClient();
  
    return useMutation(
      (bankId: number) => deleteBank(bankId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['bank-list', bankId]});
          
        },
        onError: (_error) => {
        //   const reason =
        //     error instanceof Error ? error.message : 'Something went wrong';
        },
      }
    );
  }
  