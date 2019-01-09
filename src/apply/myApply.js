/**
 *  apply() 方法
 *  实现思路与 call() 方法相同，区别在于对参数的处理不同
 */

Function.prototype.myApply = function(context, arr) {

    if (typeof this !== 'function') {
        throw new Error('Function.prototype.myApply - which is trying to be bound is not callable');
    }

    context = context || window;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0; i < arr.length; i++) {
            args.push('arr['+ i + ']');
        }
        result = eval('context.fn('+ args +')');
    }
    delete context.fn;
    return result;
}
