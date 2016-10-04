const modulePropertyMap = {
    id: 'id',
    moduleName: 'moduleName',
    moduleImageUrl: 'moduleImageUrl'
};

export function parseModule(data, propertyMapOverride = {}) {
    let module = {};
    const propertyMap = Object.assign({}, modulePropertyMap, propertyMapOverride);
    const propertyMapKeys = Object.keys(propertyMap);

    propertyMapKeys.map((key) => {
        const propertyName = propertyMap[key];
        if (propertyName && data[key]) {
            module[propertyName] = data[key];
        }
    });

    return module;
}
