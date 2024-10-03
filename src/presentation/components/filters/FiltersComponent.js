import React from 'react';
import './FiltersComponent.css';
import FilterComponent from './FilterComponent';

class FiltersComponent extends React.Component {
    constructor(props) {
        super(props);

        const { filtersBloc } = this.props;
        this.filtersBloc = filtersBloc;

        this.state = {
            filterBlocs: filtersBloc.filters,
        };
    }

    componentDidMount() {
        this.filtersBloc.attachView(this);
    }

    componentWillUnmount() {
        this.filtersBloc.detachView();
    }

    onBlocChanged() {
        this.setState({
            filterBlocs: this.filtersBloc.filters,
        });
    }

    onSearchButtonClick = () => {
        this.filtersBloc.onSearchButtonClick();
    };

    render() {
        const { filterBlocs } = this.state;

        return (
            <div>
                <h2>Фильтры</h2>
                {filterBlocs.map((bloc) => (<FilterComponent filterBloc={bloc} key={bloc.fieldInfo.name}/>))}
                <div className='search-by-filters-button-container'>
                    <button 
                        className='search-by-filters-button' 
                        onClick={() => this.filtersBloc.onSearchButtonClick()}
                    >
                        Поиск по фильтрам
                    </button>
                </div>
            </div>
        );
    }
}

export default FiltersComponent;
