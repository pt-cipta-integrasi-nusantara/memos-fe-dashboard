import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { Subscription } from "./types";

async function deleteSubscription(subscriptionId: number) {
    await http<{ data: Subscription }>(`subscriptions/${subscriptionId}`, {
      method: 'DELETE',
    });
  }
  
  export function useDeleteSubscription(subscriptionId: number) {
    const queryClient = useQueryClient();
  
    return useMutation(
      (subscriptionId: number) => deleteSubscription(subscriptionId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['subscription-list', subscriptionId]});
          
        },
        onError: (_error) => {
        //   const reason =
        //     error instanceof Error ? error.message : 'Something went wrong';
        },
      }
    );
  }
  