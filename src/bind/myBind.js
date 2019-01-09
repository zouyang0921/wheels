/** 
 * bind() 方法会创建一个新函数。
 * 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
 * 之后的一序列参数将会在传递的实参前传入作为它的参数。
 * 
 * 特点：
 * 1. 返回一个函数；
 * 2. 可以传入参数；
 * 3. 一个绑定函数也能使用new操作符创建对象：就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 */
Function.prototype.myBind = function(context) {

    if (typeof this !== 'function') {
        throw new Error('Function.prototype.myBind - which is trying to be bound is not callable');
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function() {};

    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
