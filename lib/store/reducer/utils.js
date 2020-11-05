var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerStateMap = exports.handlersDispatches = exports.handlerTypeComparison = exports.searchCallback = exports.handlerObjectMap = void 0;
const storage_options_1 = require("./storage-options");
const create_link_address_to_1 = __importDefault(require("../../utils/create-link-address-to"));
const comparison_variables_1 = __importDefault(require("../../utils/comparison-variables"));
const handlers_error_1 = __importDefault(require("../../utils/handlers-error"));
const walk_object_1 = __importDefault(require("../../utils/walk-object"));
const storage_options_2 = require("./storage-options");
exports.handlerObjectMap = (content, callback, provKeyMap) => {
    walk_object_1.default(content, provKeyMap, ({ key, content, type, keyMap }) => {
        if (type !== 'object')
            callback({ key, value: content, keyMap });
        else
            exports.handlerObjectMap(content, callback, keyMap);
    });
};
exports.searchCallback = (actionState, id, lastKey, provKeyMap) => {
    if (id && lastKey)
        walk_object_1.default(actionState, provKeyMap, ({ key, keyMap, content, type }) => {
            if (key === lastKey) {
                const { callbacks = {} } = storage_options_1.searchOptions(keyMap);
                if (callbacks[id] && typeof callbacks[id] === 'function')
                    callbacks[id](content);
            }
            else if (type === 'object')
                exports.searchCallback(content, id, lastKey, keyMap);
        });
};
exports.handlerTypeComparison = (prov, next, stateMap, options) => {
    if (!comparison_variables_1.default(prov, next, stateMap, storage_options_2.listOptions)) {
        handlers_error_1.default(30, options, { stateMap, prov, next });
        options.isError = true;
        return false;
    }
    else
        return true;
};
exports.handlersDispatches = (key, value, provValue, dispatchModel = v => v) => {
    const { dispatch = v => v, ...otherOptions } = storage_options_1.searchOptions(key);
    if (typeof value === 'function' && typeof provValue !== 'function')
        value = value(provValue);
    let handle_value = dispatchModel(value, provValue, otherOptions);
    return dispatch(handle_value, provValue, otherOptions);
};
const recToState = (provValue, { key, keyMap, value: nextValue, options }) => {
    const { dispatch: dispatchModel = v => v } = options;
    let value = dispatchModel(nextValue, provValue);
    value = exports.handlersDispatches(`${key}.${keyMap}`, nextValue, provValue, dispatchModel);
    if (exports.handlerTypeComparison(provValue, value, keyMap, options))
        return value;
    return provValue;
};
const __handlerStateMap = (state, { key, keyMap, value, options }) => {
    const recProps = { key, keyMap, value, options };
    if (keyMap.split('.').length > 1) {
        let [addressProv, keyProv] = create_link_address_to_1.default(keyMap, state, { deleteLastKey: true });
        addressProv[keyProv] = recToState(addressProv[keyProv], recProps);
    }
    else
        state[keyMap] = recToState(state[keyMap], recProps);
};
exports.handlerStateMap = (state, other) => {
    const { options } = other;
    try {
        __handlerStateMap(state, other);
    }
    catch (e) {
        options.isError = true;
        handlers_error_1.default(20, options, { state, e });
    }
};
