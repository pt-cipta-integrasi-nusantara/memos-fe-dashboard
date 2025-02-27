import { useQuery } from '@tanstack/react-query';
import type { Plan } from './types';
import { http } from '../../utils/http';

async function fetchPlanById(planId: string) {
  const { data } = await http<{ data: Plan }>(`plans/${planId}`);

  return data;
}

export function usePlanById(planId: string, options: any = {}) {
  const data = useQuery(['plan-items', planId], () => fetchPlanById(planId), {
    enabled: planId !== undefined,
    ...options,
  });

  return data;
}
