/** 
 * 函数防抖，返回的函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * 
 * @param  {funciton} func 需要防抖的函数
 * @param  {number}   wait 等待时间
 * @param  {boolean}  immediate 是否立即调用函数
 * @return {function} 返回用户调用的函数
 */

function debounce(func, wait, immediate) {
    var timeout, result;

    var debounced = function() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) {
                result = func.apply(context, args);
            }
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        return result;
    };

    return debounced;
}
