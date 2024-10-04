import React from 'react';
import './TableComponent.css';
import ActiveFieldsChoiceModal from './ActiveFieldsChoiceModal';

class TableComponent extends React.Component {
    constructor(props) {
        super(props);

        const { tableBloc } = this.props;
        this.tableBloc = tableBloc;

        this.state = {
            fields: tableBloc.activeFields,
            items: tableBloc.itemsStorage.items,
            currentPage: tableBloc.itemsStorage.page,
            pagesCount: tableBloc.itemsStorage.pages,
            isOpen: false,
        };
    }

    componentDidMount() {
        this.tableBloc.attachView(this);
    }

    componentWillUnmount() {
        this.tableBloc.detachView();
    }

    onBlocChanged() {
        this.setState((state) => ({
            fields: this.tableBloc.activeFields,
            items: this.tableBloc.itemsStorage.items,
            currentPage: this.tableBloc.itemsStorage.page,
            pagesCount: this.tableBloc.itemsStorage.pages,
            isOpen: state.isOpen,
        }));
    }

    onModalOpen = () => {
        this.setState((state) => ({
            fields: state.fields,
            items: state.items,
            currentPage: state.currentPage,
            pagesCount: state.pagesCount,
            isOpen: true,
        }));
    }

    onModalClose = () => {
        this.setState((state) => ({
            fields: state.fields,
            items: state.items,
            currentPage: state.currentPage,
            pagesCount: state.pagesCount,
            isOpen: false,
        }));
    }

    onSelectionChange = (selectedFields) => {
        this.tableBloc.changeActiveFields(selectedFields);
    };

    onPageClick = (page) => {
        this.tableBloc.onPageClick(page);
    };

    render() {
        const { fields, items, currentPage, pagesCount, isOpen } = this.state;

        return (
            <div className="table-container">
                <button onClick={this.onModalOpen}>
                    Изменить отображаемые столбцы
                </button>
                <ActiveFieldsChoiceModal
                    isOpen={isOpen}
                    onClose={this.onModalClose}
                    fields={this.tableBloc.fields}
                    selectedFields={fields}
                    onSelectionChange={this.onSelectionChange}
                />
                <table className="table">
                    <thead>
                        <tr key="head">
                            {fields.map((field) => (
                                <th key={field.name}>{field.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                {fields.map((field) => (
                                    <td key={`${field.name}-${index}`}>
                                        {item[field.name]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul>
                    {[...Array(pagesCount).keys()].map((index) => (
                        <li 
                            key={index + 1} 
                            className={
                                index + 1 === currentPage ? 'active' : ''
                            }
                            onClick={
                                index + 1 === currentPage 
                                    ? null : () => this.onPageClick(index + 1)
                            }
                        >
                            {index + 1}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TableComponent;
