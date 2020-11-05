var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const how_type_1 = __importDefault(require("./how-type"));
exports.default = (arrayOrkeymap, state, { deleteLastKey = false } = {}) => {
    let tmp = {};
    const type = how_type_1.default(arrayOrkeymap);
    const array = type === 'array' ? arrayOrkeymap : type === 'string' ? arrayOrkeymap.split('.') : false;
    const size = array.length;
    let lastKey = array[size - 1];
    if (size > 1 && deleteLastKey)
        lastKey = array.pop();
    let address = array.reduce((o, part, index) => {
        if (index === 0) {
            state[part] = state[part] ? state[part] : {};
            return state[part];
        }
        else {
            o[part] = o[part] ? o[part] : {};
            return o[part];
        }
    }, tmp);
    if (!deleteLastKey)
        return address;
    else
        return [address, lastKey, size];
};
