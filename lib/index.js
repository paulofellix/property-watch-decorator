"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnChange = void 0;
function OnChange(callback) {
    var cachedValueKey = Symbol();
    var isFirstChangeKey = Symbol();
    return function (target, key) {
        var callBackFn = typeof callback === 'string' ? target[callback] : callback;
        if (!callBackFn) {
            throw new Error("Cannot find method " + callback + " in class " + target.constructor.name);
        }
        Object.defineProperty(target, key, {
            set: function (value) {
                var _this = this;
                // change status of "isFirstChange"
                this[isFirstChangeKey] = this[isFirstChangeKey] === undefined;
                // No operation if new value is same as old value
                if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
                    return;
                }
                var oldValue = this[cachedValueKey];
                this[cachedValueKey] = value;
                var simpleChange = {
                    propertyKey: key,
                    firstChange: this[isFirstChangeKey],
                    previousValue: oldValue,
                    currentValue: this[cachedValueKey],
                    isFirstChange: function () { return _this[isFirstChangeKey]; },
                };
                callBackFn.call(this, this[cachedValueKey], simpleChange);
            },
            get: function () {
                return this[cachedValueKey];
            },
        });
    };
}
exports.OnChange = OnChange;
