var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOptions = exports.handlerStateMapProvider = exports.listOptions = void 0;
const walk_object_1 = __importDefault(require("../../utils/walk-object"));
const create_link_address_to_1 = __importDefault(require("../../utils/create-link-address-to"));
const how_type_1 = __importDefault(require("../../utils/how-type"));
const check_type_1 = __importDefault(require("../../utils/check-type"));
const handlers_error_1 = __importDefault(require("../../utils/handlers-error"));
exports.listOptions = {};
const deleteOptions = (keyMap, store, type) => {
    const array = keyMap.split('.');
    if (array.length > 1) {
        let address = array.reduce((o, part, index) => index === 0 ? store[part] : o[part], {});
        delete address['__options'];
    }
    else {
        delete store[keyMap]['__options'];
        if (Object.keys(store[keyMap]).length > 0)
            type = 'object';
        if (type !== 'object')
            store[keyMap] = undefined;
    }
};
const searchKeyOptions = (store, callback, provKeyMap) => {
    let tmp_store = Object.assign({}, store);
    walk_object_1.default(tmp_store, provKeyMap, ({ key, content, size, type, keyMap }) => {
        if (key === '__options') {
            callback({
                keyMap: provKeyMap,
                options: content,
                size: Object.keys(tmp_store).length - 1
            });
        }
        else if (type === 'object')
            searchKeyOptions(content, callback, keyMap);
    });
};
exports.handlerStateMapProvider = (store, state, __options) => {
    searchKeyOptions(store, ({ options = {}, keyMap, size = 0 }) => {
        const saveOptions = buff_options => {
            let address = create_link_address_to_1.default(keyMap, exports.listOptions);
            if (Object.keys(buff_options).length > 0)
                address['__options'] = Object.assign({}, buff_options);
        };
        let { value, type, dispatch = false, request } = options;
        type = size >= 1 ? 'object' : type;
        let preparationOptions = Object.assign(options, {
            type,
            dispatch: how_type_1.default(dispatch) === 'function' ? dispatch : undefined,
            request: how_type_1.default(request) === 'function' ? request : undefined
        });
        if (type !== 'object' && size < 1) {
            let [address, lastKey, sizeKeyMap] = create_link_address_to_1.default(keyMap, store, { deleteLastKey: true });
            let isError = false;
            const typeValue = how_type_1.default(value);
            const isCheckType = check_type_1.default(type);
            if (type && isCheckType) {
                if (type !== typeValue)
                    isError = true;
            }
            else
                preparationOptions.type = type ? type : typeValue;
            if (isError && value) {
                handlers_error_1.default(10, __options, { keyMap, type, typeValue, isCheckType });
                preparationOptions.type = type;
                preparationOptions.value = undefined;
            }
            saveOptions(preparationOptions);
            const finalValue = !isError ? value : undefined;
            if (sizeKeyMap > 1)
                address[lastKey] = finalValue;
            else
                store[lastKey] = finalValue;
        }
        else {
            saveOptions(preparationOptions);
            deleteOptions(keyMap, store, preparationOptions.type);
        }
    });
};
const defaultResultSearchOptions = {
    dispatch: v => v
};
exports.searchOptions = strOrArray => {
    const type = how_type_1.default(strOrArray);
    const isMap = type === 'string' || type === 'array' ? type : undefined;
    const __buff = Object.assign({}, exports.listOptions);
    if (isMap) {
        const keyMap = type === 'string' ? `${strOrArray}.__options` : strOrArray.bush('__options');
        return {
            ...defaultResultSearchOptions,
            ...create_link_address_to_1.default(keyMap, __buff)
        };
    }
    return defaultResultSearchOptions;
};
