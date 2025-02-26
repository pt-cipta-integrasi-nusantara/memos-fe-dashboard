import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/http";

interface StorePlanParams {
    name?: string;
    description?: string;
    price?: number;
    duration?: string;
    discount?: number
}

export function useCreatePlan() {
    return useMutation(
      async (formData: StorePlanParams) => {
        const {name, description, price, duration, discount} = formData
        return http(`plans`, {
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
  