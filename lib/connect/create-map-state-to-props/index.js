var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const actions_1 = require("../../store/actions");
const create_map_state_to_props_1 = __importDefault(require("./create-map-state-to-props"));
const create_map_dispatch_props_1 = __importDefault(require("./create-map-dispatch-props"));
const converter_1 = __importDefault(require("./converter"));
const createActions = (listActions, dispatch) => {
    let def = !listActions ? { setState: actions_1.setState } : {};
    listActions = listActions ? listActions : {};
    return redux_1.bindActionCreators({
        ...listActions,
        ...def,
    }, dispatch);
};
exports.default = (mapModelToProps, options) => {
    const props = converter_1.default(mapModelToProps);
    const { mapStateToProps, mapDispatchToProps } = props;
    if (mapStateToProps)
        return { mapStateToProps,
            mapDispatchToProps: mapDispatchToProps ? mapDispatchToProps : dispatch => { return createActions(undefined, dispatch); }
        };
    const isArray = Array.isArray(props);
    if (!isArray && typeof props === 'object') {
        return {
            mapStateToProps: state => create_map_state_to_props_1.default(props, state, options),
            mapDispatchToProps: (dispatch, { appStoreService }) => {
                const actions = create_map_dispatch_props_1.default(props, appStoreService, options);
                return createActions(actions, dispatch);
            }
        };
    }
    return {};
};
