import { get, patch, put } from '@/services/http-service';
import { request } from 'umi';

export async function queryCurrent() {
  return request('/api/accountSettingCurrentUser');
}

export async function queryProvince() {
  return request('/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}
export async function query() {
  return request('/api/users');
}
export async function getLoggedInUser() {
  return await get('/auth/getloggedinuser');
}
export async function updateUser(params) {
  return await put('/api/auth/update?folder=user', params);
}
export async function changePassword(userId, params) {
  return await patch(`/team/change-password/${userId}`, params);
}

export async function update(id, params) {
  return await put(`/team/${id}`, params);
}
