import merge from 'lodash/object/merge';

function customizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
        return srcValue;
    }
}

export default class DataManager {
    constructor(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    setData(newData) {
        this.data = newData;
    }

    mergeData(newData) {
        merge(this.data, newData, customizer);
    }
}
