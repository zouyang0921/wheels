/** 
 * 函数节流
 * 
 * @param  {funciton} func 需要节流的函数
 * @param  {number}   wait 时间间隔
 * @param  {object}   options 
 *                      - leading  禁用第一次执行
 *                      - trailing 禁用停止触发的回调
 * @return {function} 返回用户调用的函数
 */

function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0; // 之前的时间戳
    if (!options) options = {};
    
    var later = function() {
        // 如果设置了 leading 为 false，就将 previous 设为 0
        // 用于下面函数的第一个 if 判断
        previous = options.leading === false ? 0 : new Date().getTime();
        // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        // 如果需要第一次不执行函数，就将上次的时间戳设为当前的
        // 这样接下来计算 remaining 的值时会大于 0
        if (!previous && options.leading === false) previous = now;
        // 计算剩余时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了，或者用户改了系统时间
        // 如果没有设置 leading 为 false，那么第一次会进入这个条件
        // 如果设置了 trial 为 false，只会进入这个条件
        if (remaining <= 0 || remaining > wait) {
            // 如果存在定时器就清除，否则会二次回调
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // 判断是否设置了定时器和 trailing
            // 没有定时器的话就开启一个定时器
            // 并且不能同时设置 leading 和 trailing
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    return throttled;
}
