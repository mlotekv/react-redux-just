var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const first_up_case_1 = __importDefault(require("../utils/first-up-case"));
exports.default = (Component, stackCallback) => ({ setDeleteCallback, appStoreService, listRequest = {}, ...otherProps }) => {
    const [moreProps, setMoreProps] = react_1.default.useState({ Loading: true });
    react_1.default.useEffect(() => {
        const tmpProps = { ...moreProps };
        const updateMoreProps = updateProps => setMoreProps({ ...tmpProps, ...updateProps });
        Object.entries(listRequest).map(([key, request]) => {
            const { [`set${first_up_case_1.default(key)}`]: setKey } = otherProps;
            const functionRequest = () => {
                new Promise((resolve, reject) => {
                    updateMoreProps({ [`${key}Loading`]: true });
                    request(resolve, reject);
                }).then(res => {
                    updateMoreProps({ [`${key}Loading`]: undefined });
                    setKey(res, undefined, undefined, { isCallback: false });
                }).catch(err => {
                    updateMoreProps({ [`${key}RequestError`]: err, [`${key}Loading`]: undefined });
                });
            };
            tmpProps[`${key}Request`] = functionRequest;
            functionRequest();
            return null;
        });
    }, []);
    react_1.default.useEffect(() => () => {
        setDeleteCallback(stackCallback);
    }, [setDeleteCallback]);
    return react_1.default.createElement(Component, Object.assign({}, moreProps, otherProps));
};
