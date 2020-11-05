Object.defineProperty(exports, "__esModule", { value: true });
const listErrors = {
    '10': 'An error occurred while initializing the "state" model',
    '20': 'Error processing object',
    '30': 'Store write error',
    '100': 'Type not initialized',
    '101': 'Error creating link to state, invalid name',
    '102': 'Type not initialized @handleMapObject',
    '103': 'Creation error, already exists',
    '104': 'Initialization error',
    '105': 'Initialization error'
};
const handleError = num => listErrors[num] ? listErrors[num] : 'Undefined number Error';
exports.default = (num, options, arg = {}) => {
    const { ___componentName = '__test__', __functionSetStateName = '' } = options;
    const { e, ...otherArg } = arg;
    const mess = ___componentName !== '__test__' ? `Component <${___componentName}> in function "${__functionSetStateName}"` : undefined;
    const err = new TypeError(mess);
    console.error(___componentName !== '__test__' ? ___componentName : '', 'ERROR:', num, handleError(num), '\n\n', { ...otherArg }, "\n\n", mess ? err : '', '\n', e ? e : '');
};
