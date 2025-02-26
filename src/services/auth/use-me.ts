import { useQuery } from "@tanstack/react-query";
import { API_URL, http } from "../../utils/http";

async function fetchMe() {
    ;
    const endpointUrl = new URL('/account/me', API_URL);
  
    const { data } = await http<{data: any}>(
      endpointUrl.toString().replace(API_URL, '')
    )
  
    return data
    }
  
    export function useMe() {
      const data = useQuery(
        ['me'],
        () => fetchMe()
      );
    
      return data;
    }