"use strict";
exports.PubSub = {
    storage: {},
    subscribe: function (eventName, func) {
        if (!this.storage.hasOwnProperty(eventName)) {
            this.storage[eventName] = [];
        }
        this.storage[eventName].push(func);
    },
    publish: function (eventName, data) {
        (this.storage[eventName] || []).forEach(function (func) {
            func(data);
        });
    },
    unSubscribe: function (eventName, func) {
        var index = this.storage[eventName].indexOf(func);
        if (index > -1) {
            this.storage[eventName].splice(index, 1);
        }
        ;
    }
};
