import request from '../utils/request';
import requestproxy from '../utils/requestproxy';

// // node服务器
// // 注册;
// export function registerAPI(data) {
//   return request({
//     url: `/register`,
//     method: 'post',
//     data
//   });
// }
// // 登录;
// export function loginAPI(data) {
//   return request({
//     url: `/login`,
//     method: 'post',
//     data
//   });
// }
// // 音乐列表
// export function songAPI(data) {
//   return request({
//     url: `/mucis`,
//     method: 'get',
//     data
//   });
// }
// // 音乐搜索
// export function searchAPI(data) {
//   return request({
//     url: `/Muiscsearch`,
//     method: 'get',
//     data
//   });
// }
// // 音乐播放
// export function songUrlAPI(data) {
//   return request({
//     url: '/songUrl',
//     method: 'get',
//     data
//   });
// }

// // 音乐歌词
// export function songLyricAPI(data) {
//   return request({
//     url: `/songLyric`,
//     method: 'get',
//     data
//   });
// }

// mock模拟数据
export function loginAPI(data) {
  return request({
    url: `/api/login`,
    method: 'post',
    data
  });
}
//添加用户
export function registerAPI(data) {
  return request({
    url: `/api/register`,
    method: 'post',
    data
  });
}
// 音乐
export function songAPI(data) {
  return requestproxy({
    url: `/playlist/detail?id=19723756`,
    method: 'get',
    data
  });
}
// 音乐搜索
export function searchAPI(data) {
  return requestproxy({
    url: `/search`,
    method: 'get',
    data
  });
}
// 音乐播放
export function songUrlAPI(data) {
  return requestproxy({
    url: `song/url/v1?id=${data.id}&level=lossless`,
    method: 'get'
  });
}

// 音乐歌词
export function songLyricAPI(data) {
  return requestproxy({
    url: `/lyric`,
    method: 'get',
    data
  });
}
