Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../store/actions");
exports.default = ({ keyMap: _keyMap, keyArray: itemObject, dispatch = v => v, options, ...other }) => {
    const setFunction = (value, undefined_1, undefined_2, { isDelete = false, isClear = false, isReplace = false, isCallback = true } = {}) => {
        let lastKey = _keyMap.split('.').pop();
        let keyMap = itemObject ? `${_keyMap}.${itemObject}` : _keyMap;
        const map = keyMap.split('.'), size = map.length;
        if (isDelete)
            return actions_1.stateDelete(keyMap, { ...options, size });
        if (isClear)
            return actions_1.stateClear(keyMap, { ...options, size });
        if (isReplace)
            return actions_1.setStateReplayce(value, keyMap, { ...options, size, lastKey: isCallback ? lastKey : undefined, dispatch });
        let tmp = {};
        map.reduce((o, part, index) => {
            if (index === size - 1)
                o[part] = value;
            else
                o[part] = o[part] ? o[part] : {};
            return o[part];
        }, tmp);
        if (isDelete)
            actions_1.stateDelete({ keyMap });
        if (isClear)
            actions_1.stateClear({ keyMap });
        if (isReplace)
            actions_1.setStateReplayce({ keyMap });
        return actions_1.setState(tmp, { ...options, lastKey: isCallback ? lastKey : undefined, dispatch });
    };
    setFunction.__proto__.clear = function () {
        this.apply(undefined, [undefined, undefined, undefined, { isClear: true }]);
    };
    setFunction.__proto__.delete = function () {
        this.apply(undefined, [undefined, undefined, undefined, { isDelete: true }]);
    };
    setFunction.__proto__.replace = function (value) {
        this.apply(undefined, [value, undefined, undefined, { isReplace: true }]);
    };
    return setFunction;
};
