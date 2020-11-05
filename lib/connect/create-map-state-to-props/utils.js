var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToListRequest = exports.addToMapProps = exports.handlerName = exports.handleMapObject = void 0;
const first_up_case_1 = __importDefault(require("../../utils/first-up-case"));
const is_valid_1 = __importDefault(require("../../utils/is-valid"));
const walk_object_1 = __importDefault(require("../../utils/walk-object"));
const handlers_error_1 = __importDefault(require("../../utils/handlers-error"));
const constant_1 = require("./constant");
const handlres = {
    map: (key, array, callback) => {
        array.map(content => {
            if (typeof content === 'string')
                callback(constant_1.IS_ARRAY_SIMPLE, { keyArray: content });
            return null;
        });
    },
    keyMap: (keyMap, type) => {
        const array = keyMap.split('.');
        array.splice(array.length - 1, 1);
        if (!type)
            return array[array.length - 1];
        return array.join('.');
    },
    options: (content, keyMap) => {
        let { name = handlres.keyMap(keyMap), type, receiving, dispatch, toProps } = content;
        type = !type ? constant_1.IS_SIMPLE : (type === 'object') ? constant_1.IS_OBJECT : constant_1.IS_SIMPLE;
        return { key: name, type, keyMap: handlres.keyMap(keyMap, true), options: { receiving, dispatch, toProps }, content };
    },
    valid: (arg0, arg1, valid) => ({ nameToComponent: valid ? (is_valid_1.default(arg0) ? arg0 : -1) : arg0, stateName: arg1 ? arg1 : arg0 }),
    name: (name, count, isAll) => count === 0 && !isAll ? name : first_up_case_1.default(name)
};
exports.handleMapObject = (props, _callback, provKeyMap = '') => {
    walk_object_1.default(props, provKeyMap, ({ key, content, size, type, keyMap }) => {
        const callback = (type, otherProps) => _callback({ key, content, type, keyMap, ...otherProps });
        switch (type) {
            case 'undefined':
                callback(constant_1.IS_SIMPLE);
                break;
            case 'array':
                if (content.length === 0)
                    callback(constant_1.IS_OBJECT);
                else
                    handlres.map(key, content, callback);
                break;
            case 'object':
                const sizeContent = Object.keys(content).length;
                if (sizeContent === 0) {
                    if (key === '__options')
                        _callback(handlres.options(content, keyMap));
                    else
                        callback(constant_1.IS_OBJECT);
                }
                else {
                    if (key === '__options') {
                        if (sizeContent > 0)
                            _callback(handlres.options(content, keyMap));
                    }
                    else
                        exports.handleMapObject(content, _callback, keyMap);
                }
                break;
            case 'string':
                callback(constant_1.IS_SIMPLE_RENAME, { size: keyMap.split('.').length });
                break;
            default: handlers_error_1.default(102, {}, { type });
        }
    });
};
exports.handlerName = (name, keyMap, { deleteLastKey = false, isValid: checkIsValid = true } = {}) => {
    let arrayName = Object.values(name);
    const assist = Object.values(`*:!`).map(s => arrayName.includes(s)).indexOf(true);
    if (assist === -1)
        return handlres.valid(name, undefined, checkIsValid);
    let countStart = 0, next = true;
    for (let sym of arrayName)
        if (sym === `*` && next)
            countStart++;
        else
            next = false;
    if (countStart > 0)
        arrayName.splice(0, countStart);
    const isAllAddres = arrayName[arrayName.length - 1] === '!';
    if (isAllAddres)
        arrayName.pop();
    const arrayKeyMap = keyMap.split('.');
    if (deleteLastKey && arrayKeyMap.length > 1)
        arrayKeyMap.pop();
    if (countStart > 0)
        arrayKeyMap.splice(0, isAllAddres ? 0 : arrayKeyMap.length - countStart);
    let [oldName, newName] = arrayName.join('').split(':'), nameToComponent = '';
    if (isAllAddres || countStart > 0)
        for (let addName of arrayKeyMap)
            nameToComponent += nameToComponent === '' ? addName : first_up_case_1.default(addName);
    nameToComponent += handlres.name(newName ? newName : oldName, countStart, isAllAddres);
    return handlres.valid(nameToComponent, oldName, checkIsValid);
};
exports.addToMapProps = (object, key, value, request) => {
    if (!object[key]) {
        object[key] = value;
        if (request)
            exports.addToListRequest(object, key, request);
    }
    else
        handlers_error_1.default(103, {}, { key });
};
exports.addToListRequest = (object, key, request) => {
    if (!object['listRequest'])
        object['listRequest'] = {};
    object.listRequest[key] = request;
};
