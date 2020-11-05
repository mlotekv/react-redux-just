Object.defineProperty(exports, "__esModule", { value: true });
exports.default = type => {
    const arrayType = ['undefined', 'number', 'bigint', 'boolean', 'string',
        'symbol', 'object', 'null', 'function', 'array', 'date'];
    return arrayType.includes(type);
};
