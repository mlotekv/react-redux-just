var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceStore = exports.ConsumerContext = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store"));
const service_1 = require("./service");
const serviceStore = new service_1.createServiceStore();
exports.serviceStore = serviceStore;
const { Provider: ProviderContext, Consumer: ConsumerContext } = react_1.createContext();
exports.ConsumerContext = ConsumerContext;
const ProviderStore = ({ model = {}, children }) => {
    const { state: initState, options, ...other } = model;
    return (react_1.default.createElement(react_redux_1.Provider, { store: store_1.default(initState, options) },
        react_1.default.createElement(ProviderContext, { value: other },
            " ",
            children)));
};
exports.default = ProviderStore;
