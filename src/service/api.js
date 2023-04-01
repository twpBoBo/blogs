import request from '../utils/request';
// 注册;
export function registerAPI(data) {
  return request({
    url: `/register`,
    method: 'post',
    data
  });
}
// 登录;
export function loginAPI(data) {
  return request({
    url: `/login`,
    method: 'post',
    data
  });
}
// 音乐列表
export function songAPI(data) {
  return request({
    url: `/mucis`,
    method: 'get',
    data
  });
}
// 音乐搜索
export function searchAPI(data) {
  return request({
    url: `/Muiscsearch`,
    method: 'get',
    data
  });
}
// 音乐播放
export function songUrlAPI(data) {
  return request({
    url: '/songUrl',
    method: 'get',
    data
  });
}

// 音乐歌词
export function songLyricAPI(data) {
  return request({
    url: `/songLyric`,
    method: 'get',
    data
  });
}
