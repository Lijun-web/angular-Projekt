export function sliderEvent(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

export function getElementOffset(el: HTMLElement): {top: number; left: number;} {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    }
  }
  //该方法会返回dom元素盒子相关尺寸信息
  const rect = el.getBoundingClientRect();
  //取得元素所在的document节点的window对象
  const win = el.ownerDocument.defaultView ? el.ownerDocument.defaultView : window;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  }
}
