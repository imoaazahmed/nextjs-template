import { useQueryWrapper } from '@apis/use-api-wrapper';
import { UseQueryResult } from 'react-query';
import http from '@services/http-service';
import { AxiosResponse, AxiosError } from 'axios';

const endpoint = 'posts';

const QueryFn = async () => {
  const { data } = await http.get(endpoint);
  return data;
};

export function useGetPostsApi(): UseQueryResult<AxiosResponse, AxiosError> {
  return useQueryWrapper(endpoint, QueryFn);
}
