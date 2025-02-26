import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import type { Plan } from "./types";


async function fetchPlanList() {
  const baseUrl = window.location.origin;
  const endpointUrl = new URL('/plans', baseUrl);



  const { data } = await http<{data: Plan[]}>(
    endpointUrl.toString().replace(baseUrl, '')
  )

  return data
  }

  export function usePlanList() {
    const data = useQuery(
      ['plan-list'],
      () => fetchPlanList()
    );
  
    return data;
  }
