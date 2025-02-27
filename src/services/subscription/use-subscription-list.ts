import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";
import type { Subscription } from "./types";


async function fetchSubscriptionList() {
  const baseUrl = window.location.origin;
  const endpointUrl = new URL('/subscriptions', baseUrl);



  const { data } = await http<{data: Subscription}>(
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
