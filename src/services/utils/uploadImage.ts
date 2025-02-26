import { http } from "../../utils/http";



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
