// 缓存本地
export const setSession = (name, val) => {
  if (!string(name)) {
    return false;
  }
  window.sessionStorage.setItem(name, JSON.stringify(val) || "[]");
}

// 获取本地
export const getSession = (name) => {
  if (!string(name)) {
    return false;
  }
  return JSON.parse(window.sessionStorage.getItem(name));
}

// 删除本地
export const removeSession = (name) => {
  if (!string(name)) {
    return false;
  }
  window.sessionStorage.removeItem(name);
}

// 判断类型
function string(name) {
  return typeof name === 'string';
}