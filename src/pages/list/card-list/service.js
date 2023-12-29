import { request } from 'umi';
import getFakeList from './_mock';

export async function queryFakeList(params) {
  // return request('/api/card_fake_list', {
  //   params,
  // });
  const list = getFakeList();
  console.log(list, 'fake');
  return list;
}
