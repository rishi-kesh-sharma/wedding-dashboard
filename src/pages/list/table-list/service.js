// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/**  GET /api/rule */
export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/**  PUT /api/rule */

export async function updateRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
/**  POST /api/rule */

export async function addRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
/**  DELETE /api/rule */

export async function removeRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
