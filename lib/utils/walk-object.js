var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const how_type_1 = __importDefault(require("./how-type"));
exports.default = (object, provKeyMap = '', callback) => {
    const size = Object.keys(object).length;
    Object.entries(object).map(([key, content]) => {
        const keyMap = `${provKeyMap !== '' ? provKeyMap + '.' : ''}${key}`;
        const type = how_type_1.default(content);
        callback({ key, content, size, type, keyMap });
        return null;
    });
};
