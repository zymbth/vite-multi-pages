/**
 * typeof link
 * @param {*} data
 * @see https://juejin.cn/post/7000300249235357709#heading-3
 */
function myTypeof(data) {
  return data instanceof Element
    ? 'element'
    : Object.prototype.toString
        .call(data)
        .replace(/\[object\s(.+)\]/, '$1')
        .toLowerCase()
}
