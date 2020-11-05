var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../store/actions");
const handlers_error_1 = __importDefault(require("../../../utils/handlers-error"));
const create_link_address_to_1 = __importDefault(require("../../../utils/create-link-address-to"));
const utils_1 = require("../utils");
const constant_1 = require("../constant");
const create_name_1 = __importDefault(require("./create-name"));
const create_state_1 = __importDefault(require("./create-state"));
const create_callback_1 = __importDefault(require("./create-callback"));
const createMapDispatchToProps = (props, appStoreService, optionsUp = {}) => {
    const createOptions = name => ({ __functionSetStateName: name, ...optionsUp });
    let actions = {};
    let setName, callbackName;
    utils_1.handleMapObject(props, ({ key, type, options: modelOptions = {}, content, keyMap, keyArray, ...other }) => {
        const { toProps } = modelOptions;
        const array = keyMap.split('.');
        const isKeyMap = array.length > 1;
        switch (type) {
            case constant_1.IS_SIMPLE:
            case constant_1.IS_OBJECT:
                let arrow = true;
                if ((!isKeyMap || type === constant_1.IS_SIMPLE) && content !== undefined)
                    arrow = !toProps ? false : true;
                if (!arrow) {
                    arrow = Object.keys(create_link_address_to_1.default(keyMap, props)).length <= 1 ? true : false;
                }
                if (arrow) {
                    setName = create_name_1.default.set(key);
                    callbackName = create_name_1.default.callback(key);
                    utils_1.addToMapProps(actions, setName, create_state_1.default({ keyMap, ...modelOptions, options: createOptions(setName) }));
                    utils_1.addToMapProps(actions, callbackName, create_callback_1.default({ keyMap, options: createOptions(callbackName) }));
                }
                break;
            case constant_1.IS_ARRAY_SIMPLE:
                const { nameToComponent, stateName } = utils_1.handlerName(keyArray, keyMap);
                if (nameToComponent === -1)
                    handlers_error_1.default(101, optionsUp, { keyArray, keyMap, content });
                else {
                    setName = create_name_1.default.set(nameToComponent);
                    callbackName = create_name_1.default.callback(nameToComponent);
                    utils_1.addToMapProps(actions, setName, create_state_1.default({ keyMap, keyArray: stateName, type, options: createOptions(setName) }));
                    utils_1.addToMapProps(actions, callbackName, create_callback_1.default({ keyMap, keyArray: stateName, options: createOptions(callbackName) }));
                }
                break;
            case constant_1.IS_SIMPLE_RENAME:
                const { nameToComponent: newName } = utils_1.handlerName(content, keyMap, { deleteLastKey: true });
                if (newName === -1)
                    handlers_error_1.default(101, optionsUp, { keyArray, keyMap, content });
                else {
                    setName = create_name_1.default.set(newName);
                    callbackName = create_name_1.default.callback(newName);
                    utils_1.addToMapProps(actions, setName, create_state_1.default({ keyMap, type, options: createOptions(setName) }));
                    utils_1.addToMapProps(actions, callbackName, create_callback_1.default({ keyMap, options: createOptions(callbackName) }));
                }
                break;
            default: handlers_error_1.default(100, optionsUp, { type, keyArray, keyMap });
        }
        keyMap = '';
    });
    actions['setState'] = value => actions_1.setState(value, createOptions('setState'));
    actions['setDeleteCallback'] = list => actions_1.setDeleteCallback(list, createOptions('setDeleteCallback'));
    return actions;
};
exports.default = createMapDispatchToProps;
