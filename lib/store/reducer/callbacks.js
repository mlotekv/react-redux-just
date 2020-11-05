var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCallback = exports.createCallback = void 0;
const storage_options_1 = require("./storage-options");
const create_link_address_to_1 = __importDefault(require("../../utils/create-link-address-to"));
const walk_object_1 = __importDefault(require("../../utils/walk-object"));
const utils_1 = require("./utils");
exports.createCallback = ({ keyMap, callback, id }) => {
    let address = create_link_address_to_1.default(`${keyMap}.__options.callbacks`, storage_options_1.listOptions);
    address[id] = callback;
};
exports.deleteCallback = ({ list, id }) => {
    walk_object_1.default(list, undefined, ({ key, content }) => {
        utils_1.handlerObjectMap(content, ({ keyMap, key: _key }) => {
            if (_key === 'idCallback') {
                let newKeyMap = keyMap.split('.');
                newKeyMap.pop();
                newKeyMap.unshift(key);
                let address = create_link_address_to_1.default(newKeyMap, storage_options_1.listOptions);
                delete address[id];
            }
        });
    });
};
