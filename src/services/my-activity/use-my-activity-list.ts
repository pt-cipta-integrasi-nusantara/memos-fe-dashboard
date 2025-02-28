import { useQuery } from "@tanstack/react-query";
import { http } from "../../utils/http";


async function fetchMyActivityList() {
  const baseUrl = window.location.origin;
  const endpointUrl = new URL('/account/my-activity', baseUrl);



  const { data } = await http<{data: any[]}>(
    endpointUrl.toString().replace(baseUrl, '')
  )

  return data
  }

  export function useMyActivityList() {
    const data = useQuery(
      ['my-activity-list'],
      () => fetchMyActivityList()
    );
  
    return data;
  }
