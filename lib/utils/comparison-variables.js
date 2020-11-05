var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const how_type_1 = __importDefault(require("./how-type"));
const allowed = ['string', 'number', 'bigint', 'undefined', 'null'];
const u_allowed = ['boolean', 'symbol', 'date'];
exports.default = (prm, prm2) => {
    const first = how_type_1.default(prm);
    const second = how_type_1.default(prm2);
    const isFree = first === 'undefined' || first === 'null';
    if (isFree && (allowed.includes(second) || u_allowed.includes(second)))
        return true;
    if (first === second)
        return true;
    if (allowed.includes(first) && allowed.includes(second))
        return true;
    return false;
};
