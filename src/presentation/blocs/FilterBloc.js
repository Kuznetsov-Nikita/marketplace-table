class FilterBloc {
    constructor(fieldInfo) {
        this.fieldInfo = fieldInfo;

        if (fieldInfo.type === 'str') {
            this.containsString = '';
        }
        if (fieldInfo.values) {
            this.values = [];
        }
        if (fieldInfo.type === 'int' || fieldInfo.type === 'float') {
            this.fromValue = fieldInfo.minValue 
                ? fieldInfo.minValue.toString() : '';
            this.toValue = fieldInfo.maxValue 
                ? fieldInfo.maxValue.toString() : '';
            this.value = '';
        }
    }

    attachView = (view) => {
        this.view = view;
    };

    detachView = () => {
        this.view = undefined;
    };

    notifyViewAboutChanges = () => {
        if (this.view) {
          this.view.onBlocChanged();
        }
    };

    changeContainsString = (containsString) => {
        this.containsString = containsString;

        this.notifyViewAboutChanges();
    }

    addValue = (value) => {
        this.values.push(value);

        this.notifyViewAboutChanges();
    }

    removeValue = (value) => {
        this.values.splice(this.values.indexOf(value), 1);

        this.notifyViewAboutChanges();
    }

    changeFromValue = (value) => {
        this.fromValue = value;

        this.notifyViewAboutChanges();
    }

    changeToValue = (value) => {
        this.toValue = value;

        this.notifyViewAboutChanges();
    }

    changeValue = (value) => {
        this.value = value;
        
        this.notifyViewAboutChanges();
    }
}

export default FilterBloc;
