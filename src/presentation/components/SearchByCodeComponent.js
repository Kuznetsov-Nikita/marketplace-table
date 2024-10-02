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
            <div className="searchByCodeContainer">
                <label htmlFor="searchByCodeInput">Поиск по коду:</label>
                <input
                    id="searchByCodeInput"
                    type="text"
                    onChange={(code) => {
                        this.searchByCodeBloc.onCodeChanged(code.currentTarget.value);
                    }}
                    value={code}
                />
                <div className="row mt-4">
                    <button
                        type="button"
                        className="col btn btn-primary"
                        onClick={() => this.searchByCodeBloc.onSearchButtonClick()}
                    >
                        Поиск
                    </button>
                </div>
            </div>
        );
    }
}

export default SearchByCodeComponent;
