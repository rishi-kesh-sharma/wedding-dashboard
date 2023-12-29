import { get, post, put, del } from '/src/services/http-service';

export async function search({ pageSize, current }) {
  return await get(
    `/event?limit=${10}&limit=${pageSize}&page=${current}&populate=backgrounds&populate=backgrounds.image`,
    // params,
    {},
  );
}

export async function count(params, options) {
  return await post('/event/count', params, options);
}

export async function getById(id, options) {
  return await get(
    // `/event/detail/${id}?populate=couple.groomImages&populate=couple.brideImages&populate=guests&populate=backgrounds&populate=closeFriends&populate=closeFriends.image&populate=days&populate=days.image&populate=guests&populate=loveStory&populate=loveStory.image`,
    `/event/detail/${id}?&populate=guests&populate=backgrounds&populate=days&populate=days.image&populate=guests&populate=agency&populate=guests.travelDetail&populate=guests.travelDetail.ticketImage`,
    {},
    options,
  );
}

export async function update(id, params) {
  return await put(`/event/${id}`, params);
}

export async function save(params) {
  return await post('/event', params);
  s;
}
export async function saveCouple(id, params) {
  console.log(id, 'the id');
  return await post(`/couple/${id}`, params);
}
export async function updateCouple(id, params) {
  return await put(`/couple/${id}`, params);
}
export async function saveFriend(id, params) {
  console.log(id, 'the id');
  return await post(`/friends/${id}`, params);
}
export async function updateFriend(id, params) {
  return await put(`/friends/${id}`, params);
}
export async function removeFriend(id, options) {
  return await del(`/friends/${id}`, {}, options);
}
export async function saveDay(id, params) {
  console.log(id, 'the id');
  return await post(`/days/${id}`, params);
}
export async function updateDay(id, params) {
  return await put(`/days/${id}`, params);
}
export async function removeDay(id, options) {
  return await del(`/days/${id}`, {}, options);
}
export async function saveLoveStory(id, params) {
  console.log(id, 'the id');
  return await post(`/love-story/${id}`, params);
}
export async function updateLoveStory(id, params) {
  return await put(`/love-story/${id}`, params);
}
export async function removeLoveStory(id, options) {
  return await del(`/love-story/${id}`, {}, options);
}

export async function saveGuest(id, params) {
  console.log(id, 'the id');
  return await post(`/guest/add-to-event/${id}`, params);
}
export async function saveGuestInBulk(id, params) {
  console.log(id, 'the id');
  return await post(`/guest/add-to-event/bulk/${id}`, params);
}
export async function check(params) {
  return await post('/event/check', params);
}

export async function remove(id, options) {
  return await del(`/event/${id}`, {}, options);
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
