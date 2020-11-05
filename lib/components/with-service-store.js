var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const provider_1 = require("../store/provider");
const withServiceStore = options => Component => {
    return props => {
        return (react_1.default.createElement(provider_1.ConsumerContext, null, serviceStore => {
            return react_1.default.createElement(Component, Object.assign({}, props, { appStoreService: serviceStore }));
        }));
    };
};
exports.default = withServiceStore;
