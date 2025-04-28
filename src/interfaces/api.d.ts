interface MetaDataCamel {
  pageSize: number;
  page: number;
  totalPage: number;
  totalData: number;
}

interface MetaDataSnake {
  page_size: number;
  page: number;
  total_page: number;
  total_data: number;
}

interface Res<TData, TMetaData> {
  data: TData;
  message: string;
  metadata?: TMetaData;
}
