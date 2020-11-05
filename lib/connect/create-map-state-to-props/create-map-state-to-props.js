var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_options_1 = require("../../store/reducer/storage-options");
const create_link_address_to_1 = __importDefault(require("../../utils/create-link-address-to"));
const handlers_error_1 = __importDefault(require("../../utils/handlers-error"));
const utils_1 = require("./utils");
const constant_1 = require("./constant");
const createMapStateToProps = (props, state, __options = {}) => {
    let result = {};
    utils_1.handleMapObject(props, ({ keyMap, key, type, keyArray, content, options = {}, ...other }) => {
        const array = keyMap.split('.');
        const isKeyMap = array.length > 1;
        const { request } = create_link_address_to_1.default(`${keyMap}.__options`, storage_options_1.listOptions);
        switch (type) {
            case constant_1.IS_SIMPLE:
            case constant_1.IS_OBJECT:
                if (!isKeyMap && type === constant_1.IS_SIMPLE) {
                    const { receiving, toProps } = options;
                    if (toProps || receiving || content === undefined)
                        utils_1.addToMapProps(result, key, receiving ? receiving(state[key]) : state[key], request);
                    else
                        handlers_error_1.default(104, __options, { keyArray, keyMap, content });
                }
                else {
                    if (Object.keys(create_link_address_to_1.default(keyMap, props)).length <= 1) {
                        const { receiving } = options;
                        let [address, provKey] = create_link_address_to_1.default(keyMap, state, { deleteLastKey: true });
                        let tmp = address[provKey];
                        utils_1.addToMapProps(result, key, receiving ? receiving(tmp) : tmp, request);
                    }
                    else
                        handlers_error_1.default(105, __options, { keyArray, keyMap, content });
                }
                break;
            case constant_1.IS_ARRAY_SIMPLE:
                const { nameToComponent, stateName } = utils_1.handlerName(keyArray, keyMap);
                if (nameToComponent === -1)
                    handlers_error_1.default(101, __options, { keyArray, keyMap, content });
                else if (!isKeyMap) {
                    if (!state[key])
                        state[key] = {};
                    result[nameToComponent] = state[key][stateName];
                }
                else {
                    let address = create_link_address_to_1.default(array, state);
                    utils_1.addToMapProps(result, nameToComponent, address[stateName], request);
                }
                break;
            case constant_1.IS_SIMPLE_RENAME:
                let { size } = other;
                const { nameToComponent: newName } = utils_1.handlerName(content, keyMap, { deleteLastKey: true });
                if (newName === -1)
                    handlers_error_1.default(101, __options, { keyArray, keyMap, content });
                else {
                    if (size > 1) {
                        let [address] = create_link_address_to_1.default(keyMap, state, { deleteLastKey: true });
                        utils_1.addToMapProps(result, newName, address[key], request);
                    }
                    else
                        utils_1.addToMapProps(result, newName, state[keyMap], request);
                }
                break;
            default: handlers_error_1.default(100, __options, { type, keyArray, keyMap });
        }
        keyMap = '';
    });
    return result;
};
exports.default = createMapStateToProps;
