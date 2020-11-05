var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_2 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const reducer_1 = __importDefault(require("./reducer"));
const stringMiddleware = () => next => type => {
    if (typeof action == 'string')
        return next({ type });
    return next(type);
};
const middleware = [redux_thunk_1.default, stringMiddleware];
const composeEnhancers = devTools => {
    if (!devTools)
        return redux_2.compose;
    return process.env.NODE_ENV === devTools ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_2.compose : redux_2.compose;
};
const store = (userStore = {}, options = {}) => {
    const { devTools = 'development' } = options;
    return redux_1.createStore(reducer_1.default(userStore), composeEnhancers(devTools)(redux_1.applyMiddleware(...middleware)));
};
exports.default = store;
