import FieldInfo from "./FieldInfo";

class FieldsInfo {
    constructor(info) {
        for (let key in info) {
            this[key] = new FieldInfo(
                key, 
                info[key].type, 
                info[key].unit, 
                info[key].minValue, 
                info[key].maxValue, 
                info[key].isColor
            );
        }
    }
}

export default FieldsInfo;
