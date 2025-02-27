import { useQuery } from '@tanstack/react-query';
import type { Subscription } from './types';
import { http } from '../../utils/http';

async function fetchSubsciptionById(subscriptionId: string) {
  const { data } = await http<{ data: Subscription }>(`subscriptions/${subscriptionId}`);

  return data;
}

export function useSubscriptionById(subscriptionId: string, options: any = {}) {
  const data = useQuery(['subscription-items', subscriptionId], () => fetchSubsciptionById(subscriptionId), {
    enabled: subscriptionId !== undefined,
    ...options,
  });

  return data;
}
