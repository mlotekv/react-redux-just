var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withConnectStore = exports.ProviderStore = void 0;
const store_1 = __importDefault(require("./lib/store"));
exports.ProviderStore = store_1.default;
const connect_1 = __importDefault(require("./lib/connect"));
exports.withConnectStore = connect_1.default;
