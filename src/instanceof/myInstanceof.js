/**
 * instanceof 可以正确的判断对象的类型
 * 
 * 内部机制：
 * 通过判断对象的原型链中是不是能找到类型的 prototype
 */

function myInstanceof(left, right) {
    var prototype = right.prototype;
    left = left.__proto__;
    while (true) {
        if (left === null || left === undefined)
            return false;
        if (prototype === left)
            return true;
        left = left.__proto__;
    }
}
