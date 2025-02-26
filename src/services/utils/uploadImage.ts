import { http } from "../../utils/http";
import * as sessionService from "../../utils/session"
interface UploadResponse {
  filename: string;
  path: string;
  url: string;
}

interface UploadBulkResponse {
  data: UploadResponse[]
}


export async function uploadImage(formData: FormData) {
  const { path } = await http<{ path: string }>(
    'files',
    {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  );
  
  return path;
}
