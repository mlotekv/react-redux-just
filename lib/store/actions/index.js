Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_CALLBACK = exports.CREATE_CALLBACK = exports.STATE_CLEAR = exports.STATE_DELETE = exports.SET_STATE_REPLACE = exports.SET_STATE = exports.setDeleteCallback = exports.setCallback = exports.stateClear = exports.stateDelete = exports.setStateReplayce = exports.setState = void 0;
const type_1 = require("./type");
Object.defineProperty(exports, "SET_STATE", { enumerable: true, get: function () { return type_1.SET_STATE; } });
Object.defineProperty(exports, "SET_STATE_REPLACE", { enumerable: true, get: function () { return type_1.SET_STATE_REPLACE; } });
Object.defineProperty(exports, "STATE_DELETE", { enumerable: true, get: function () { return type_1.STATE_DELETE; } });
Object.defineProperty(exports, "STATE_CLEAR", { enumerable: true, get: function () { return type_1.STATE_CLEAR; } });
Object.defineProperty(exports, "CREATE_CALLBACK", { enumerable: true, get: function () { return type_1.CREATE_CALLBACK; } });
Object.defineProperty(exports, "DELETE_CALLBACK", { enumerable: true, get: function () { return type_1.DELETE_CALLBACK; } });
exports.setState = (state, options) => {
    return {
        type: type_1.SET_STATE,
        state,
        options
    };
};
exports.setStateReplayce = (state, keyMap, options) => {
    return {
        type: type_1.SET_STATE_REPLACE,
        state,
        keyMap,
        options
    };
};
exports.stateDelete = (keyMap, options) => {
    return {
        type: type_1.STATE_DELETE,
        keyMap,
        options
    };
};
exports.stateClear = (keyMap, options) => {
    return {
        type: type_1.STATE_CLEAR,
        keyMap,
        options
    };
};
exports.setCallback = (keyMap, callback, options) => {
    return {
        type: type_1.CREATE_CALLBACK,
        keyMap,
        callback,
        options
    };
};
exports.setDeleteCallback = (list, options) => {
    return {
        type: type_1.DELETE_CALLBACK,
        list,
        options
    };
};
