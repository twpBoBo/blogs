let moveXdefault = 0;
export function loginBox(e, box) {
  box.style.animation = 'none';
  var diffx = e.clientX / 2;
  if (typeof box.setCapture !== 'undefined') {
    box.setCapture();
  }
  //  鼠标移动
  document.onmousemove = function (e) {
    let moveX = (e.clientX / 2 - diffx) * 1;

    // 鼠标抬起
    document.onmouseup = function () {
      this.onmousemove = null;
      this.onmouseup = null;
      if (moveX > 0) {
        moveXdefault++;
      } else {
        moveXdefault--;
      }
      box.style.transform = 'rotateY(' + moveXdefault * 90 + 'deg)';
      // moveXdefault = moveX;
      console.log('保存的值' + moveXdefault);
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
