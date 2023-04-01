export function loginBox(e, box) {
  box.style.animation = 'none';
  var diffx = e.clientX / 2;
  if (typeof box.setCapture !== 'undefined') {
    box.setCapture();
  }
  //  鼠标移动
  document.onmousemove = function (e) {
    // eslint-disable-next-line no-undef
    let moveX = (e.clientX / 2 - diffx) * 1 + moveXdefault;
    box.style.transform = 'rotateY(' + moveX + 'deg)';
    // 鼠标抬起
    document.onmouseup = function () {
      this.onmousemove = null;
      this.onmouseup = null;
      // eslint-disable-next-line no-undef
      moveXdefault = moveX;
      // console.log('保存的值' + moveXdefault);
      if (typeof box.releaseCapture != 'undefined') {
        //修复低版本ie bug
        box.releaseCapture();
      }
    };
  };
  document.onmouseup = function () {
    this.onmousemove = null;
    this.onmouseup = null;
    if (typeof box.releaseCapture != 'undefined') {
      //修复低版本ie bug
      box.releaseCapture();
    }
  };
}
