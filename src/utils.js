export const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split('.').pop().trim();
};
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const urlToFile = async (imgUrl) => {
  if (!imgUrl) return;
  var imgExt = getUrlExtension(imgUrl);
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], 'image.' + imgExt, {
    type: blob.type,
  });
  return file;
};

export const urlToEnhancedFile = async (imgUrl) => {
  if (!imgUrl) {
    return;
  }
  var imgExt = getUrlExtension(imgUrl);
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const base64Value = await toBase64(blob);
  const file = new File([blob], 'image.' + imgExt, {
    type: blob.type,
  });
  return { thumbUrl: base64Value, originFileObj: file, name: file.name };
};
