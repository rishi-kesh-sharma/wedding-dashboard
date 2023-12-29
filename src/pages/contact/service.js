import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await get('/contact', params);
}

export async function getById(id, options) {
  return await get(`/contact/detail/${id}`, {}, options);
}

export async function update(id, params) {
  return await put(`/contact/${id}`, params);
}

export async function save(params) {
  return await post('/contact', params);
}

export async function remove(id, options) {
  return await del(`/contact/${id}`, {}, options);
}

export async function check(params) {
  return await post('/contact/check', params);
}
export async function count(params, options) {
  return await post('/contact/count', params, options);
}
