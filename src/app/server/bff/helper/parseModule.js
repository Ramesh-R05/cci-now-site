const modulePropertyMap = {
    id: 'id',
    moduleName: 'moduleName',
    moduleImageUrl: 'moduleImageUrl'
};

export default function parseModule(data, propertyMapOverride = {}) {
    const module = {};
    const propertyMap = Object.assign({}, modulePropertyMap, propertyMapOverride);
    Object.keys(propertyMap).forEach(key => {
        const propertyName = propertyMap[key];
        if (propertyName && data[key]) {
            module[propertyName] = data[key];
        }
    });

    return module;
}
