class Filter {
    constructor(fieldName, values, rangeFrom, rangeTo, containsString) {
        this.fieldName = fieldName;

        this.values = values && values.length !== 0 ? values : null;
        this.rangeFrom = rangeFrom !== undefined ? rangeFrom : null;
        this.rangeTo = rangeTo !== undefined ? rangeTo : null;
        this.containsString = containsString ? containsString : null;
    }
}

export default Filter;
