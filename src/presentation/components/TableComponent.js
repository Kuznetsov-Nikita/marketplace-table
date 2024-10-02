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
            isOpen: state.isOpen,
        }));
    }

    handleOpenModal = () => {
        this.setState((state) => ({
            fields: state.fields,
            items: state.items,
            isOpen: true,
        }));
    }

    handleCloseModal = () => {
        this.setState((state) => ({
            fields: state.fields,
            items: state.items,
            isOpen: false,
        }));
    }

    handleSelectionChange = (selectedFields) => {
        this.tableBloc.onActiveFieldsChanged(selectedFields);
    };

    render() {
        const { fields, items, isOpen } = this.state;

        return (
            <div>
                <button onClick={this.handleOpenModal}>Открыть модальное окно</button>
                <ActiveFieldsChoiceModal
                    isOpen={isOpen}
                    onClose={this.handleCloseModal}
                    fields={this.tableBloc.fields}
                    selectedFields={fields}
                    onSelectionChange={this.handleSelectionChange}
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
                                    <td key={`${field.name}-${index}`}>{item[field.name]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableComponent;
