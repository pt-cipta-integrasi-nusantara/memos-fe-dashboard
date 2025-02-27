import { http } from "../../utils/http";


interface UploadResponse {
  created_at : string;
  created_by: string;
  file_name: string;
  file_url: string;
  id: string;
}

export async function uploadImage(formData: FormData) {
  const { data } = await http<{ data: UploadResponse }>(
    'files',
    {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  );
  
  return data;
}
