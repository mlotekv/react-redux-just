var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
const service_1 = __importDefault(require("../service"));
const storage_options_1 = require("./storage-options");
const comparison_variables_1 = __importDefault(require("../../utils/comparison-variables"));
const walk_object_1 = __importDefault(require("../../utils/walk-object"));
const clear_value_1 = __importDefault(require("../../utils/clear-value"));
const create_link_address_to_1 = __importDefault(require("../../utils/create-link-address-to"));
const utils_1 = require("./utils");
const callbacks_1 = require("./callbacks");
const reducer = (store = {}) => {
    return (state = service_1.default, action) => {
        const { keyMap, options = {}, callback, list } = action;
        const { id, size, lastKey, dispatch: dispatchModel = v => v } = options;
        options.isError = false;
        storage_options_1.handlerStateMapProvider(store, state, options);
        state = {
            ...state,
            ...Object.assign({}, store)
        };
        store = {};
        switch (action.type) {
            case actions_1.SET_STATE:
                let result = {};
                walk_object_1.default(action.state, undefined, ({ key, type, content }) => {
                    let stateContent = Object.assign({}, state[key]);
                    if (!comparison_variables_1.default(content, stateContent)) {
                        let value = utils_1.handlersDispatches(key, content, stateContent, dispatchModel);
                        if (utils_1.handlerTypeComparison(state[key], value, key, options))
                            stateContent = value;
                    }
                    else {
                        if (key === lastKey)
                            content = utils_1.handlersDispatches(key, content, stateContent);
                        utils_1.handlerObjectMap(content, props => utils_1.handlerStateMap(stateContent, { ...props, key, options }));
                    }
                    result[key] = stateContent;
                });
                if (!options.isError)
                    utils_1.searchCallback(action.state, id, lastKey);
                return {
                    ...state,
                    ...result
                };
            case actions_1.SET_STATE_REPLACE:
                if (size > 1) {
                    let [address, keyProv] = create_link_address_to_1.default(keyMap, state, { deleteLastKey: true });
                    address[keyProv] = action.state;
                }
                else
                    state[keyMap] = action.state;
                return state;
            case actions_1.STATE_CLEAR:
            case actions_1.STATE_DELETE:
                if (size > 1) {
                    let [address, keyProv] = create_link_address_to_1.default(keyMap, state, { deleteLastKey: true });
                    address[keyProv] = action.type === actions_1.STATE_CLEAR ? clear_value_1.default(address[keyProv]) : undefined;
                }
                else
                    state[keyMap] = action.type === actions_1.STATE_CLEAR ? clear_value_1.default(state[keyMap]) : undefined;
                return state;
            case actions_1.CREATE_CALLBACK:
                callbacks_1.createCallback({ keyMap, callback, id });
                return state;
            case actions_1.DELETE_CALLBACK:
                callbacks_1.deleteCallback({ list, id });
                return state;
            default:
                return state;
        }
    };
};
exports.default = reducer;
