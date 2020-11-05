Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prm => {
    const _type = typeof prm;
    let isArray = _type === 'object' && Array.isArray(prm), isNull = _type === 'object' && prm === null, isDate = _type === 'object' && prm instanceof Date && !isNaN(prm.valueOf()), type = isNull ? 'null' : isArray ? 'array' : isDate ? 'date' : _type;
    return type;
};
