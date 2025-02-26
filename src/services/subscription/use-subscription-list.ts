import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";


async function fetchSubscriptionList() {
  const baseUrl = window.location.origin;
  const endpointUrl = new URL('/subscriptions', baseUrl);



  const { data } = await http<{data: any}>(
    endpointUrl.toString().replace(baseUrl, '')
  )

  return data
  }

  export function useSubscriptionList() {
    const data = useQuery(
      ['subscription-list'],
      () => fetchSubscriptionList()
    );
  
    return data;
  }
