var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const first_up_case_1 = __importDefault(require("../../../utils/first-up-case"));
exports.default = {
    set: name => `set${first_up_case_1.default(name)}`,
    object: (item, name, { first = true, set: _set = true, object = true } = {}) => {
        let _item = (item && first) ? first_up_case_1.default(item) : item;
        _item = _set ? `set${_item ? _item : ''}` : _item;
        let _name = name ? first_up_case_1.default(name) : '';
        return `${_item ? _item : ''}${_item ? _name : name}`;
    },
    callback: name => `${name}Callback`
};
