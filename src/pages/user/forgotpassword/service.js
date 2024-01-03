import { get, post, put, del } from '/src/services/http-service';

// check username api call
export async function forgotPassword(params) {
  const result = await post(`/auth/forgot-password`, params);
  return result;
}
