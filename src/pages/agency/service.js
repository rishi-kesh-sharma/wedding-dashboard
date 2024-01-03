import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await get('/agency', params);
}

export async function getById(id, options) {
  return await get(`/agency/detail/${id}`, {}, options);
}

export async function update(id, params) {
  return await put(`/agency/${id}`, params);
}

export async function save(params) {
  return await post('/agency', params);
}

export async function remove(id, options) {
  return await del(`/agency/${id}`, {}, options);
}

export const validateUser = async (_, value, user) => {
  const { field, fullField } = _;
  const promise = Promise;
  if (!value) {
    return promise.reject(`${fullField} is required`);
  }
  // stop calling http api if length is less than 5
  if (value.length < 3) {
    return promise.reject(`${fullField} must be at least 5 characters`);
  }
  let query = {};
  query[field] = value;
  if (user._id) {
    query._id = { $ne: user._id };
  }
};
