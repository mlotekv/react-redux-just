Object.defineProperty(exports, "__esModule", { value: true });
const compose = (...funcs) => comp => {
    return funcs.reduceRight((wrapped, f) => f(wrapped), comp);
};
exports.default = compose;
