/** 
 * call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
 * 
 * 实现思路：
 * 1. 将函数设为对象的属性；
 * 2. 执行该函数；
 * 3. 删除该函数。
 */

Function.prototype.myCall = function(context) {

    if (typeof this !== 'function') {
        throw new Error('Function.prototype.myCall - which is trying to be bound is not callable');
    }

    context = context || window;
    context.fn = this;
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args + ')');
    delete context.fn;
    return result;
}
