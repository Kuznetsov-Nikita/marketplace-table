class FieldInfo {
    constructor(name, type, unit, minValue, maxValue, isColor, values) {
        this.name = name;
        this.type = type;

        this.unit = (unit === undefined) ? null : unit;
        this.minValue = (minValue === undefined) ? null : minValue;
        this.maxValue = (maxValue === undefined) ? null : maxValue;
        this.isColor = !(isColor === undefined);
        this.values = (values === undefined) ? null : values;
    }
}

export default FieldInfo;
