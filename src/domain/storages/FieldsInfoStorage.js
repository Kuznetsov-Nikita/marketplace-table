class FieldsInfoStorage {
    constructor() {
        this.fieldsInfo = null;
        this.listeners = [];
    }

    updateFieldsInfo(fieldsInfo) {
        this.fieldsInfo = fieldsInfo;
        this.notifyListeners();
    }

    getFieldInfo(name) {
        if (this.fieldsInfo === null) {
            throw new Error('Fields info is not set');
        }

        return this.fieldsInfo[name];
    }

    getAllFieldsInfo() {
        if (this.fieldsInfo === null) {
            return [];
        }

        let info = [];
        for (let key in this.fieldsInfo) {
            info.push(this.fieldsInfo[key]);
        }

        return info;
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }

    notifyListeners() {
        this.listeners.forEach((listener) => listener.onFieldsInfoChanged());
    }
}

export default FieldsInfoStorage;
