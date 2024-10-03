import React from 'react';
import './FilterComponent.css';

class FilterComponent extends React.Component {
    constructor(props) {
        super(props);

        const { filterBloc } = this.props;
        this.filterBloc = filterBloc;

        this.state = {
            containsString: filterBloc.containsString,
            selectedValues: filterBloc.values,
            fromValue: filterBloc.fromValue,
            toValue: filterBloc.toValue,
            value: filterBloc.value,
        };
    }

    componentDidMount() {
        this.filterBloc.attachView(this);
    }

    componentWillUnmount() {
        this.filterBloc.detachView();
    }

    onBlocChanged() {
        this.setState({
            containsString: this.filterBloc.containsString,
            selectedValues: this.filterBloc.values,
            fromValue: this.filterBloc.fromValue,
            toValue: this.filterBloc.toValue,
            value: this.filterBloc.value,
        });
    }

    onContainsStringChange = (event) => {
        this.filterBloc.changeContainsString(event.currentTarget.value);
    }

    onSelectedValuesChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
    
        if (isChecked) {
            this.filterBloc.addValue(value);
        } else {
            this.filterBloc.removeValue(value);
        }
    }

    onSelectedColorsChange = (color) => {
        const isChecked = !this.state.selectedValues.includes(color);
    
        if (isChecked) {
            this.filterBloc.addValue(color);
        } else {
            this.filterBloc.removeValue(color);
        }
    }

    onFromValueChanged = (event) => {
        this.filterBloc.changeFromValue(event.currentTarget.value);
    }

    onToValueChanged = (event) => {
        this.filterBloc.changeToValue(event.currentTarget.value);
    }

    onValueChanged = (event) => {
        this.filterBloc.changeValue(event.currentTarget.value);
    }

    render() {
        const { containsString, selectedValues, fromValue, toValue, value } = this.state;
        const isColor = this.filterBloc.fieldInfo.isColor;
        
        return (
            <div className='filter-container'>
                <h3>{this.filterBloc.fieldInfo.name}</h3>
                {containsString !== undefined && (
                    <SubstringFilter 
                        value={containsString}
                        onChange={this.onContainsStringChange}
                    />
                )}
                {selectedValues !== undefined && isColor && (
                    <ColorsChoiceFilter 
                        values={this.filterBloc.fieldInfo.values}
                        selectedValues={selectedValues}
                        onChange={this.onSelectedColorsChange}
                    />
                )} 
                {selectedValues !== undefined && !isColor && (
                    <ValuesChoiceFilter 
                        values={this.filterBloc.fieldInfo.values}
                        selectedValues={selectedValues}
                        onChange={this.onSelectedValuesChange}
                    />
                )}
                {fromValue !== undefined && toValue !== undefined && (
                    <RangeFilter
                        fromValue={fromValue}
                        toValue={toValue}
                        onFromValueChanged={this.onFromValueChanged}
                        onToValueChamged={this.onToValueChanged}
                    />
                )}
                {value !== undefined && (
                    <NumberValueFilter 
                        value={value} 
                        onChange={this.onValueChanged}
                    />
                )}
            </div>
        );
    }
}

function SubstringFilter({value, onChange}) {
    return (
        <div className="subfilter">
            <label>Содержит подстроку:</label>
            <input className="substring-input"
                type="text"
                value={value}
                onChange={(event) => onChange(event)}
            />
        </div>
    );
}

function ValuesChoiceFilter({values, selectedValues, onChange}) {
    return (
        <div className='subfilter values-choice'>
            <label>Значение из списка:</label>
            <form>
                {values.map((value) => (
                    <div key={value}>
                        <input
                            type="checkbox"
                            id={value}
                            value={value}
                            checked={selectedValues.includes(value)}
                            onChange={(event) => onChange(event)}
                        />
                        <label htmlFor={value}>{value}</label>
                    </div>
                ))}
            </form>
        </div>
    );
}

function ColorsChoiceFilter({values, selectedValues, onChange}) {
    return (
        <div className='subfilter values-choice'>
            <label>Цвет:</label>
            <div className='color-picker'>
                {values.map((color) => (
                    <div 
                        key={color}
                        className={`color-picker__color ${selectedValues.includes(color) ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onChange(color)}
                    />
                ))}
            </div>
        </div>
    );
}

function RangeFilter({fromValue, toValue, onFromValueChanged, onToValueChanged}) {
    return (
        <div className="subfilter range-filter">
            <p>От</p>
            <input 
                className='range from'
                type="number"
                value={fromValue}
                onChange={(event) => onFromValueChanged(event)}
            />
            <p>до</p>
            <input
                className='range to'
                type="number"
                value={toValue}
                onChange={(event) => onToValueChanged(event)}
            />
        </div>
    );
}

function NumberValueFilter({value, onChange}) {
    return (
        <div className='subfilter'>
            <label>Точное значение:</label>
            <input
                type="number"
                value={value}
                onChange={(event) => onChange(event)}
            />
        </div>
    );
}

export default FilterComponent;
