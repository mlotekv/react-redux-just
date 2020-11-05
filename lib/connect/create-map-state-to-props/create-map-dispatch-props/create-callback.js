var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../store/actions");
const create_link_address_to_1 = __importDefault(require("../../../utils/create-link-address-to"));
const compare_array_1 = __importDefault(require("../../../utils/compare-array"));
exports.default = ({ keyMap, keyArray, options }) => (callback, arrayPrm = [0]) => {
    const { id, stackCallback } = options;
    let tmp = keyArray ? `.${keyArray}` : '';
    let _keymap = keyMap + tmp;
    let address = create_link_address_to_1.default(_keymap + '.__options', stackCallback);
    if (!address['callbacks'])
        address['callbacks'] = {};
    if (!address['callbacks'].prm)
        address['callbacks'].prm = [];
    if (compare_array_1.default(address['callbacks'].prm, arrayPrm))
        return () => { };
    address['callbacks'].prm = arrayPrm;
    address['callbacks'].idCallback = id;
    return actions_1.setCallback(_keymap, callback, options);
};
