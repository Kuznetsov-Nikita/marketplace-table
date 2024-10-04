import React from 'react';
import './SearchByCodeComponent.css';

class SearchByCodeComponent extends React.Component {
    constructor(props) {
        super(props);

        const { searchByCodeBloc } = this.props;
        this.searchByCodeBloc = searchByCodeBloc;

        this.state = {
            code: searchByCodeBloc.code,
        };
    }

    componentDidMount() {
        this.searchByCodeBloc.attachView(this);
    }

    componentWillUnmount() {
        this.searchByCodeBloc.detachView();
    }

    onBlocChanged() {
        this.setState({
            code: this.searchByCodeBloc.code,
        });
    }

    render() {
        const { code } = this.state;

        return (
            <div className="search-by-code-container">
                <label htmlFor="search-by-code-input">Поиск по коду:</label>
                <input
                    id="search-by-code-input"
                    type="text"
                    onChange={(code) => {
                        this.searchByCodeBloc
                            .changeCode(code.currentTarget.value);
                    }}
                    value={code}
                />
                <div>
                    <button
                        type="button"
                        onClick={
                            () => this.searchByCodeBloc.onSearchButtonClick()
                        }
                    >
                        Поиск
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchByCodeComponent;
