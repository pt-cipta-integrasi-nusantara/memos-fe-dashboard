import { useMutation, useQueryClient } from "@tanstack/react-query";
import { http } from "../../utils/http";
import { Plan } from "./types";

async function deletePlan(planId: number) {
    await http<{ data: Plan }>(`plans/${planId}`, {
      method: 'DELETE',
    });
  }
  
  export function useDeletePlan(planId: number) {
    const queryClient = useQueryClient();
  
    return useMutation(
      (planId: number) => deletePlan(planId),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['plan-list', planId]});
          
        },
        onError: (_error) => {
        //   const reason =
        //     error instanceof Error ? error.message : 'Something went wrong';
        },
      }
    );
  }
  