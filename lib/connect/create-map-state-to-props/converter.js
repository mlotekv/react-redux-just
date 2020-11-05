var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const how_type_1 = __importDefault(require("../../utils/how-type"));
const utils_1 = require("./utils");
const handleString = (mapModelToProps) => {
    const keyMap = mapModelToProps.split('.');
    const size = keyMap.length;
    if (size <= 1) {
        const { nameToComponent, stateName } = utils_1.handlerName(mapModelToProps, mapModelToProps, { isValid: false });
        return { [stateName]: nameToComponent };
    }
    let result = {};
    keyMap.reduce((o, part, index) => {
        if (index === size - 1) {
            const { nameToComponent, stateName } = utils_1.handlerName(part, mapModelToProps, { isValid: false });
            o[stateName] = nameToComponent;
        }
        else
            o[part] = o[part] ? o[part] : {};
        return o[part];
    }, result);
    return result;
};
exports.default = (mapModelToProps) => {
    const type = how_type_1.default(mapModelToProps);
    switch (type) {
        case 'string':
            return handleString(mapModelToProps);
        case 'array':
            let result = {};
            mapModelToProps.map(item => {
                if (how_type_1.default(item) === 'string')
                    result = { ...result, ...handleString(item) };
                if (how_type_1.default(item) === 'object')
                    result = { ...result, ...item };
                return null;
            });
            return result;
        default:
            return mapModelToProps;
    }
};
