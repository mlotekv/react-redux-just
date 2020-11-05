var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("../store/actions");
const with_service_store_1 = __importDefault(require("../components/with-service-store"));
const interim_1 = __importDefault(require("../components/interim"));
const compose_1 = __importDefault(require("../utils/compose"));
const uuid_1 = __importDefault(require("../utils/uuid"));
const create_map_state_to_props_1 = __importDefault(require("./create-map-state-to-props"));
const _def_mapDispatchToProps = { setState: actions_1.setState };
const _def_dispath = true;
function default_1(Component, keys = {}, options = {}) {
    const { dispath = _def_dispath } = options;
    let stackCallback = {};
    const _options = {
        dispath,
        ___componentName: Component.name,
        id: uuid_1.default(),
        stackCallback
    };
    const { mapStateToProps, mapDispatchToProps } = create_map_state_to_props_1.default(keys, _options);
    return compose_1.default(with_service_store_1.default(_options), react_redux_1.connect(mapStateToProps, dispath ? mapDispatchToProps : _def_mapDispatchToProps))(interim_1.default(Component, stackCallback));
}
exports.default = default_1;
