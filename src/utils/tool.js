//防抖(合并版)
export function debounce(fn, wait = 500, isImmediate = false) {
  var timerId = null;
  var flag = true;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timerId);
    if (isImmediate) {
      if (flag) {
        fn.apply(context, args);
        flag = false;
      }
      timerId = setTimeout(function () {
        flag = true;
      }, wait);
    } else {
      timerId = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    }
  };
}
//节流(立即执行)
export function throttle(fn, wait) {
  var flag = true;
  return function () {
    var context = this;
    var args = arguments;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, wait);
    }
  };
}
// 时间装换为年月日
export function TimeChang(timestamp) {
  timestamp = timestamp + '';
  // 时间戳为10位需*1000，时间戳为13位不需乘1000
  if (timestamp.length == 13) {
    timestamp = timestamp * 1;
  } else if (timestamp.length == 10) {
    timestamp = timestamp * 1000;
  } else {
    console.log('时间戳错误');
  }
  // console.log(timestamp);
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '年';
  var M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '月';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
  // this.upTime = M + D;
  return Y + M + D;
}
// 歌曲时长装换
export function songTimeChang(ms) {
  // 处理歌曲时长
  var minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (ms % (1000 * 60)) / 1000;
  return minutes + ':' + parseInt(seconds, 10);
}
