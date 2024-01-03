import { patch } from '@/services/http-service';
import { get, post, put, del } from '/src/services/http-service';

export async function search(params) {
  return await get('/guest', params);
}

export async function getById(id, options) {
  return await get(`/guest/detail/${id}`, {}, options);
}

export async function update(id, params) {
  return await put(`/guest/${id}`, params);
}
export async function updateTravelDetail(eventId, params) {
  return await post(`/travel/${eventId}`, params);
}

export async function saveRoomDetail({ guestId, eventId }, params) {
  return await patch(`/guest/add-room/${guestId}/${eventId}`, params);
}
export async function updateRoomDetail({ guestId, eventId }, params) {
  return await patch(`/guest/add-room/${guestId}/${eventId}`, params);
}

export async function saveTravelDetail(eventId, params) {
  return await post(`/travel/${eventId}`, params);
}
export async function save(id, params) {
  return await post(`/guest/add-to-event/${id}`, params);
}
export async function sendEmail(eventId, params) {
  return await post(`/notification/send-email/${eventId}`, params);
}

export async function remove(id, options) {
  return await del(`/guest/${id}`, {}, options);
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
