import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StorePlanParams {
    name?: string;
    description?: string;
    price?: number;
    duration?: string;
    discount?: number
}

export function useUpdatePlan() {
    return useMutation(
      async (formData: StorePlanParams & {id: number}) => {
        const {id, name, description, price, duration, discount} = formData
        return http(`plans/${id}`, {
          method: "PUT",
          data: {
            name,
            description,
            price,
            duration,
            discount
          }
        },);
      },
    )
  }
  