var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const how_type_1 = __importDefault(require("./how-type"));
exports.default = value => {
    const type = how_type_1.default(value);
    switch (type) {
        case 'object': return {};
        case 'array': return [];
        case 'number': return 0;
        case 'bigint': return 0;
        case 'string': return '';
        case 'function': return () => { };
        case 'boolean': return false;
        default:
            return undefined;
    }
};
