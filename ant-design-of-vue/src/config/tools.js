// 请求后端接口的地址
// const apiUrl = "http://localhost:8080";
const apiUrl = "http://localhost:8080";

//原生js实现复制内容到剪切板，兼容pc、移动端（支持Safari浏览器）
function copy(text) {
  if (typeof document.execCommand !== "function") {
    alert("复制失败，请长按复制");
    return;
  }
  var dom = document.createElement("textarea");
  dom.value = text;
  dom.setAttribute("style", "display: block;width: 1px;height: 1px;");
  document.body.appendChild(dom);
  dom.select();
  var result = document.execCommand("copy");
  document.body.removeChild(dom);
  if (result) {
    return;
  }
  if (typeof document.createRange !== "function") {
    return;
  }
  var range = document.createRange();
  var div = document.createElement("div");
  div.innerHTML = text;
  div.setAttribute("style", "height: 1px;fontSize: 1px;overflow: hidden;");
  document.body.appendChild(div);
  range.selectNode(div);
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
  selection.addRange(range);
  document.execCommand("copy");
}

// 编码Base64
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

// 解码Base64
function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export default {
  apiUrl,
  copy,
  utf8_to_b64,
  b64_to_utf8,
};
