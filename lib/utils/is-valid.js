Object.defineProperty(exports, "__esModule", { value: true });
exports.default = str => {
    let iChars = "~`!#$%^&*+=-[]\\';,/{}|\":<>?";
    for (let i = 0; i < str.length; i++)
        if (iChars.indexOf(str.charAt(i)) !== -1)
            return false;
    return true;
};
