import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StoreSubscriptionParams {
    plan_id?: number
}

export function useCreateSubscription() {
    return useMutation(
      async (formData: StoreSubscriptionParams) => {
        const {plan_id} = formData
        return http(`subscriptions`, {
          data: {
            plan_id: plan_id
          }
        },);
      },
    )
  }
  