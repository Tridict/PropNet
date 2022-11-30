function fixedEncodeURI (str) {
  // 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
  // 如果 URL 需要遵循较新的RFC3986标准，那么方括号是被保留的 (给 IPv6)，因此对于那些没有被编码的 URL 部分 (例如主机)，可以使用下面的代码：
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

function fixedEncodeURIComponent (str) {
  // 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  // 对于 application/x-www-form-urlencoded (POST) 这种数据方式，空格需要被替换成 '+'，所以通常使用 encodeURIComponent 的时候还会把 "%20" 替换为 "+"。
  // 为了更严格的遵循 RFC 3986（它保留 !, ', (, ), 和 *），即使这些字符并没有正式划定 URI 的用途，下面这种方式是比较安全的：
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}


export function stringifyQs (params) {
  const res = [];
  // TODO
  // 需要为 url 转写编码
  // 否则如果 key 和 value 中出现特定字符就尴尬了
  // 比如 {key: "rr=gg&ii😄", value: "xx=ee&cc=ww"}
  // 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
  // 参考 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  for (const [key, value] of Object.entries(params)) {
    res.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`);
  }
  return res.join('&');
}
