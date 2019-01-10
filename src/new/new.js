/** 
 * new 的过程：
 * 1. 新建一个对象；
 * 2. 链接到原型；
 * 3. 绑定 this；
 * 4. 返回新对象。
 */

// 第一版
function objectFactory() {
    // 创建一个空的对象
    let obj = new Object();
    // 获取外部传入的构造器
    let Constructor = Array.prototype.shift.call(arguments);
    // 指向正确的原型
    obj.__proto__ = Constructor.prototype;
    // 绑定 this，执行构造函数
    let result = Constructor.apply(obj, arguments);
    // 确保创建的是对象 或 函数
    return result instanceof Object ? result : obj;
}

// 第二版
function objectFactory() {
    // 把 arguments 转为数组
    let args = Array.prototype.slice.call(arguments);
    // 获取外部传入的构造器
    let Constructor = args.shift();
    // 创建 Constructor 实例 obj
    let obj = Object.create(Constructor.prototype);
    // 绑定 this，执行构造函数
    let result = Constructor.apply(obj, args);
    // 确保创建的是对象 或 函数
    return result instanceof Object ? result : obj;
}

/**
 * Object.create() 的实现：
 * 1. 创建一个新对象；
 * 2. 使用现有的对象来提供新创建的对象的__proto__。
 */

function create(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
}
